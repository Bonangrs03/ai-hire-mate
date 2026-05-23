// Application State Management
const state = {
    jobDescription: "",
    qualifications: [],
    candidates: [],
    selectedCandidate: null,
    versions: [],
    activeVersionId: null,
    aiEnabled: false,
    aiToken: "",
    aiEndpoint: "https://opencode.ai/zen/v1",
    aiModel: "deepseek-v4-flash"
};

// Default Job Specification Data for Instant Demo
const DEFAULT_JOB_DESC = `We are looking for a Senior React Developer to join our engineering team. You will be responsible for building premium UI components, managing global application state, integrating modern REST APIs, and optimizing application loading speed. Collaborating closely with UI/UX designers and back-end engineers is vital. Experience with modern state management libraries, responsive web design (HTML5/CSS3), and web application performance profiling is highly preferred.`;

const DEFAULT_QUALS = ["React", "JavaScript", "HTML", "CSS", "UI/UX", "State Management", "API Integration"];

// ----------------------------------------------------
// Mock Candidates Data (Simulated Resumes for Quick Testing)
// ----------------------------------------------------
const MOCK_CANDIDATES = [
    {
        name: "Alex Mercer",
        fileName: "alex_mercer_resume_senior.pdf",
        rawText: `ALEX MERCER - SENIOR FRONTEND ENGINEER
Email: alex.mercer@email.com | Phone: +1-555-0199 | Github: github.com/alexm
SUMMARY
Highly accomplished Senior Frontend Developer with over 6 years of industry experience specializing in building responsive, high-performance web applications using React and modern JavaScript architectures. Proven history of mentoring junior developers and spearheading design system migrations.

TECHNICAL SKILLS
- Core: JavaScript (ES6+), HTML5, CSS3, Sass, TypeScript
- Frameworks: React.js, Next.js, Redux Toolkit, Context API, Vue.js
- Styling: Styled Components, Tailwind CSS, Glassmorphism design
- Tooling: Webpack, Vite, Git, Jest, Testing Library
- Concepts: State Management, API Integration, Responsive Design, Performance Optimization, Web Accessibility (WCAG)

PROFESSIONAL EXPERIENCE
Senior React Engineer | TechGlow Solutions (2022 - Present)
- Led the redevelopment of a legacy analytical dashboard using React.js and Redux, resulting in a 40% improvement in initial page loading speed.
- Created and maintained a custom glassmorphism design component library utilizing modern CSS variables and HTML structures.
- Implemented robust global state management strategies and orchestrated complex REST and GraphQL API Integrations.
- Oversaw visual quality and UI/UX flows, working alongside designers to establish micro-animations.

Frontend Developer | PixelCraft Studio (2020 - 2022)
- Designed and built responsive web applications utilizing HTML, CSS, and modern JavaScript.
- Managed user interface layouts ensuring perfect cross-browser compatibility and fluid mobile responsiveness.`
    },
    {
        name: "Sarah Jenkins",
        fileName: "sarah_jenkins_resume.pdf",
        rawText: `SARAH JENKINS - FRONTEND DEVELOPER
Address: Seattle, WA | Email: sarah.j@email.com | Website: sarahj.dev

PROFESSIONAL SUMMARY
Dynamic Frontend Developer with 3 years of hands-on experience crafting immersive web experiences. Dedicated to visual excellence and writing clean, maintainable code. Skilled in modern JavaScript, React.js, and CSS architectures.

CORE COMPETENCIES
- Frontend Stack: JavaScript, HTML, CSS, Sass, React
- State Management: Context API, Redux (Basic)
- Integrations: Axios, REST APIs, JSON APIs
- UI Design: Figma, Responsive Web Design, Creative CSS Animations

WORK EXPERIENCE
React Developer | CloudSpark Innovations (2023 - Present)
- Developed critical user-facing features for a high-traffic SaaS application using React and CSS modules.
- Conducted regular API integrations with back-end node services, managing payload structures and local caching.
- Collaborated in Figma workshops to convert low-fidelity product mockups into pixel-perfect responsive HTML components.
- Enhanced UX/UI using modern responsive layouts, custom transitions, and HSL palettes.

Junior Web Developer | WebLaunch Agency (2021 - 2023)
- Built lightweight landing pages and interactive sites using HTML5, Vanilla CSS, and native JavaScript.
- Assisted in optimizing existing client sites, improving SEO scores and page speeds.`
    },
    {
        name: "David Vance",
        fileName: "david_vance_backend_cv.txt",
        rawText: `DAVID VANCE - BACKEND SOFTWARE ENGINEER
Email: david.vance@backend.io | Phone: +1-555-0182 | Denver, CO

SUMMARY
Robust Backend Engineer with 5+ years of experience focusing on scalable API architectures, server management, and database optimizations. Highly proficient in Python, SQL, and DevOps methodologies.

TECHNICAL SKILLS
- Languages: Python, Go, SQL, Java
- Frameworks: Django, FastAPI, Spring Boot
- Database: PostgreSQL, Redis, MongoDB, MySQL
- DevOps/Tools: Docker, AWS (S3, EC2, RDS), Git, Linux, CI/CD pipelines
- Concepts: Database Indexing, REST API design, Microservices, System Architecture

EXPERIENCE
Lead Backend Engineer | DataCore Systems (2022 - Present)
- Architected data pipelines and REST API frameworks using Python and FastAPI, handling over 10M requests daily.
- Optimized slow PostgreSQL queries, reducing database latency by 35% through indexing and caching.
- Engineered microservices infrastructure utilizing Docker containers on AWS, enhancing deployment automation.
- Mentored junior backend developers on API security policies and unit testing.

Backend Developer | ServerStream LLC (2020 - 2022)
- Designed database schemas and managed server configurations for multi-tenant web applications using Python and Django.
- Set up automated testing pipelines, ensuring zero regression bugs during core platform updates.`
    },
    {
        name: "Emily Chen",
        fileName: "emily_chen_designer.pdf",
        rawText: `EMILY CHEN - PRODUCT & UI/UX DESIGNER
Portfolio: emilychen.design | Email: emily.chen@design.co

SUMMARY
Creative Product Designer with 4 years of experience defining visually gorgeous digital interfaces across mobile and desktop interfaces. Passionate about typography, responsive layouts, and user research.

DESIGN TOOLKIT
- Design Tools: Figma, Adobe XD, Photoshop, Illustrator, Sketch
- Deliverables: Wireframing, High-Fidelity UI Mockups, Interactive Prototypes, User Flow Diagrams
- Coding (Basic): CSS3, HTML5, Vanilla JavaScript, CSS Variables
- Core Strengths: Design Systems, Color Theory, Layout Grid, Design Empathy, User Testing

EXPERIENCE
Senior UX/UI Designer | Prism Creative (2022 - Present)
- Led the complete UX redesign of an e-commerce platform, resulting in a 25% increase in customer conversions.
- Developed an interactive design system in Figma, establishing guidelines for typography, buttons, inputs, and HSL color values.
- Wrote clean CSS prototype code for visual layout elements to bridge the handoff between design and engineering.
- Conducted 30+ comprehensive user interviews to isolate core navigation friction points.

UX Designer | Nova Studio (2020 - 2022)
- Crafted elegant user journeys, wireframes, and responsive screen prototypes for utility web tools.
- Styled custom layouts using raw HTML and CSS to create responsive demo pages for client feedback reviews.`
    },
    {
        name: "Marcus Brody",
        fileName: "marcus_brody_resume.pdf",
        rawText: `MARCUS BRODY - FULL STACK DEVELOPER
Email: marcus.brody@dev.net | Phone: +1-555-0145 | Chicago, IL

PROFESSIONAL SUMMARY
Adaptive Full Stack Developer with 4 years of experience building complete web products. Proficient in both modern frontend frameworks and backend database structures, providing a holistic approach to engineering.

KEY SKILLS
- Frontend: React.js, JavaScript, HTML5, CSS3, Redux
- Backend: Node.js, Express, REST APIs, GraphQL
- Databases: MongoDB, PostgreSQL
- Tools: Git, npm, Docker, Webpack

EXPERIENCE
Full Stack Software Developer | ApexWeb Corporation (2022 - Present)
- Created interactive web applications featuring robust React.js frontend pages and secure Node.js backend controllers.
- Integrated multiple third-party payment and messaging REST APIs.
- Maintained global state flows and structured state management protocols inside single-page applications.
- Created beautiful CSS responsive cards and glassmorphic navigation frameworks.

Web Developer | LaunchPad Tech (2021 - 2022)
- Structured web layouts utilizing HTML5 and Vanilla CSS. Wrote interactive DOM actions with JavaScript.
- Designed database tables and simple APIs using Express and MongoDB.`
    }
];

