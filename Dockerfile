# Use a lightweight Python base image with uv pre-installed
FROM ghcr.io/astral-sh/uv:python3.11-alpine AS builder

# Enable bytecode compilation
ENV UV_COMPILE_BYTECODE=1

# Set the working directory
WORKDIR /app

# Copy dependency definition files
COPY pyproject.toml uv.lock ./

# Install dependencies (frozen lockfile, ignore dev dependencies, don't install the project itself yet)
RUN uv sync --frozen --no-dev --no-install-project

# Copy the rest of the application files
COPY . .

# Complete the sync to install the project
RUN uv sync --frozen --no-dev

# Final runtime stage
FROM python:3.11-alpine

WORKDIR /app

# Copy virtual environment and project assets from the builder stage
COPY --from=builder /app /app

# Update path to use the virtual environment binaries directly
ENV PATH="/app/.venv/bin:$PATH"

# Cloud Run injects the PORT environment variable (defaulting to 8080)
EXPOSE 8080

# Launch the FastAPI app using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
