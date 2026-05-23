import os, json, uuid, asyncio, fitz, httpx
from dotenv import load_dotenv
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))
from datetime import datetime
from fastapi import FastAPI, UploadFile, File, Form, Request, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy import create_engine, Column, String, Integer, Float, Text, DateTime, JSON
from sqlalchemy.orm import declarative_base, sessionmaker

SQLALCHEMY_DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'cv_screener.db')}"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

ZEN_API_KEY = os.environ.get("OPENCODE_ZEN_KEY", "")
ZEN_BASE = "https://opencode.ai/zen/v1"
MODEL = "deepseek-v4-flash"

class Job(Base):
    __tablename__ = "jobs"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4())[:8])
    title = Column(String)
    description = Column(Text)
    skills_json = Column(Text, default="[]")
    min_experience = Column(Integer, default=0)
    min_education = Column(String, default="")
    created_at = Column(DateTime, default=datetime.utcnow)

class CV(Base):
    __tablename__ = "cvs"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4())[:8])
    job_id = Column(String, index=True)
    filename = Column(String)
    raw_text = Column(Text, default="")
    extracted_json = Column(Text, default="{}")
    score = Column(Float, default=0)
    breakdown_json = Column(Text, default="{}")
    summary = Column(Text, default="")
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "static")), name="static")
templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "templates"))

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ─── Pages ───

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    db = SessionLocal()
    jobs = db.query(Job).order_by(Job.created_at.desc()).all()
    db.close()
    return templates.TemplateResponse("index.html", {"request": request, "jobs": jobs})

@app.get("/jobs/new", response_class=HTMLResponse)
async def new_job_page(request: Request):
    return templates.TemplateResponse("job_form.html", {"request": request})

@app.post("/jobs")
async def create_job(title: str = Form(...), description: str = Form(...), skills: str = Form(""),
                     min_experience: int = Form(0), min_education: str = Form("")):
    db = SessionLocal()
    job = Job(title=title, description=description, skills_json=skills, min_experience=min_experience, min_education=min_education)
    db.add(job)
    db.commit()
    jid = job.id
    db.close()
    return RedirectResponse(f"/jobs/{jid}", status_code=303)

@app.get("/jobs/{job_id}", response_class=HTMLResponse)
async def job_detail(request: Request, job_id: str):
    db = SessionLocal()
    job = db.query(Job).filter(Job.id == job_id).first()
    cvs = db.query(CV).filter(CV.job_id == job_id).order_by(CV.score.desc()).all()
    db.close()
    if not job:
        return HTMLResponse("Job not found", status_code=404)
    return templates.TemplateResponse("job_detail.html", {"request": request, "job": job, "cvs": cvs})

@app.get("/jobs/{job_id}/cvs/{cv_id}", response_class=HTMLResponse)
async def cv_detail(request: Request, job_id: str, cv_id: str):
    db = SessionLocal()
    cv = db.query(CV).filter(CV.id == cv_id, CV.job_id == job_id).first()
    job = db.query(Job).filter(Job.id == job_id).first()
    db.close()
    if not cv or not job:
        return HTMLResponse("Not found", status_code=404)
    return templates.TemplateResponse("cv_detail.html", {"request": request, "cv": cv, "job": job})

# ─── API ───

@app.post("/api/jobs/{job_id}/upload")
async def upload_cvs(job_id: str, files: list[UploadFile] = File(...)):
    db = SessionLocal()
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        db.close()
        raise HTTPException(404, "Job not found")
    created = []
    for f in files:
        path = os.path.join(BASE_DIR, "uploads", f.filename)
        content = await f.read()
        with open(path, "wb") as w:
            w.write(content)
        cv = CV(job_id=job_id, filename=f.filename, status="pending")
        db.add(cv)
        db.commit()
        created.append({"id": cv.id, "filename": f.filename})
    db.close()
    return {"uploaded": len(created), "cvs": created}