// ----------------------------------------------------
// UI Elements Cache
// ----------------------------------------------------
const elements = {
    jobDescInput: document.getElementById("job-desc-input"),
    qualTagInput: document.getElementById("qual-tag-input"),
    qualTagsContainer: document.getElementById("qual-tags-container"),
    btnApplySpecs: document.getElementById("btn-apply-specs"),
    btnLoadMock: document.getElementById("btn-load-mock"),
    btnReset: document.getElementById("btn-reset"),
    uploadDropzone: document.getElementById("upload-dropzone"),
    cvFolderInput: document.getElementById("cv-folder-input"),
    progressContainer: document.getElementById("progress-container"),
    progressBar: document.getElementById("progress-bar"),
    
    // Stats Val
    statTotalVal: document.getElementById("stat-total-val"),
    statSuitableVal: document.getElementById("stat-suitable-val"),
    statUnsuitableVal: document.getElementById("stat-unsuitable-val"),
    statAvgVal: document.getElementById("stat-avg-val"),
    
    // Columns
    suitableList: document.getElementById("suitable-list"),
    unsuitableList: document.getElementById("unsuitable-list"),
    suitableCountBadge: document.getElementById("suitable-count-badge"),
    unsuitableCountBadge: document.getElementById("unsuitable-count-badge"),
    
    // Drawer
    detailBackdrop: document.getElementById("detail-backdrop"),
    detailDrawer: document.getElementById("detail-drawer"),
    btnCloseDrawer: document.getElementById("btn-close-drawer"),
    drawerCandidateName: document.getElementById("drawer-candidate-name"),
    drawerCandidateFile: document.getElementById("drawer-candidate-file"),
    drawerScoreCircle: document.getElementById("drawer-score-circle"),
    drawerScorePct: document.getElementById("drawer-score-pct"),
    drawerStatusBadge: document.getElementById("drawer-status-badge"),
    drawerStrengthsList: document.getElementById("drawer-strengths-list"),
    drawerGapsList: document.getElementById("drawer-gaps-list"),
    drawerCvText: document.getElementById("drawer-cv-text"),
    
    // Version Control Elements
    commitMsgInput: document.getElementById("commit-msg-input"),
    btnCommitVersion: document.getElementById("btn-commit-version"),
    timelineContainer: document.getElementById("timeline-container"),
    compareDrawer: document.getElementById("compare-drawer"),
    btnCloseCompare: document.getElementById("btn-close-compare"),
    compareVerInfo: document.getElementById("compare-ver-info"),
    compareAddedTags: document.getElementById("compare-added-tags"),
    compareRemovedTags: document.getElementById("compare-removed-tags"),
    compareShiftsList: document.getElementById("compare-shifts-list"),
    compareOldJd: document.getElementById("compare-old-jd"),
    compareNewJd: document.getElementById("compare-new-jd"),
    
    // AI Settings Elements
    aiSettingsPanel: document.getElementById("ai-settings-panel"),
    aiSettingsToggle: document.getElementById("ai-settings-toggle"),
    aiSettingsContent: document.getElementById("ai-settings-content"),
    aiToggleArrow: document.getElementById("ai-toggle-arrow"),
    aiEnabledToggle: document.getElementById("ai-enabled-toggle"),
    aiTokenInput: document.getElementById("ai-token-input"),
    aiUrlInput: document.getElementById("ai-url-input"),
    aiModelInput: document.getElementById("ai-model-input"),
    toastContainer: document.getElementById("toast-container")
};

// ----------------------------------------------------
// Initialization
// ----------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    try {
        const hasLoaded = loadStateFromLocalStorage();
        
        if (!hasLoaded) {
            elements.jobDescInput.value = DEFAULT_JOB_DESC;
            state.jobDescription = DEFAULT_JOB_DESC;
            DEFAULT_QUALS.forEach(qual => addQualificationTag(qual));
            
            state.candidates = JSON.parse(JSON.stringify(MOCK_CANDIDATES));
            screenAllCandidates();
            
            commitVersion("Initial Job Specification Setup");
        } else {
            const badges = elements.qualTagsContainer.querySelectorAll(".tag-badge");
            badges.forEach(b => b.remove());
            state.qualifications.forEach(qual => {
                const tag = document.createElement("div");
                tag.className = "tag-badge";
                tag.innerHTML = `
                    <span>${qual}</span>
                    <button type="button" data-val="${qual}">&times;</button>
                `;
                tag.querySelector("button").addEventListener("click", (e) => {
                    const val = e.currentTarget.getAttribute("data-val");
                    removeQualificationTag(val, tag);
                });
                elements.qualTagsContainer.insertBefore(tag, elements.qualTagInput);
            });
            
            elements.jobDescInput.value = state.jobDescription;
            
            elements.aiEnabledToggle.checked = state.aiEnabled;
            elements.aiTokenInput.value = state.aiToken;
            elements.aiUrlInput.value = state.aiEndpoint;
            elements.aiModelInput.value = state.aiModel;
            
            elements.aiSettingsContent.style.maxHeight = state.aiEnabled ? "500px" : "0px";
            elements.aiToggleArrow.style.transform = state.aiEnabled ? "rotate(180deg)" : "rotate(0deg)";
            
            screenAllCandidates();
        }
    } catch (e) {
        console.error("Init error, reloading with defaults", e);
        localStorage.clear();
        elements.jobDescInput.value = DEFAULT_JOB_DESC;
        state.jobDescription = DEFAULT_JOB_DESC;
        DEFAULT_QUALS.forEach(qual => addQualificationTag(qual));
        state.candidates = JSON.parse(JSON.stringify(MOCK_CANDIDATES));
        screenAllCandidates();
    }
    
    setupEventListeners();
});

