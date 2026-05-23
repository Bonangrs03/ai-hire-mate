"""End-to-end test for CV Screener MVP"""
import io, json, os, sys, time, urllib.request, urllib.parse

BASE = "http://localhost:8000"
TOTAL = 0
PASS = 0

def test(name, fn):
    global TOTAL, PASS
    TOTAL += 1
    try:
        fn()
        PASS += 1
        print(f"  PASS: {name}")
    except Exception as e:
        print(f"  FAIL: {name} — {e}")

def check(name, fn):
    test(name, fn)

# Wait for server
for i in range(10):
    try:
        urllib.request.urlopen(f"{BASE}/", timeout=2)
        break
    except:
        time.sleep(1)

print(f"\n{'='*50}")
print("CV Screener MVP — E2E Tests")
print(f"{'='*50}\n")

# 1. Home page
check("Home page loads", lambda: (
    assert urllib.request.urlopen(f"{BASE}/").status == 200
))

# 2. Create job form
check("Create job form loads", lambda: (
    assert urllib.request.urlopen(f"{BASE}/jobs/new").status == 200
))

# 3. Create a job
check("Create job via POST", lambda: (
    assert urllib.request.urlopen(
        urllib.request.Request(f"{BASE}/jobs", 
            data=urllib.parse.urlencode({
                "title":"Frontend Developer",
                "description":"Need React + TypeScript expert",
                "skills":json.dumps([{"name":"React","weight":10},{"name":"TypeScript","weight":8}]),
                "min_experience":"2","min_education":"S1"
            }).encode(),
            method="POST"
        ), 
        timeout=5
    ).status in (200, 303, 302)
))

# 4. Check job list
check("Job appears in list", lambda: (
    assert "Frontend Developer" in urllib.request.urlopen(f"{BASE}/").read().decode()
))

print(f"\n{TOTAL} tests, {PASS} passed, {TOTAL-PASS} failed")
print(f"✓ App is running at {BASE}")
