import os
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI(
    title="KI-Agenten Intro Presentation Server",
    description="Serves the interactive presentation web app for Digitaltag 2026",
    version="1.0.0"
)

# Route to redirect root access to the static presentation index
@app.get("/")
def read_root():
    return RedirectResponse(url="/static/index.html")

# Route to redirect /kmu to the static KMU roadmap page
@app.get("/kmu")
def read_kmu():
    return RedirectResponse(url="/static/kmu.html")

# Ensure static directories exist
os.makedirs("static/css", exist_ok=True)
os.makedirs("static/js", exist_ok=True)
os.makedirs("static/assets", exist_ok=True)
os.makedirs("notebooks", exist_ok=True)

# Mount the static files directory
app.mount("/static", StaticFiles(directory="static"), name="static")

if __name__ == "__main__":
    import uvicorn
    # Run the server locally on port 8080
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