// Setup Events
function setupEventListeners() {
    // Qualifications Input
    elements.qualTagInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const tagValue = elements.qualTagInput.value.trim();
            if (tagValue) {
                addQualificationTag(tagValue);
                elements.qualTagInput.value = "";
                saveStateToLocalStorage();
            }
        }
    });
    
    // Apply specifications button
    elements.btnApplySpecs.addEventListener("click", () => {
        state.jobDescription = elements.jobDescInput.value.trim();
        state.activeVersionId = null;
        if (!Array.isArray(state.candidates) || state.candidates.length === 0) {
            state.candidates = JSON.parse(JSON.stringify(MOCK_CANDIDATES));
        }
        screenAllCandidates();
        renderTimeline();
    });

    // Reset app
    elements.btnReset.addEventListener("click", resetApp);

    // Load mock data
    elements.btnLoadMock.addEventListener("click", () => {
        loadMockCandidates();
    });

    // Folder selection upload
    elements.cvFolderInput.addEventListener("change", handleFolderUpload);

    // Drag-and-drop actions
    elements.uploadDropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        elements.uploadDropzone.classList.add("dragover");
    });

    elements.uploadDropzone.addEventListener("dragleave", () => {
        elements.uploadDropzone.classList.remove("dragover");
    });

    elements.uploadDropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        elements.uploadDropzone.classList.remove("dragover");
        if (e.dataTransfer.files.length > 0) {
            // Note: browser folder drag/drop webkitGetAsEntry is needed for recursive folders, 
            // but standard file input with webkitdirectory is standard. Let's direct users or process flat dropped list.
            processFileList(e.dataTransfer.files);
        }
    });

    // Drawer closing
    elements.btnCloseDrawer.addEventListener("click", closeDrawer);
    elements.detailBackdrop.addEventListener("click", closeDrawer);
    
    // Version Control Events
    elements.btnCommitVersion.addEventListener("click", () => {
        const msg = elements.commitMsgInput.value.trim();
        commitVersion(msg || "Updated screening specifications");
        elements.commitMsgInput.value = "";
    });
    
    elements.commitMsgInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const msg = elements.commitMsgInput.value.trim();
            commitVersion(msg || "Updated screening specifications");
            elements.commitMsgInput.value = "";
        }
    });
    
    elements.btnCloseCompare.addEventListener("click", closeCompareDrawer);

    // AI Settings Panel Drawer Collapse Toggling
    elements.aiSettingsToggle.addEventListener("click", () => {
        const isCollapsed = elements.aiSettingsContent.style.maxHeight === "0px" || !elements.aiSettingsContent.style.maxHeight;
        elements.aiSettingsContent.style.maxHeight = isCollapsed ? "500px" : "0px";
        elements.aiToggleArrow.style.transform = isCollapsed ? "rotate(180deg)" : "rotate(0deg)";
    });

    // AI Toggle checkbox handler
    elements.aiEnabledToggle.addEventListener("change", (e) => {
        state.aiEnabled = e.target.checked;
        if (state.aiEnabled && !state.aiToken) {
            showToast("Please paste your API Key/Token to enable AI-powered screening.", "warning");
        } else if (state.aiEnabled) {
            showToast("AI Screening Enabled. Re-apply specs or upload folder to run.", "info");
        } else {
            showToast("AI Screening Disabled. Switched to Local Fast Matcher.", "info");
        }
        saveStateToLocalStorage();
    });

    // AI Input value fields mapping
    elements.aiTokenInput.addEventListener("input", (e) => {
        state.aiToken = e.target.value.trim();
        saveStateToLocalStorage();
    });

    elements.aiUrlInput.addEventListener("input", (e) => {
        state.aiEndpoint = e.target.value.trim() || "https://opencode.ai/zen/v1";
        saveStateToLocalStorage();
    });

    elements.aiModelInput.addEventListener("input", (e) => {
        state.aiModel = e.target.value.trim() || "deepseek-v4-flash";
        saveStateToLocalStorage();
    });
}

// ----------------------------------------------------
// Tag Input Component Logic
// ----------------------------------------------------
function addQualificationTag(text) {
    // Avoid duplicates
    const cleanedText = text.replace(/,$/, '').trim();
    if (!cleanedText || state.qualifications.includes(cleanedText)) return;
    
    state.qualifications.push(cleanedText);
    
    const tag = document.createElement("div");
    tag.className = "tag-badge";
    tag.innerHTML = `
        <span>${cleanedText}</span>
        <button type="button" data-val="${cleanedText}">&times;</button>
    `;
    
    // Remove tag button
    tag.querySelector("button").addEventListener("click", (e) => {
        const val = e.currentTarget.getAttribute("data-val");
        removeQualificationTag(val, tag);
    });
    
    elements.qualTagsContainer.insertBefore(tag, elements.qualTagInput);
    saveStateToLocalStorage();
}

// ----------------------------------------------------
// File Upload & Parsing Logic
// ----------------------------------------------------
function handleFolderUpload(e) {
    const files = e.target.files;
    if (files.length > 0) {
        processFileList(files);
    }
}

async function processFileList(files) {
    // Show progress bar
    elements.progressContainer.style.display = "block";
    elements.progressBar.style.width = "0%";
    
    // Standardize array
    const validFiles = Array.from(files).filter(file => {
        const ext = file.name.split('.').pop().toLowerCase();
        return ext === 'pdf' || ext === 'txt';
    });
    
    if (validFiles.length === 0) {
        alert("No valid .pdf or .txt CV resumes found in the selected folder.");
        elements.progressContainer.style.display = "none";
        return;
    }
    
    // Avoid wiping existing unless desired, but for directory screening it is clean to clear old candidates
    state.candidates = [];
    
    let processedCount = 0;
    
    for (let file of validFiles) {
        try {
            const rawText = await parseFile(file);
            const candidateName = extractCandidateName(file.name, rawText);
            
            state.candidates.push({
                name: candidateName,
                fileName: file.name,
                rawText: rawText
            });
        } catch (err) {
            console.error(`Error parsing file: ${file.name}`, err);
        }
        
        processedCount++;
        const pct = Math.round((processedCount / validFiles.length) * 100);
        elements.progressBar.style.width = `${pct}%`;
    }
    
    // Slight timeout for transition satisfaction
    setTimeout(() => {
        elements.progressContainer.style.display = "none";
        screenAllCandidates();
    }, 500);
}

