# Portfolio Projects Reference

This document contains a consolidated summary of all the projects and services rendered by the developer, gathered from the local repositories for reference when building the portfolio site.

Copies of the original `README.md` and `AGENTS.md` files for these projects are stored in `./docs/`.

---

## 1. Diaclectics
**Description:** Relational Contracting & Epistemic Telemetry Engine for Anti-Sycophancy AI. An engine that intercepts and self-corrects LLM sycophancy before token emission, utilizing real-time OpenAlex academic search to verify claims.
**Technologies:** Python, Docker, Vector Embeddings, Fast SLM Reasoning.
**GitHub Repository:** [CambrianMinds/diaclectics](https://github.com/CambrianMinds/diaclectics)
**Live Site / Docs:** [https://cambrianminds.github.io/diaclectics](https://cambrianminds.github.io/diaclectics)

---

## 2. Indiana Expungement Assistant
**Description:** A 100% client-side civic open-source document preparation engine. It scrapes Indiana MyCase court records securely in the browser and generates 10 court-ready expungement pleadings (IC § 35-38-9) using `pdf-lib`. It guarantees zero cloud telemetry to protect user PII and distributes as both a Chrome MV3 Extension and a PWA.
**Technologies:** JavaScript (ES6), Chrome Manifest V3, Knockout.js scraping, pdf-lib, Jest, Playwright.
**GitHub Repository:** [CambrianMinds/expunger](https://github.com/CambrianMinds/expunger) / [CambrianMinds/exp-2](https://github.com/CambrianMinds/exp-2)
**Live Site / Docs:** [https://cambrianminds.github.io/exp-2/](https://cambrianminds.github.io/exp-2/)

---

## 3. Local Brain
**Description:** Zero-Egress Desktop Document Intelligence & Embedded Fine-Tuned SLM Workstation. An air-gapped desktop app designed for secure document analysis. Features an embedded Gemma-4 SLM via `node-llama-cpp`, dense vector search via LanceDB, and a SQLite-backed living personal wiki system.
**Technologies:** Electron, React, TypeScript, Node.js, C++ Bindings (node-llama-cpp), LanceDB, SQLite, Vulkan Compute.
**GitHub Repository:** [CambrianMinds/local-brain](https://github.com/CambrianMinds/local-brain)
**Live Site / Docs:** [https://cambrianminds.github.io/local-brain/](https://cambrianminds.github.io/local-brain/)

---

## 4. The Lava (Real Estate CRM)
**Description:** A bespoke, offline-first real estate client management system (CRM) replacing Coldwell Banker's default CRM. Features Google Maps integration, handwriting card mailer pipelines, House-iversaries tracking, Avery 5160 label printing, and Firebase cloud sync.
**Technologies:** React 19, TypeScript, Vite, Tailwind CSS v4, Firebase Auth/Firestore, Google Maps API.
**GitHub Repository:** CambrianMinds/the-lava
**Live Site / Docs:** N/A (Private / Standalone Tool)

---

## 5. xAI TTS Studio
**Description:** A modern, terminal-native user interface (TUI) studio for synthesizing expressive audio with the xAI Text-to-Speech API. Features dynamic voice discovery, inline speech tag insertion, and background asynchronous synthesis.
**Technologies:** Python 3.10+, Textual, httpx.
**GitHub Repository:** [cambrianminds/xai-tts](https://github.com/cambrianminds/xai-tts)
**Live Site / Docs:** [https://cambrianminds.github.io/xai-tts/](https://cambrianminds.github.io/xai-tts/)

---

## 6. GitHub CLI TUI (`gh-tui`)
**Description:** A terminal user interface wrapper for the official GitHub CLI (`gh`). Makes exploring repositories, reading issues/PRs in Markdown, and performing bulk actions accessible without memorizing commands.
**Technologies:** Python 3.10+, Textual.
**GitHub Repository:** [cambrianminds/gh-tui](https://github.com/cambrianminds/gh-tui)
**Live Site / Docs:** [https://cambrianminds.github.io/gh-tui/](https://cambrianminds.github.io/gh-tui/)

---

## 7. CambrianSystems TUI
**Description:** A self-contained terminal workstation for encoding, decoding, hashing, and inspecting data (Base64, JWT, hashes, image conversion). Runs entirely via a single PowerShell script with zero external dependencies and no internet access required.
**Technologies:** PowerShell 5.1/7+, .NET native assemblies (C# inline).
**GitHub Repository:** CambrianMinds/base64-tui
**Live Site / Docs:** N/A (CLI Tool)

---

## 8. Universal Action Figure Appraiser
**Description:** AI-Powered Vintage TMNT Action Figure Cataloging, Valuation, and Inventory Export App. A standalone React+Vite app bundled with a portable Node.js runtime and SQLite database.
**Technologies:** React, Vite, Node.js, SQLite3, Express.
**GitHub Repository:** CambrianMinds/universal-action-figure-valuation
**Live Site / Docs:** N/A (Standalone App)
