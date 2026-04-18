Auto-Posting AI Project

A FastAPI-based AI-powered automation project that allows automatic posting and management of tasks (todos) using a PostgreSQL database, SQLModel, and an AI agent (via Gemini API). This project demonstrates backend automation, AI integration, and database management in a modern Python stack.

Table of Contents

Project Overview

Features

Tech Stack

Project Structure

Installation

Environment Setup

Database Setup

Running the Project

API Endpoints

AI Agent Functionality

Usage Examples

Contributing

License

Project Overview

This project automates posting tasks (todos) and uses an AI agent to process commands like add, update, and delete tasks. It is designed for:

Automation enthusiasts

AI experimenters

Developers learning FastAPI with AI integrations

Key goals:

Store todos in a PostgreSQL database.

Handle todo operations automatically via AI agent commands.

Provide a clean and modular FastAPI backend.

Features

✅ Add, update, delete, and fetch todos

✅ AI-powered task management using Gemini API

✅ PostgreSQL storage with SQLModel ORM

✅ Modular project structure for scalability

✅ Easy-to-extend architecture for other automation tasks

Tech Stack

Python 3.11+ – Programming language

FastAPI – Backend framework for APIs

SQLModel – ORM for PostgreSQL

PostgreSQL – Relational database

Gemini API – AI agent for automated commands

Uvicorn – ASGI server for running FastAPI

Optional tools:

Streamlit – Frontend interface (if integrated)

Docker – Containerization for deployment

Project Structure
auto-posting-project/
│
├── main.py              # FastAPI app initialization
├── connection.py        # Database connection setup
├── routes.py            # API routes
├── middleware.py        # Optional middleware (auth, logging)
├── model.py             # SQLModel schemas for todos
├── agent.py             # AI agent logic using Gemini API
├── utils.py             # Utility functions
├── .env                 # Environment variables (DB credentials, API keys)
└── requirements.txt     # Python dependencies


Explanation:

main.py: Initializes FastAPI app, includes routes, and sets up middleware.

connection.py: Connects to PostgreSQL using SQLModel and handles session creation.

routes.py: Defines all endpoints for todos (/add, /update, /delete, /list).

middleware.py: Optional layer for logging requests or authentication.

model.py: Defines Todo models including fields like id, title, description, status, created_at.

agent.py: Handles AI agent commands using Gemini API to automate tasks.

utils.py: Contains reusable helper functions (e.g., date formatting, AI response parsing).

Installation

Clone the repository:

git clone https://github.com/Sunny-Janjua/auto-posting-project.git
cd auto-posting-project


Create a virtual environment:

python -m venv venv


Activate the virtual environment:

Windows:

venv\Scripts\activate


Linux/Mac:

source venv/bin/activate


Install dependencies:

pip install -r requirements.txt

Environment Setup

Create a .env file in the root directory:

DATABASE_URL=postgresql+psycopg2://username:password@localhost:5432/your_db
GEMINI_API_KEY=your_gemini_api_key


Replace username, password, and your_db with your PostgreSQL credentials.

Replace GEMINI_API_KEY with your Gemini API key for AI agent integration.

Database Setup

Make sure PostgreSQL is installed and running.

Create a database:

CREATE DATABASE auto_posting_db;


Run migrations or create tables via SQLModel:

from connection import engine
from model import Todo
SQLModel.metadata.create_all(engine)

Running the Project

Start the FastAPI app using Uvicorn:

uvicorn main:app --reload


Visit http://127.0.0.1:8000/docs for the interactive API documentation.

API Endpoints
Endpoint	Method	Description
/todos/	GET	List all todos
/todos/	POST	Add a new todo
/todos/{id}	PUT	Update a todo by ID
/todos/{id}	DELETE	Delete a todo by ID
/agent/	POST	Send command to AI agent
AI Agent Functionality

The AI agent powered by Gemini API can:

Add new todos automatically from natural language commands

Update or delete todos based on context

Parse AI output to match database schema

Handle errors and confirmations

Example command:

{
  "command": "Add a todo 'Finish project report' for today"
}


The agent will process the command and store it in the PostgreSQL database.

Usage Examples

Adding a todo via API:

POST /todos/
{
    "title": "Finish project report",
    "description": "Complete the final draft of AI project",
    "status": "pending"
}


Updating a todo:

PUT /todos/1
{
    "status": "completed"
}


AI Agent command:

POST /agent/
{
    "command": "Update todo 1 status to completed"
}

Contributing

Contributions are welcome!

Fork the repository

Create a new branch (git checkout -b feature/new-feature)

Commit your changes (git commit -m "Add feature")

Push to branch (git push origin feature/new-feature)

Create a Pull Request

License

This project is licensed under the MIT License.