// Parse Individual File (PDF or TXT)
function parseFile(file) {
    return new Promise((resolve, reject) => {
        const ext = file.name.split('.').pop().toLowerCase();
        const reader = new FileReader();
        
        if (ext === 'txt') {
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsText(file);
        } else if (ext === 'pdf') {
            reader.onload = async (e) => {
                try {
                    const typedarray = new Uint8Array(e.target.result);
                    const pdf = await pdfjsLib.getDocument({data: typedarray}).promise;
                    let fullText = "";
                    
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        const pageText = textContent.items.map(item => item.str).join(" ");
                        fullText += pageText + "\n";
                    }
                    resolve(fullText);
                } catch (err) {
                    reject(err);
                }
            };
            reader.onerror = (e) => reject(e);
            reader.readAsArrayBuffer(file);
        }
    });
}

// Intelligently extract name from CV text or file name
function extractCandidateName(fileName, text) {
    // 1. Remove extension from file name
    let cleanName = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
    
    // Replace separators
    cleanName = cleanName.replace(/[_\-\+]/g, ' ').trim();
    
    // Remove tags like "cv", "resume", "2026", "hired"
    cleanName = cleanName.replace(/\b(cv|resume|202\d|job|apply|applicant|draft|v\d)\b/gi, '').trim();
    
    // Capitalize words
    cleanName = cleanName.split(' ')
                         .filter(w => w.length > 0)
                         .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                         .join(' ');
                         
    if (cleanName.length > 3) {
        return cleanName;
    }
    
    // 2. If name is too short, extract first line of resume (common convention)
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length > 0) {
        const firstLine = lines[0];
        if (firstLine.length > 3 && firstLine.length < 40 && !firstLine.includes('@')) {
            return firstLine.replace(/[^a-zA-Z\s]/g, '').trim();
        }
    }
    
    return "Candidate Resume";
}

// ----------------------------------------------------
// Scoring & Match Screening Engine
// ----------------------------------------------------
async function screenAllCandidates() {
    if (!Array.isArray(state.candidates) || state.candidates.length === 0) return;
    
    // Scenario 1: AI-Powered Screening Mode
    if (state.aiEnabled && state.aiToken) {
        // Trigger visual "AI Screening..." animated card loaders
        renderDashboardLoading();
        showToast("Starting Asynchronous AI-Powered Screening...", "info");
        
        // Execute fetches in parallel asynchronously
        const promises = state.candidates.map(async (cand) => {
            try {
                const analysis = await screenCandidateWithAI(cand);
                
                cand.score = analysis.score;
                cand.matches = analysis.matches;
                cand.missing = analysis.missing;
                cand.strengths = analysis.strengths;
                cand.gaps = analysis.gaps;
                cand.isSuitable = cand.score >= 60;
            } catch (err) {
                console.warn(`AI screening failed for ${cand.name}. Switching to local keywords fallback.`, err);
                
                // Show localized toast notification if it's the first time
                showToast(`AI screen failed for ${cand.name}. Switched to local keywords.`, "warning");
                
                // Perfect, seamless keyword boundary local matcher fallback
                const fallback = evaluateCandidate(cand.rawText);
                cand.score = fallback.score;
                cand.matches = fallback.matches;
                cand.missing = fallback.missing;
                cand.strengths = fallback.strengths;
                cand.gaps = fallback.gaps;
                cand.isSuitable = cand.score >= 60;
            } finally {
                cand.isLoading = false;
            }
            
            // Re-render dashboard dynamically as each candidate finishes to feel responsive
            renderDashboard();
        });
        
        await Promise.all(promises);
        showToast("AI-Powered Screening Completed Successfully!", "success");
        
    } else {
        // Scenario 2: Standard Rule-based local matcher
        state.candidates.forEach(cand => {
            cand.isLoading = false;
            const analysis = evaluateCandidate(cand.rawText);
            
            cand.score = analysis.score;
            cand.matches = analysis.matches;
            cand.missing = analysis.missing;
            cand.strengths = analysis.strengths;
            cand.gaps = analysis.gaps;
            cand.isSuitable = cand.score >= 60;
        });
    }
    
    // Sort candidates: highest score first
    state.candidates.sort((a, b) => b.score - a.score);
    
    // Render Dashboard & persist state
    renderDashboard();
    saveStateToLocalStorage();
}

function evaluateCandidate(text) {
    const textLower = text.toLowerCase();
    const matchedQuals = [];
    const missingQuals = [];
    
    // 1. Match Qualifications Tags
    state.qualifications.forEach(qual => {
        if (matchKeyword(textLower, qual)) {
            matchedQuals.push(qual);
        } else {
            missingQuals.push(qual);
        }
    });
    
    // Calculate tag matching ratio (weighted 70% of final score)
    const totalTags = state.qualifications.length;
    let tagScore = 0;
    if (totalTags > 0) {
        tagScore = (matchedQuals.length / totalTags) * 100;
    } else {
        tagScore = 100; // If no tags, base evaluation entirely on job description
    }
    
    // 2. Job Description Keyword Overlap (weighted 30% of final score)
    let jdScore = 0;
    let keywordHits = 0;
    const jdKeywords = extractKeywords(state.jobDescription);
    
    if (jdKeywords.length > 0) {
        jdKeywords.forEach(kw => {
            if (textLower.includes(kw)) {
                keywordHits++;
            }
        });
        jdScore = (keywordHits / jdKeywords.length) * 100;
    } else {
        jdScore = 100;
    }
    
    // Weighted final score (70% quals, 30% job description)
    let finalScore = 0;
    if (totalTags > 0 && jdKeywords.length > 0) {
        finalScore = Math.round((tagScore * 0.7) + (jdScore * 0.3));
    } else if (totalTags > 0) {
        finalScore = Math.round(tagScore);
    } else if (jdKeywords.length > 0) {
        finalScore = Math.round(jdScore);
    } else {
        finalScore = 50; // Fallback median
    }
    
    // Ensure boundaries
    finalScore = Math.max(0, Math.min(100, finalScore));
    
    // 3. Generate structured bullet summaries
    const strengths = [];
    const gaps = [];
    
    if (matchedQuals.length > 0) {
        strengths.push(`Direct alignment on key competencies: <strong>${matchedQuals.slice(0, 4).join(", ")}</strong>.`);
    }
    
    // Synthesize text feedback
    if (finalScore >= 80) {
        strengths.push("Outstanding qualification coverage matching the role profile.");
        strengths.push("High keyword density indicating deep vertical domain alignment.");
    } else if (finalScore >= 60) {
        strengths.push("Good baseline technical skills matching core requirements.");
        strengths.push("Strong core vocabulary alignment with the Job Description.");
    } else {
        strengths.push("Demonstrates basic relevant terminology but has significant gaps.");
    }
    
    // Analyze experience indicators in text
    const expRegex = /(\d+)\+?\s*years?\s+(of\s+)?experience/i;
    const expMatch = text.match(expRegex);
    if (expMatch) {
        strengths.push(`Mentions: "${expMatch[0]}" inside the resume text.`);
    }
    
    // Build gaps
    if (missingQuals.length > 0) {
        gaps.push(`Failed to identify required qualifications: <strong>${missingQuals.slice(0, 4).join(", ")}</strong>.`);
    }
    
    if (finalScore < 60) {
        gaps.push("Limited alignment with the Job Description's specific methodologies.");
        gaps.push("Missing core credentials or framework tags required for high performance.");
    } else if (missingQuals.length > 0) {
        gaps.push("Could benefit from strengthening auxiliary skills listed in the spec.");
    }
    
    if (gaps.length === 0) {
        gaps.push("No major technical alignment gaps detected against specifications.");
    }
    
    return {
        score: finalScore,
        matches: matchedQuals,
        missing: missingQuals,
        strengths: strengths,
        gaps: gaps
    };
}