async def call_zen(messages, response_format=None):
    if not ZEN_API_KEY:
        return None
    body = {"model": MODEL, "messages": messages, "max_tokens": 2048}
    if response_format:
        body["response_format"] = response_format
    try:
        async with httpx.AsyncClient(timeout=60) as client:
            r = await client.post(f"{ZEN_BASE}/chat/completions",
                headers={"Authorization": f"Bearer {ZEN_API_KEY}", "Content-Type": "application/json"},
                json=body)
            return r.json()["choices"][0]["message"]["content"]
    except Exception as e:
        return f"ERROR: {str(e)}"

async def process_cv(cv_id, job_id):
    db = SessionLocal()
    cv = db.query(CV).filter(CV.id == cv_id).first()
    job = db.query(Job).filter(Job.id == job_id).first()
    if not cv or not job:
        db.close()
        return
    path = os.path.join(BASE_DIR, "uploads", cv.filename)
    try:
        doc = fitz.open(path)
        text = "\n".join([page.get_text() for page in doc])
        doc.close()
    except:
        text = ""
    cv.raw_text = text[:8000]

    # Extract
    sys_prompt = "Extract structured data from this CV in Bahasa Indonesia. Return JSON with: name, email, phone, skills[], experiences[{role,company,period,description}], education[{degree,institution,period,gpa}], certifications[]."
    extracted = await call_zen([
        {"role": "system", "content": sys_prompt},
        {"role": "user", "content": text[:6000]}
    ], response_format={"type": "json_object"})
    cv.extracted_json = extracted or "{}"

    # Score
    skills_str = job.skills_json or "[]"
    sys_score = f"You are an HR screener. Score this candidate 0-100 for: {job.title}\nJob: {job.description[:500]}\nRequired skills (weighted): {skills_str}\nMin experience: {job.min_experience}yrs\nReturn JSON: total_score, skills_score, experience_score, education_score, reasoning, matched_skills[], missing_skills[]"
    scored = await call_zen([
        {"role": "system", "content": sys_score},
        {"role": "user", "content": f"Candidate: {extracted or text[:2000]}"}
    ], response_format={"type": "json_object"})
    cv.breakdown_json = scored or "{}"
    try:
        sd = json.loads(scored)
        cv.score = sd.get("total_score", 0)
        cv.summary = sd.get("reasoning", "")
    except:
        cv.score = 0
        cv.summary = "Scoring failed"
    cv.status = "completed"
    db.commit()
    db.close()

@app.post("/api/jobs/{job_id}/screen")
async def screen_cvs(job_id: str):
    db = SessionLocal()
    cvs = db.query(CV).filter(CV.job_id == job_id, CV.status == "pending").all()
    db.close()
    if not ZEN_API_KEY:
        return {"error": "Set OPENCODE_ZEN_KEY env var"}, 400
    tasks = [process_cv(cv.id, job_id) for cv in cvs]
    await asyncio.gather(*tasks)
    return {"screened": len(cvs)}

@app.patch("/api/jobs/{job_id}/cvs/{cv_id}/status")
async def update_status(job_id: str, cv_id: str, status: str = Form(...)):
    db = SessionLocal()
    cv = db.query(CV).filter(CV.id == cv_id, CV.job_id == job_id).first()
    if not cv:
        db.close()
        raise HTTPException(404)
    cv.status = status
    db.commit()
    db.close()
    return {"ok": True}

@app.get("/api/jobs/{job_id}/export")
async def export_csv(job_id: str):
    db = SessionLocal()
    job = db.query(Job).filter(Job.id == job_id).first()
    cvs = db.query(CV).filter(CV.job_id == job_id).order_by(CV.score.desc()).all()
    db.close()
    import csv, io
    out = io.StringIO()
    w = csv.writer(out)
    w.writerow(["Rank","Name","Score","Skills","Summary","Status"])
    for i, cv in enumerate(cvs, 1):
        ext = json.loads(cv.extracted_json or "{}")
        w.writerow([i, ext.get("name","-"), cv.score, ", ".join(ext.get("skills",[])), cv.summary, cv.status])
    return JSONResponse({"csv": out.getvalue()})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
