@echo off
cd backend
poetry run uvicorn src.main:app --reload
pause
