Insight – AI Personal Growth Analyzer

Insight is a web application that analyzes a user's personality, goals, and habits to generate meaningful insights and a personal growth roadmap. The system combines a modern Next.js frontend with AI-powered analysis modules.

Features

AI-based personality analysis

Goal alignment insights

Personal growth roadmap

Visual dashboard with charts

Activity tracking and reminders

Clean and responsive UI

Tech Stack

Frontend

Next.js

React

TailwindCSS

Recharts

Backend / AI Modules

Python analysis modules

Insight engine

Personality analyzer

Goal alignment system

Other Tools

TypeScript

ESLint

Project Structure
app/                → Next.js application pages
components/         → UI components and charts
analyzer/           → AI personality and goal analysis
tracker/            → Activity tracking logic
notifications/      → Reminder system
database/           → Database manager
charts/             → Chart generation
ui/                 → UI logic and theme management
Installation

Clone the repository

git clone <your-repo-link>
cd <repo-folder>

Install dependencies

npm install
Running the Project

Add your google AI Api Key at the .env example

To start the development server:

npm run dev

The application will start on:

http://localhost:3000

Open this in your browser to access the project.

Available Scripts

Run development server

npm run dev