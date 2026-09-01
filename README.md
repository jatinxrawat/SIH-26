<div align="center">

# BUSINESS COMPASS
### AI-Powered One-Stop Business Companion for Rural & Marginalized Entrepreneurs

[![Smart India Hackathon 2026](https://img.shields.io/badge/SIH-2026-059669?style=for-the-badge&logo=target&logoColor=white)](https://sih.gov.in)
[![Problem Statements](https://img.shields.io/badge/PS-SIH26091%20%7C%20SIH26092-0B132B?style=for-the-badge)](https://sih.gov.in)
[![Ministry](https://img.shields.io/badge/Ministry-Social%20Justice%20%26%20Empowerment-D97706?style=for-the-badge)](https://socialjustice.gov.in)
[![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20Tailwind%20CSS-0284C7?style=for-the-badge)](https://react.dev)

<p align="center">
  <strong>"From Business Idea to Business Growth — One Guided Journey."</strong>
</p>

<p align="center">
  <em>Instead of making first-time entrepreneurs navigate 40+ portals, loans, and legal paperwork alone, Business Compass understands their trade context and tells them what they are eligible for, how they can fund it, who can help them, and exactly what to do next.</em>
</p>

</div>

---

## Executive Summary

A first-time rural or marginalized entrepreneur in India does not suffer from a single isolated problem—they face a **continuous chain of compounding friction**:
1. **Government Schemes:** Thousands of programs across central and state ministries, yet impossible to know which apply to their craft, district, or social category.
2. **Funding Opacity:** Severe uncertainty around loan structuring, subsidies, margin money (own contribution), and hidden capital gaps.
3. **Business Setup:** Overwhelming registration (Udyam, GST, FSSAI) and compliance paperwork.
4. **Decision Paralysis:** Even after collecting documents, they lack a personalized, sequenced **next best action**.

**Business Compass** unifies fragmented business assistance into **one intelligent companion**.

---

## SIH Problem Statements Mapping

Rather than presenting two disconnected hackathon features, Business Compass presents **one cohesive national platform**:

| Problem Statement | Focus Area | Role in Platform |
| :--- | :--- | :--- |
| **SIH26091 (Core)** | **Hyper-Local Business Advisory Assistant for Rural Micro-Entrepreneurs** | Core advisory engine, loan structuring, margin calculations, subsidy modeling, sequential roadmap, and contextual AI guidance. |
| **SIH26092 (Integrated Module)** | **AI-Driven Scheme Matching for Marginalized Entrepreneurs** | Deterministic eligibility engine filtering 1,200+ central and state schemes by craft, location, income, caste/gender incentives, and project scale. |

---

## Core Philosophy: Every Module Feeds the Next Module

We reject disconnected feature checklists. In Business Compass, every component informs the next:

```text
               ENTREPRENEUR PROFILE (Craft, District, Scale, Margin)
                                     │
                                     ▼
                    BUSINESS UNDERSTANDING & UNIT SIZING
                                     │
                                     ▼
                 DETERMINISTIC SCHEME ELIGIBILITY MATCH
                                     │
                                     ▼
                 FUNDING & CAPITAL STACK PLANNING (Subsidy + Loan)
                                     │
                                     ▼
                    PERSONALIZED BUSINESS ROADMAP
                                     │
                                     ▼
                  SIGNATURE: "WHAT SHOULD I DO NEXT?"
                                     │
                   ┌─────────────────┴─────────────────┐
                   ▼                                   ▼
          CONTEXT-AWARE AI ADVISOR              PROFESSIONAL NETWORK
                   │                                   │
                   └─────────────────┬─────────────────┘
                                     ▼
                        ENTERPRISE LAUNCH & GROWTH
```

---

## System Architecture

```text
                                  ENTREPRENEUR
                                       │
                                       ▼
                       ┌───────────────────────────────┐
                       │       SMART ONBOARDING        │
                       │ Conversational trade intake,  │
                       │ location, stage, own capital  │
                       └───────────────┬───────────────┘
                                       │
                                       ▼
                       ┌───────────────────────────────┐
                       │    BUSINESS PROFILE ENGINE    │
                       │ Structured parameters & sizing│
                       └───────────────┬───────────────┘
                                       │
                 ┌─────────────────────┼─────────────────────┐
                 ▼                     ▼                     ▼
        ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
        │  SCHEME ENGINE  │   │ FUNDING ENGINE  │   │ ROADMAP ENGINE  │
        │ Deterministic   │   │ Own capital,    │   │ Sequenced task  │
        │ rule evaluation │   │ subsidy & loans │   │ milestones      │
        └────────┬────────┘   └────────┬────────┘   └────────┬────────┘
                 │                     │                     │
                 └─────────────────────┼─────────────────────┘
                                       │
                                       ▼
                       ┌───────────────────────────────┐
                       │     NEXT BEST ACTION CORE     │
                       │ "What should I do right now?" │
                       └───────────────┬───────────────┘
                                       │
                       ┌───────────────┴───────────────┐
                       ▼                               ▼
        ┌─────────────────────────────┐ ┌─────────────────────────────┐
        │   CONTEXT-AWARE AI ADVISOR  │ │  BUSINESS SERVICES NETWORK  │
        │ Grounded LLM / RAG guidance │ │ Seeded CA, GST, Legal pros  │
        └─────────────────────────────┘ └─────────────────────────────┘
```

---

## Key Technical Principle: Rules Before AI

> **Critical Design Principle:** Eligibility and financial calculations are NEVER left to generative LLM hallucinations.

```text
Official Ministry Circular / Portal
               │
               ▼
Structured Data & Rules Engine  ──►  Deterministic Eligibility (Yes/No + %)
               │
               ▼
Mathematical Capital Stack Model  ──►  Exact Loan, Margin & Subsidy Numbers
               │
               ▼
LLM / Context Orchestrator       ──►  Plain Regional Language Explanation & Guidance
```

- **Deterministic Logic:** Decides qualification, subsidy percentages, ceilings, and margin formula.
- **AI / LLM:** Explains circulars in plain language, personalizes guidance, connects context across modules, and answers questions.

---

## Core Platform Modules

### 1. Smart Conversational Onboarding
- Low-friction, conversational intake in regional languages.
- Captures trade, district, investment capability, social category, and immediate goals without demanding balance sheets or complex financial jargon.

### 2. Scheme Intelligence Engine
- Evaluates candidate profiles against verified central and state schemes (e.g., PMFME, PMEGP, Mudra, Stand-Up India, NHDP).
- Surfaces match scores, maximum subsidy caps, eligibility checklists, missing documents, and official portal citations (`.gov.in`).

### 3. Funding & Capital Stack Planner
- Mathematical formula:
  $$\text{Total Project Cost} - \text{Entrepreneur Margin (Own Capital)} - \text{Capital Subsidy} = \text{Exact Bank Loan Required}$$
- Identifies the real funding gap upfront so entrepreneurs know their exact cash-in-hand requirement before visiting a bank manager.

### 4. Personalized Business Roadmap
- Breaks down business creation into linear, manageable stages:
  $$\text{Idea} \rightarrow \text{Assessment} \rightarrow \text{Scheme Support} \rightarrow \text{Funding Plan} \rightarrow \text{Compliance \& Registration} \rightarrow \text{Procurement} \rightarrow \text{Launch}$$

### 5. Signature Feature: "What Should I Do Next?"
- Removes decision fatigue by surfacing **one single, high-impact priority action item** on the dashboard.
- Example: *“Prepare your Detailed Project Report (DPR) for the PMFME subsidy application to unlock your ₹1.25L bank appraisal.”*

### 6. Context-Aware AI Advisor
- Grounded assistant that remembers the entrepreneur's trade, location, matched schemes, and capital numbers.
- Answers real questions (*“Can I afford this business?”*, *“What document is missing?”*, *“What should I do first?”*) with context-aware precision.

### 7. Human Professional Support
- Directly connects the entrepreneur to verified local accountants, GST consultants, and documentation specialists when regulatory hurdles require human intervention.

---

## SIH Demo Walkthrough: Meet Sita Devi

| Step | Platform Action | Output for Sita |
| :---: | :--- | :--- |
| **01** | **Onboarding** | Sita inputs: Mango Pickle Processing, Mirzapur (Rural UP), ₹75,000 personal savings. |
| **02** | **Profile Sizing** | Total project requirement calculated at ₹3,00,000. Initial funding gap: ₹2,25,000. |
| **03** | **Scheme Match** | **PMFME Scheme (94% Match)** identified. Up to 35% credit-linked capital subsidy (₹1,00,000 grant). |
| **04** | **Capital Plan** | Own Margin: ₹75k (25%) + Subsidy: ₹100k (33.3%) + Bank Loan: ₹125k (41.7%). Zero funding gap! |
| **05** | **Next Best Action** | *“Prepare your project report for the funding application.”* (Pre-filled bank DPR template ready). |
| **06** | **AI Interaction** | Sita asks *“What should I do first?”* — AI guides her through subsidy documentation without generic chatbot fluff. |

---

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide Icons, Framer Motion
- **Design System:** Warm off-white canvas (`#FBFBFA`), deep navy/slate typography (`#0F172A`), growth emerald accents (`#059669`)
- **Backend Ready:** Node.js / Express API architecture
- **Rules Engine:** Deterministic JSON schema rules for scheme criteria and capital stack formulas
- **AI Architecture:** Context Orchestrator + LLM for natural language guidance

---

## Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/jatinxrawat/SIH-26.git

# Navigate to project directory
cd SIH-26

# Install dependencies
npm install

# Launch development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# Run production build
npm run build
```

---

## Team Execution Plan (6 Members)

- **Member 1 (Lead & Frontend):** Interactive landing page, smart onboarding wizard, main companion dashboard.
- **Member 2 (Scheme Engine):** Curated database of 15–30 verified schemes and deterministic eligibility engine.
- **Member 3 (Funding Engine):** Capital stack calculator, subsidy math, margin formulas, bank loan appraisal logic.
- **Member 4 (AI Orchestrator):** Context-aware advisor, RAG pipeline, prompt engineering with platform memory.
- **Member 5 (Backend & Data):** Node.js/Express REST APIs, database schemas, and integration endpoints.
- **Member 6 (Professional Network & QA):** Local professional directory module, end-to-end user testing, presentation assets.

---

<div align="center">
  <sub>Smart India Hackathon 2026 • Ministry of Social Justice & Empowerment • Digital India</sub>
</div>