// Extract essential unique technical tags from Job Description
function extractKeywords(text) {
    if (!text) return [];
    
    // Clean text and extract key terms
    const textCleaned = text.replace(/[^a-zA-Z0-9\s]/g, ' ').toLowerCase();
    const words = textCleaned.split(/\s+/);
    
    // High relevance tech keywords list for MVP matching
    const techWords = [
        "react", "javascript", "html", "css", "vue", "angular", "node", "typescript",
        "redux", "context", "state", "api", "rest", "graphql", "responsive", "ux", "ui",
        "figma", "sass", "webpack", "vite", "git", "python", "django", "fastapi", "sql",
        "postgresql", "mongodb", "docker", "aws", "jest", "testing", "performance", "speed"
    ];
    
    const extracted = [];
    techWords.forEach(word => {
        if (words.includes(word) && !extracted.includes(word)) {
            extracted.push(word);
        }
    });
    
    return extracted;
}

// ----------------------------------------------------
// UI Rendering Logic
// ----------------------------------------------------
function renderDashboard() {
    // 1. Clear Lists
    elements.suitableList.innerHTML = "";
    elements.unsuitableList.innerHTML = "";
    
    const suitableCandidates = state.candidates.filter(c => c.isSuitable);
    const unsuitableCandidates = state.candidates.filter(c => !c.isSuitable);
    
    // Update count labels
    elements.suitableCountBadge.innerText = suitableCandidates.length;
    elements.unsuitableCountBadge.innerText = unsuitableCandidates.length;
    
    // 2. Render Statistics Panel
    elements.statTotalVal.innerText = state.candidates.length;
    elements.statSuitableVal.innerText = suitableCandidates.length;
    elements.statUnsuitableVal.innerText = unsuitableCandidates.length;
    
    // Calculate Average Score
    let avg = 0;
    if (state.candidates.length > 0) {
        const sum = state.candidates.reduce((acc, cand) => acc + cand.score, 0);
        avg = Math.round(sum / state.candidates.length);
    }
    elements.statAvgVal.innerText = `${avg}%`;
    
    // 3. Render Suitable List
    if (suitableCandidates.length === 0) {
        renderEmptyState(elements.suitableList, "No suitable candidates screened yet.");
    } else {
        suitableCandidates.forEach((cand, idx) => {
            const card = createCandidateCard(cand, idx);
            elements.suitableList.appendChild(card);
        });
    }
    
    // 4. Render Unsuitable List
    if (unsuitableCandidates.length === 0) {
        renderEmptyState(elements.unsuitableList, "No unsuitable candidates screened yet.");
    } else {
        unsuitableCandidates.forEach((cand, idx) => {
            const card = createCandidateCard(cand, idx);
            elements.unsuitableList.appendChild(card);
        });
    }
}

function renderEmptyState(container, text) {
    container.innerHTML = `
        <div class="empty-state">
            <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>${text}</p>
            <span>Screened resumes will show up sorted by match score here.</span>
        </div>
    `;
}

function createCandidateCard(cand, index) {
    const card = document.createElement("div");
    
    // 1. Loading card overlay for asynchronous AI Screening state
    if (cand.isLoading) {
        card.className = "candidate-card screening-loading";
        card.innerHTML = `
            <div class="candidate-card-header">
                <div class="candidate-meta">
                    <span class="candidate-name">${cand.name}</span>
                    <span class="candidate-file">${cand.fileName}</span>
                </div>
                <span class="card-ai-loader">
                    <span class="spinner-icon"></span>
                    AI Screening
                </span>
            </div>
            <p class="candidate-card-summary" style="opacity: 0.5;">Evaluating candidate qualifications against requirements, running semantic mapping, and preparing suitability feedback summary...</p>
        `;
        return card;
    }
    
    card.className = `candidate-card ${cand.isSuitable ? 'card-suitable' : 'card-unsuitable'}`;
    
    // Stagger slide-in animation delay
    card.style.animationDelay = `${index * 0.05}s`;
    
    // Generate matches HTML tags
    let tagsHTML = "";
    cand.matches.slice(0, 3).forEach(tag => {
        tagsHTML += `<span class="mini-tag">${tag}</span>`;
    });
    cand.missing.slice(0, 2).forEach(tag => {
        tagsHTML += `<span class="mini-tag mini-tag-missing">${tag}</span>`;
    });
    
    // Generate text snippet summary
    const cleanSnippet = cand.rawText.replace(/\s+/g, ' ').substring(0, 120) + "...";
    
    card.innerHTML = `
        <div class="candidate-card-header">
            <div class="candidate-meta">
                <span class="candidate-name">${cand.name}</span>
                <span class="candidate-file">${cand.fileName}</span>
            </div>
            <div class="candidate-score-badge">${cand.score}%</div>
        </div>
        <p class="candidate-card-summary">${cleanSnippet}</p>
        <div class="candidate-card-tags">
            ${tagsHTML}
        </div>
    `;
    
    // Click action opens drawer
    card.addEventListener("click", () => {
        openCandidateDetails(cand);
    });
    
    return card;
}

