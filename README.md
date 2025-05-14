# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# 🧠 NeuroEase – Full Stack + LLM-Powered Mental & Technical Aid Platform

**NeuroEase** is a full stack web application powered by LLMs (Large Language Models), designed to help users tackle both mental health issues and technical skill challenges. It provides intelligent, expert-specific guidance with **strict domain boundaries**, ensuring users receive trusted and focused responses.

---

## 🚀 Key Features

- ✅ **Strict Expertise Enforcement**: Each AI expert responds **only** within its domain.  
  _e.g., An anxiety expert does **not** answer depression or technical queries._
- 🤖 **LLM-Powered Support**: Uses Gemini 2.0 Flash (LLM) to generate expert-level answers
- 🌐 **Full Stack Architecture**: Complete frontend, backend, and AI pipeline
- 🧭 **Interactive Flowchart**: Clear visualization of user journey and decision branches
- 🧘 **Lifestyle Enhancements**: Includes meditation, music therapy, and productivity boosters
- 🧠 **Dual Challenge Handling**: Helps users with both **Mental Health** and **Technical Problems**

---

## 🏗️ Tech Stack

### 🖥️ Frontend:
- HTML, CSS, Tailwind CSS
- JavaScript (Vanilla or React)

### 🛠️ Backend:
- Node.js + Express
- (Optional: MongoDB/Firebase for user sessions)

### 🤖 AI/ML Integration:
- Gemini 2.0 Flash (LLM from Google Generative AI)
- Strict domain-based logic for secure response

### 📊 Visualization:
- Python + Graphviz in Google Colab for user flowchart rendering

---

## 🧠 Supported Domains

### 🔹 Mental Health Domains:
- Anxiety
- Depression
- Time Management
- Anger Issues
- Eating Disorders
- Trauma & Stress
- Sleep Disorders
- Personality Disorders
- Relationship Issues

### 🔸 Technical Skill Challenges:
- Frontend / Backend Development
- Programming Languages
- AI/ML & Data Science
- Cybersecurity / Blockchain / Web3
- Mobile Apps / Game Dev / Embedded Systems
- DevOps / Cloud / Quantum Computing / Robotics
- Soft Skills: Public Speaking, Leadership, Writing, and more

---

## 📌 How It Works

1. User submits a challenge (mental or technical)
2. System identifies the correct expert domain
3. The domain-specific LLM responds **strictly within scope**
4. (Optional) Suggestions for healing, focus, and motivation are provided

---

## 📂 Project Structure

NeuroEase/
├── frontend/ # User interface (HTML, CSS, JS/Tailwind)
├── backend/ # Express backend, API routes
├── llm_api/ # Gemini 2.0 Flash API integration
├── flowchart/ # Google Colab + Graphviz flowchart
└── README.md # This file


---

## 📸 Visual Preview

> Flowchart: How NeuroEase guides you  
![NeuroEase Flowchart](C:\Users\Biswajit\Pictures\Screenshots\Screenshot (62).png)

---

## 💎 What Makes NeuroEase Unique?

🛡️ **Strict Domain Expertise**:  
Unlike generic AI bots, NeuroEase uses expert-restricted LLM responses. Each LLM instance is configured to **only reply to its area of expertise**—ensuring **highly relevant, focused, and trusted answers**.

🔗 Combines **Mental Wellness + Tech Guidance** in a single user-centric platform.

📊 Offers **visual flow clarity** for users to trace how decisions are made.

---

## 📥 Getting Started

### Run Backend and frontend :
```bash
cd server
npm install
Node server.js
cd ..
cd client
npm install
npm run dev 
