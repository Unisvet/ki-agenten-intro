# KI-Agenten Intro Presentation (Digitaltag 2026)

This repository contains an interactive, creative web-based presentation for the event **"Digitaltag 2026 | Einblicke in die Welt der KI-Agenten"**, hosted by the **Mittelstand-Digital Zentrum Spreeland**.

The presentation guides participants through the evolution of AI: from static Large Language Models (LLMs) to autonomous, goal-driven **AI Agents** equipped with tools, skills, and advanced orchestration logic.

## Key Features

1. **Interactive 3D Canvas:** Built with Three.js. Floating 3D shapes represent core agent components (Model, Tools, Orchestration, Deployment). Clicking an object displays its details.
2. **ReAct Agent Simulator:** A step-by-step visual simulator showing how an agent works under the hood (Reasoning -> Action -> Observation cycle).
3. **Google Colab Playground:** Drag-and-drop workspace to preview `.ipynb` files locally, with a direct link to launch them in Google Colab.
4. **Red Theme:** Designed with a premium dark theme and a `#CD0A1E` red corporate brand palette.

## Getting Started (Local Run)

This project uses the `uv` Python package manager for virtual environment and dependency isolation.

1. **Verify Python & Install uv:** Make sure you have `uv` installed.
2. **Sync Environment:**
   ```bash
   uv sync
   ```
3. **Run the Web Server:**
   ```bash
   uv run python main.py
   ```
4. **Access the Presentation:** Open your browser and navigate to `http://localhost:8080`.

## Google Cloud Run Deployment

To deploy this project to Google Cloud Run, follow these steps:

1. **Build & Push Docker Container:**
   ```bash
   gcloud builds submit --tag gcr.io/[PROJECT_ID]/ki-agenten-intro
   ```
2. **Deploy to Cloud Run:**
   ```bash
   gcloud run deploy ki-agenten-intro --image gcr.io/[PROJECT_ID]/ki-agenten-intro --platform managed --allow-unauthenticated
   ```
   *(Ensure billing is enabled in your Google Cloud Project)*