// ----------------------------------------------------
// Candidate Drawer Details Logic
// ----------------------------------------------------
function openCandidateDetails(candidate) {
    state.selectedCandidate = candidate;
    
    elements.drawerCandidateName.innerText = candidate.name;
    elements.drawerCandidateFile.innerText = candidate.fileName;
    elements.drawerScorePct.innerText = `${candidate.score}%`;
    
    // Radial Circle progress SVG path animation
    // Circle circumference is 2 * PI * r = 2 * 3.1415 * 36 = 226
    const circumference = 226;
    const offset = circumference - (candidate.score / 100) * circumference;
    elements.drawerScoreCircle.style.strokeDashoffset = offset;
    
    // Update Badge Status
    elements.drawerStatusBadge.className = "scorecard-status-pill";
    if (candidate.isSuitable) {
        elements.drawerStatusBadge.classList.add("status-suitable");
        elements.drawerStatusBadge.innerText = candidate.score >= 80 ? "Highly Suitable Match" : "Suitable Candidate";
    } else {
        elements.drawerStatusBadge.classList.add("status-unsuitable");
        elements.drawerStatusBadge.innerText = "Not Suitable Match";
    }
    
    // Render Strengths
    elements.drawerStrengthsList.innerHTML = "";
    candidate.strengths.forEach(str => {
        const li = document.createElement("li");
        li.innerHTML = str;
        elements.drawerStrengthsList.appendChild(li);
    });
    
    // Render Gaps
    elements.drawerGapsList.innerHTML = "";
    candidate.gaps.forEach(gap => {
        const li = document.createElement("li");
        li.innerHTML = gap;
        elements.drawerGapsList.appendChild(li);
    });
    
    // Render raw resume with keywords highlighted
    let cvTextHTML = escapeHTML(candidate.rawText);
    
    // Wrap matched tags in mark badges
    candidate.matches.forEach(match => {
        const escaped = match.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`\\b(${escaped})\\b`, 'gi');
        cvTextHTML = cvTextHTML.replace(regex, '<mark>$1</mark>');
    });
    
    // Also highlight some job description technical keywords
    const jdKeywords = extractKeywords(state.jobDescription);
    jdKeywords.forEach(kw => {
        // Only highlight if not already matched
        if (!candidate.matches.some(m => m.toLowerCase() === kw.toLowerCase())) {
            const regex = new RegExp(`\\b(${kw})\\b`, 'gi');
            cvTextHTML = cvTextHTML.replace(regex, '<mark style="background: rgba(168, 85, 247, 0.35); border-bottom-color: var(--color-secondary-rgb);">$1</mark>');
        }
    });
    
    elements.drawerCvText.innerHTML = cvTextHTML;
    
    // Show drawer
    elements.detailBackdrop.style.display = "block";
    elements.detailDrawer.style.display = "flex";
    
    setTimeout(() => {
        elements.detailBackdrop.style.opacity = "1";
        elements.detailDrawer.style.right = "0px";
    }, 10);
}

function closeDrawer() {
    elements.detailBackdrop.style.opacity = "0";
    elements.detailDrawer.style.right = "-600px";
    
    setTimeout(() => {
        elements.detailBackdrop.style.display = "none";
        elements.detailDrawer.style.display = "none";
        state.selectedCandidate = null;
    }, 300);
}

// ----------------------------------------------------
// Utility Actions (Mock Load, Reset, Escape HTML)
// ----------------------------------------------------
function loadMockCandidates() {
    state.candidates = JSON.parse(JSON.stringify(MOCK_CANDIDATES));
    screenAllCandidates();
}

function resetApp() {
    state.candidates = [];
    state.selectedCandidate = null;
    state.versions = [];
    state.activeVersionId = null;
    state.aiEnabled = false;
    state.aiToken = "";
    state.aiEndpoint = "https://opencode.ai/zen/v1";
    state.aiModel = "deepseek-v4-flash";
    
    elements.jobDescInput.value = "";
    state.jobDescription = "";
    
    // Reset Tag input and tags
    state.qualifications = [];
    const badges = elements.qualTagsContainer.querySelectorAll(".tag-badge");
    badges.forEach(b => b.remove());
    elements.qualTagInput.value = "";
    
    // Reset AI Inputs in UI
    elements.aiEnabledToggle.checked = false;
    elements.aiTokenInput.value = "";
    elements.aiUrlInput.value = "https://opencode.ai/zen/v1";
    elements.aiModelInput.value = "deepseek-v4-flash";
    elements.aiSettingsContent.style.maxHeight = "0px";
    elements.aiToggleArrow.style.transform = "rotate(0deg)";
    
    // Clear Local Storage
    localStorage.removeItem("cv_screener_active_jd");
    localStorage.removeItem("cv_screener_active_quals");
    localStorage.removeItem("cv_screener_candidates");
    localStorage.removeItem("cv_screener_versions");
    localStorage.removeItem("cv_screener_active_ver_id");
    localStorage.removeItem("cv_screener_ai_enabled");
    localStorage.removeItem("cv_screener_ai_token");
    localStorage.removeItem("cv_screener_ai_endpoint");
    localStorage.removeItem("cv_screener_ai_model");
    
    // Render back to empty states
    renderDashboard();
    renderTimeline();
    closeDrawer();
    closeCompareDrawer();
    showToast("Application reset successfully.", "info");
}

function escapeHTML(str) {
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
}

// ----------------------------------------------------
// Version Control Flow & Persistency Logic
// ----------------------------------------------------
function saveStateToLocalStorage() {
    localStorage.setItem("cv_screener_active_jd", state.jobDescription);
    localStorage.setItem("cv_screener_active_quals", JSON.stringify(state.qualifications));
    localStorage.setItem("cv_screener_candidates", JSON.stringify(state.candidates));
    localStorage.setItem("cv_screener_versions", JSON.stringify(state.versions));
    localStorage.setItem("cv_screener_active_ver_id", state.activeVersionId || "");
    localStorage.setItem("cv_screener_ai_enabled", state.aiEnabled);
    localStorage.setItem("cv_screener_ai_token", state.aiToken);
    localStorage.setItem("cv_screener_ai_endpoint", state.aiEndpoint);
    localStorage.setItem("cv_screener_ai_model", state.aiModel);
}

function loadStateFromLocalStorage() {
    const jd = localStorage.getItem("cv_screener_active_jd");
    const quals = localStorage.getItem("cv_screener_active_quals");
    const cands = localStorage.getItem("cv_screener_candidates");
    const vers = localStorage.getItem("cv_screener_versions");
    const activeVerId = localStorage.getItem("cv_screener_active_ver_id");
    const aiEnabled = localStorage.getItem("cv_screener_ai_enabled");
    const aiToken = localStorage.getItem("cv_screener_ai_token");
    const aiEndpoint = localStorage.getItem("cv_screener_ai_endpoint");
    const aiModel = localStorage.getItem("cv_screener_ai_model");
    
    if (jd === null || quals === null) return false;
    
    try {
        state.jobDescription = jd;
        state.qualifications = JSON.parse(quals);
        const parsedCands = cands ? JSON.parse(cands) : [];
        state.candidates = Array.isArray(parsedCands) ? parsedCands : [];
        const parsedVers = vers ? JSON.parse(vers) : [];
        state.versions = Array.isArray(parsedVers) ? parsedVers : [];
        state.activeVersionId = activeVerId || null;
    } catch (e) {
        return false;
    }
    state.aiEnabled = aiEnabled === "true";
    state.aiToken = aiToken || "";
    state.aiEndpoint = aiEndpoint || "https://opencode.ai/zen/v1";
    state.aiModel = aiModel || "deepseek-v4-flash";
    
    renderTimeline();
    return true;
}

