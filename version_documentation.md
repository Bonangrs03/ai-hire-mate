# CV Screener - User & Technical Documentation

Welcome! This documentation explains **how the Version Control system works** and **how candidates are evaluated, scored, and filtered** in your browser.

---

## Part 1: How Version Control Works (User Guide)

The **Version History** timeline in the sidebar lets you track, document, rollback, and compare different job requirements as you screen candidates. All data is saved in your browser's local storage so nothing is lost when you refresh.

### 1. Committing a Spec Version (Saving)
* **What it does**: Saves a "snapshot" of your active Job Description, active Qualification Tags, candidate rankings, and candidate scores at that specific moment.
* **How to use**: 
  1. Modify your Job Requirements or add/remove tags.
  2. Click **Apply Specifications** to screen.
  3. Under **Version History** in the sidebar, type a short message (e.g., *"Added TypeScript & Node"*) in the save box.
  4. Click **Commit Spec Version** (or press Enter). A new version (`v1`, `v2`, etc.) will appear at the top of your timeline.

### 2. Restoring a Spec Version (Rollback)
* **What it does**: Instantly resets the entire web application to that version's criteria.
* **How to use**: 
  * Click **Restore** on any version card in the timeline log.
  * The form's Job Description, qualification tags, dashboard stats, candidate cards, scores, and columns will instantly rollback to that version.

### 3. Comparing Specs Side-by-Side (Diff Drawer)
* **What it does**: Shows you exactly what changed between a past version and your current active requirements, and how candidate scores shifted.
* **How to use**: 
  1. Click **Compare Spec** on any timeline card.
  2. A panel slides out from the right displaying:
     * **Tag Changes**: Emerald green tags show skills you *added* (`+`), and red tags show skills you *deleted* (`-`).
     * **Candidate Match Shifts**: A visual list of candidates showing how their score changed between the two spec versions (e.g. *Alex Mercer: 80% ➔ 91% (+11%)*).
     * **Description changes**: Side-by-side view of the Job Descriptions.

---

## Part 2: How the Filtering & Scoring Engine Works

The screening engine processes resumes **100% locally in your browser's memory** (via web workers) to protect candidate data privacy. No resumes ever leave your computer.

### Step 1: Real-time File Parsing
* When you upload a folder, the engine scans for `.pdf` and `.txt` files.
* Text files are read instantly.
* PDF files are parsed using a built-in library (**PDF.js**) page-by-page to extract raw text characters.

### Step 2: Custom Boundary Matching (No False Positives)
To prevent incorrect keyword matches, the system uses a **Custom Boundary Regex**.
* **The Problem**: A standard search for `"React"` matches words like `"reactive"` or `"direction"`. A search for `"CSS"` matches words like `"successful"` or `"process"`.
* **The Solution**: The engine isolates the search term and ensures it is surrounded by non-alphanumeric borders (spaces, punctuation, start/end of lines):
  ```
  (?:^|[^a-zA-Z0-9])(tag)(?:$|[^a-zA-Z0-9])
  ```
* This matches special symbols (like `C++`, `Node.js`, `.NET`, `C#`) while strictly blocking false positives (like matching `Java` in `JavaScript` or `React` in `reactive`).

### Step 3: Weighted 70/30 Match Score
Each candidate's final suitability percentage (0% to 100%) is calculated using a weighted formula:
1. **Qualifications Score (70% weight)**: Measures what percentage of your active **Qualifications Tags** are found in their CV.
2. **Job Description Density (30% weight)**: Automatically extracts high-value technical keywords from your **Job Description** text and measures their density inside the candidate's CV to calculate a semantic overlap.
3. **Final Score formula**:
   $$\text{Final Score} = (\text{Qualifications Tag Ratio} \times 70\%) + (\text{Job Description Density Ratio} \times 30\%)$$