// Commit Spec Version
function commitVersion(message) {
    const nextVerNum = state.versions.length + 1;
    const versionId = `v${nextVerNum}`;
    
    // Snapshot candidates and their score at this point
    const scoresSnapshot = {};
    state.candidates.forEach(cand => {
        scoresSnapshot[cand.name] = cand.score;
    });
    
    const suitableCount = state.candidates.filter(c => c.score >= 60).length;
    const unsuitableCount = state.candidates.length - suitableCount;
    
    const newVersion = {
        id: versionId,
        versionNumber: nextVerNum,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString([], { month: 'short', day: 'numeric' }),
        message: message,
        jobDescription: state.jobDescription,
        qualifications: [...state.qualifications],
        stats: {
            total: state.candidates.length,
            suitable: suitableCount,
            unsuitable: unsuitableCount
        },
        candidatesScores: scoresSnapshot
    };
    
    state.versions.push(newVersion);
    state.activeVersionId = versionId;
    
    saveStateToLocalStorage();
    renderTimeline();
}

// Render Timeline Sidebar Cards
function renderTimeline() {
    elements.timelineContainer.innerHTML = "";
    
    if (state.versions.length === 0) {
        elements.timelineContainer.innerHTML = `
            <div style="font-size: 0.75rem; color: var(--text-muted); text-align: center; padding: 1rem 0;">
                No specifications committed yet.
            </div>
        `;
        return;
    }
    
    // Sort versions in reverse chronological (latest first)
    const reversed = [...state.versions].reverse();
    
    reversed.forEach(ver => {
        const item = document.createElement("div");
        const isActive = state.activeVersionId === ver.id;
        item.className = `timeline-item ${isActive ? 'active' : ''}`;
        
        item.innerHTML = `
            <div class="timeline-meta">
                <span class="timeline-ver-badge">${ver.id}</span>
                <span>${ver.timestamp}</span>
            </div>
            <div class="timeline-msg">${escapeHTML(ver.message)}</div>
            <div class="timeline-capsule">
                <span style="color: var(--color-success-rgb); font-weight: 700;">${ver.stats.suitable} Suitable</span>
                <span style="color: var(--color-danger-rgb); font-weight: 700;">${ver.stats.unsuitable} Not Suitable</span>
            </div>
            <div class="timeline-actions">
                <button class="timeline-btn timeline-btn-restore" data-id="${ver.id}">Restore</button>
                <button class="timeline-btn timeline-btn-compare" data-id="${ver.id}">Compare Spec</button>
            </div>
        `;
        
        // Event Listeners for actions
        item.querySelector(".timeline-btn-restore").addEventListener("click", (e) => {
            e.stopPropagation();
            restoreVersion(ver.id);
        });
        
        item.querySelector(".timeline-btn-compare").addEventListener("click", (e) => {
            e.stopPropagation();
            compareVersion(ver.id);
        });
        
        // Clicking card also restores
        item.addEventListener("click", () => {
            restoreVersion(ver.id);
        });
        
        elements.timelineContainer.appendChild(item);
    });
}

// Restore historical specifications
function restoreVersion(versionId) {
    const ver = state.versions.find(v => v.id === versionId);
    if (!ver) return;
    
    // Reset state & elements inputs
    state.jobDescription = ver.jobDescription;
    elements.jobDescInput.value = ver.jobDescription;
    state.qualifications = [...ver.qualifications];
    
    // Rebuild visual badges
    const badges = elements.qualTagsContainer.querySelectorAll(".tag-badge");
    badges.forEach(b => b.remove());
    
    state.qualifications.forEach(qual => {
        const tag = document.createElement("div");
        tag.className = "tag-badge";
        tag.innerHTML = `
            <span>${qual}</span>
            <button type="button" data-val="${qual}">&times;</button>
        `;
        tag.querySelector("button").addEventListener("click", (e) => {
            const val = e.currentTarget.getAttribute("data-val");
            removeQualificationTag(val, tag);
        });
        elements.qualTagsContainer.insertBefore(tag, elements.qualTagInput);
    });
    
    state.activeVersionId = versionId;
    
    // Re-screen
    screenAllCandidates();
    renderTimeline();
    saveStateToLocalStorage();
}

// Compare historical specifications against active one
function compareVersion(versionId) {
    const historicalVer = state.versions.find(v => v.id === versionId);
    if (!historicalVer) return;
    
    // Set Header
    elements.compareVerInfo.innerText = `${historicalVer.id}: ${historicalVer.message}`;
    
    // 1. Calculate Qualifications Diff
    const oldQuals = historicalVer.qualifications;
    const newQuals = state.qualifications;
    
    const added = newQuals.filter(q => !oldQuals.includes(q));
    const removed = oldQuals.filter(q => !newQuals.includes(q));
    
    // Render added
    elements.compareAddedTags.innerHTML = "";
    if (added.length === 0) {
        elements.compareAddedTags.innerHTML = `<span style="font-size: 0.75rem; color: var(--text-muted);">None</span>`;
    } else {
        added.forEach(tag => {
            elements.compareAddedTags.innerHTML += `<span class="diff-tag-added">+ ${tag}</span>`;
        });
    }
    
    // Render removed
    elements.compareRemovedTags.innerHTML = "";
    if (removed.length === 0) {
        elements.compareRemovedTags.innerHTML = `<span style="font-size: 0.75rem; color: var(--text-muted);">None</span>`;
    } else {
        removed.forEach(tag => {
            elements.compareRemovedTags.innerHTML += `<span class="diff-tag-removed">- ${tag}</span>`;
        });
    }
    
    // 2. Render Job Descriptions Compare Text
    elements.compareOldJd.innerText = historicalVer.jobDescription || "No job description";
    elements.compareNewJd.innerText = state.jobDescription || "No job description";
    
    // 3. Render Candidate Match Shifts
    elements.compareShiftsList.innerHTML = "";
    
    if (state.candidates.length === 0) {
        elements.compareShiftsList.innerHTML = `<div style="font-size: 0.75rem; color: var(--text-muted); text-align: center;">No screened candidates to compare.</div>`;
    } else {
        state.candidates.forEach(cand => {
            // Fetch historical score
            let oldScore = historicalVer.candidatesScores[cand.name];
            if (oldScore === undefined) {
                // If candidate wasn't parsed back then, run a quick evaluation using historical specs
                const histAnalysis = evaluateWithSpecs(cand.rawText, historicalVer.jobDescription, historicalVer.qualifications);
                oldScore = histAnalysis.score;
            }
            
            const newScore = cand.score;
            const delta = newScore - oldScore;
            
            const shiftItem = document.createElement("div");
            shiftItem.className = "compare-shift-item";
            
            let deltaHTML = "";
            let barColor = "";
            
            if (delta > 0) {
                deltaHTML = `<span class="compare-shift-delta delta-pos">+${delta}%</span>`;
                barColor = "linear-gradient(90deg, var(--color-primary-rgb), var(--color-success-rgb))";
            } else if (delta < 0) {
                deltaHTML = `<span class="compare-shift-delta delta-neg">${delta}%</span>`;
                barColor = "linear-gradient(90deg, var(--color-danger-rgb), var(--color-secondary-rgb))";
            } else {
                deltaHTML = `<span class="compare-shift-delta delta-neu">0%</span>`;
                barColor = "var(--border-color)";
            }
            
            shiftItem.innerHTML = `
                <div class="compare-shift-name">${cand.name}</div>
                <div class="compare-shift-bar-container">
                    <div class="compare-shift-bar-old" style="width: ${oldScore}%;"></div>
                    <div class="compare-shift-bar-new" style="width: ${newScore}%; background: ${barColor};"></div>
                </div>
                ${deltaHTML}
            `;
            elements.compareShiftsList.appendChild(shiftItem);
        });
    }
    
    // Show compare drawer
    elements.detailBackdrop.style.display = "block";
    elements.compareDrawer.style.display = "flex";
    
    setTimeout(() => {
        elements.detailBackdrop.style.opacity = "1";
        elements.compareDrawer.style.right = "0px";
    }, 10);
}

function closeCompareDrawer() {
    elements.detailBackdrop.style.opacity = "0";
    elements.compareDrawer.style.right = "-600px";
    
    setTimeout(() => {
        elements.detailBackdrop.style.display = "none";
        elements.compareDrawer.style.display = "none";
    }, 300);
}

// Quick off-grid evaluator to screen candidates using custom criteria
function evaluateWithSpecs(text, jdText, qualTags) {
    const textLower = text.toLowerCase();
    const matchedQuals = [];
    
    qualTags.forEach(qual => {
        if (matchKeyword(textLower, qual)) {
            matchedQuals.push(qual);
        }
    });
    
    const totalTags = qualTags.length;
    let tagScore = totalTags > 0 ? (matchedQuals.length / totalTags) * 100 : 100;
    
    let jdScore = 0;
    let keywordHits = 0;
    const jdKeywords = extractKeywords(jdText);
    
    if (jdKeywords.length > 0) {
        jdKeywords.forEach(kw => {
            if (textLower.includes(kw)) {
                keywordHits++;
            }
        });
        jdScore = (keywordHits / jdKeywords.length) * 100;
    } else {
        jdScore = 100;
    }
    
    let finalScore = 0;
    if (totalTags > 0 && jdKeywords.length > 0) {
        finalScore = Math.round((tagScore * 0.7) + (jdScore * 0.3));
    } else if (totalTags > 0) {
        finalScore = Math.round(tagScore);
    } else if (jdKeywords.length > 0) {
        finalScore = Math.round(jdScore);
    } else {
        finalScore = 50;
    }
    
    return { score: Math.max(0, Math.min(100, finalScore)) };
}

// Custom Boundary Matching Engine (solves false-positive substring collisions)
function matchKeyword(text, keyword) {
    const textLower = text.toLowerCase();
    const escaped = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    // Boundary matching: checks that the keyword is not preceded or followed by standard alphanumeric characters.
    // This allows special chars like C++, C#, .NET, Node.js to match properly while preventing partial matches on words like "reactive".
    const regex = new RegExp(`(?:^|[^a-zA-Z0-9])(${escaped})(?:$|[^a-zA-Z0-9])`, 'i');
    return regex.test(textLower);
}

// Centralized qualification tag removal with dynamic re-screening and UI syncing
function removeQualificationTag(val, tagElement) {
    state.qualifications = state.qualifications.filter(q => q !== val);
    tagElement.remove();
    state.activeVersionId = null; // Mark version as customized/uncommitted
    screenAllCandidates(); // Trigger dynamic re-screening instantly!
    renderTimeline(); // Refresh timeline selection borders
    saveStateToLocalStorage();
}

// ----------------------------------------------------
// AI SCREENING API & FLOATING ALERT TOASTS
// ----------------------------------------------------

// Render all candidates in temporary AI Loading card visual states
function renderDashboardLoading() {
    state.candidates.forEach(cand => {
        cand.isLoading = true;
    });
    renderDashboard();
}

// Visual Alert Toast controller
function showToast(message, type = "info") {
    if (!elements.toastContainer) return;
    
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    let icon = "";
    if (type === "success") {
        icon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    } else if (type === "warning") {
        icon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
    } else {
        icon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }
    
    toast.innerHTML = `
        ${icon}
        <span style="flex: 1; word-break: break-word;">${message}</span>
    `;
    
    elements.toastContainer.appendChild(toast);
    
    // Auto remove toast elements
    setTimeout(() => {
        toast.style.animation = "toastFadeOut 0.3s ease forwards";
        setTimeout(() => toast.remove(), 300);
    }, 4700);
}

// Call standard Chat Completions Endpoint in structured JSON Mode
async function screenCandidateWithAI(candidate) {
    const endpoint = `${state.aiEndpoint.replace(/\/+$/, "")}/chat/completions`;
    
    const systemPrompt = `You are a highly precise, automated HR Candidate Screening Agent. You evaluate candidate resumes against requirements.
Your output MUST be a single, valid JSON object following this EXACT format:
{
  "score": 85,
  "matches": ["React", "CSS"],
  "missing": ["Node.js"],
  "strengths": ["Demonstrates 4+ years of responsive frontend design.", "Excellent API Integration experience."],
  "gaps": ["Lacks explicit backend API creation experience in Node."]
}
Ensure matches/missing arrays ONLY list qualifications from the exact list provided. Strengths/gaps must be concise, helpful, and under 15 words each. Only return the JSON. No wrappers, no markdown formatting.`;

    const userPrompt = `JOB SPECIFICATIONS:
Description:
${state.jobDescription}

Required Qualification Tags:
${JSON.stringify(state.qualifications)}

CANDIDATE RESUME RAW TEXT:
${candidate.rawText}`;

    // Standard Chat Completion Payload
    const payload = {
        model: state.aiModel,
        response_format: { type: "json_object" },
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ],
        temperature: 0.1 // very deterministic
    };
    
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${state.aiToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errText}`);
    }
    
    const data = await response.json();
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error("Improper chat completions response format.");
    }
    
    const content = data.choices[0].message.content;
    const parsed = JSON.parse(content);
    
    // Confirm schema keys are in place
    if (parsed.score === undefined || !Array.isArray(parsed.matches) || !Array.isArray(parsed.missing)) {
        throw new Error("JSON returned is missing required keys.");
    }
    
    // Ensure lists exist
    return {
        score: Math.max(0, Math.min(100, Number(parsed.score))),
        matches: parsed.matches,
        missing: parsed.missing,
        strengths: parsed.strengths || ["Semantic alignment looks strong."],
        gaps: parsed.gaps || ["No major discrepancies found."]
    };
}