### Step 4: Suitability Classification
Candidates are automatically categorized into panels based on their final score:
* **Suitable Panel (Green)**: Final Match Score is **$\ge 60\%$**. These candidates represent a strong fit.
* **Not Suitable Panel (Red/Amber)**: Final Match Score is **$< 60\%$**. These candidates represent a low keyword/qualification match.

### Step 5: Highlight & Strengths Summary
* **Highlights**: When you open a candidate's profile, matching qualification terms are highlighted in **violet**, and other high-value job description keywords are highlighted in **purple**.
* **Strengths List**: Auto-generates summary points showing precisely which requirements the candidate met and mentions of years of experience.
* **Gaps List**: Auto-generates bullet points highlighting which required qualification tags are completely missing from their resume.

---

## Part 3: HR Best Practices for Perfect Results

To get the most accurate screening results:
1. **Keep Qualification Tags Short and Specific**: 
   * **Correct**: `"React"`, `"TypeScript"`, `"Python"`, `"Node.js"`.
   * **Incorrect**: `"Must have 3 years of senior react experience"`.
   * *Why?* The boundary engine checks for the exact phrase inside the CV. Short skill keywords are highly reliable.
2. **Mention Years of Experience in Qualifications**: 
   * If you want to check years of experience, enter a tag like `"3+ years"` or `"5 years"`. The engine scans the CV text for experience statements (e.g. *"5+ years of experience in"* or *"3 years experience"*).
3. **Write Detailed Job Descriptions**: 
   * The 30% Job Description overlap helps reward candidates who write detailed resumes matching your role's specific vocabulary, tools, and methodologies.

---

## Part 4: AI-Powered Screening (Using OpenCode/OpenAI Subscriptions)

You can supercharge your evaluations by enabling **AI-Powered Screening**. This leverages advanced AI models to read, analyze, and score resumes with deep semantic understanding.

### 1. How to Connect Your Subscription Key
1. In the left sidebar, click the **AI Screening Setup** header to expand the panel.
2. Check the **Enable AI Screen** toggle switch.
3. Paste your **Subscription Key/Token** in the key field:
   * **OpenCode Go/Zen Token**: Paste your generated `/connect` token key (from `opencode.ai`).
   * **OpenAI Key**: Paste your standard `sk-...` API key.
4. Set the **API Base URL**:
   * For standard OpenAI keys, leave it as `https://api.openai.com/v1` (Default).
   * For OpenCode subscription servers or proxies, enter your custom gateway URL.
5. Set the **Model Name**:
   * Defaults to `"gpt-4o-mini"` (highly recommended as it is ultra-fast, cheap, and very accurate).

### 2. How the AI screens candidates
Once enabled, clicking **Apply Specifications** or **loading a folder** triggers parallel asynchronous AI completion fetches:
1. **Visual Loading States**: Candidate cards instantly show a spinner badge with an animated `"AI Screening"` status. The UI remains fully responsive.
2. **JSON Mode Completions**: The app connects directly to the API endpoint utilizing strict system parameters and **JSON Mode (`response_format: { type: "json_object" }`)**. 
3. **Structured Response**: The AI returns a JSON schema containing:
   * `"score"`: A weighted rating (0 to 100) analyzing exact fit.
   * `"matches"` & `"missing"`: Filtered checks indicating which active qualifications the candidate actually has vs lacks.
   * `"strengths"` & `"gaps"`: Deep semantic summaries explaining why they are suitable and where their specific experience falls short.

### 3. Zero-Error Fallback (Protected System)
What if your credit runs out, your internet drops, or you input an invalid API key?
* The app **does not crash or freeze**.
* An alert **Toast Notification** pops up on the bottom-left of the screen alerting you that the AI screening failed for that specific candidate.
* The candidate card **immediately falls back to the Local Fast Matcher** (the custom regex keyword engine) and successfully displays their local evaluations and scores.
* You are fully protected from API downtime or credit exhaustion! You can toggle AI screening off at any time to return to 100% free local keyword matching.
