Loan Intelligence Platform

A full-stack machine learning web application for loan data analysis and prediction. The platform combines a modern web interface built with Next.js (React) and a Python backend powered by FastAPI. It ingests raw loan data, performs automated cleaning and preprocessing, trains multiple machine learning models, and exposes prediction APIs consumed by the frontend. The goal of the project is to provide an end-to-end pipeline from raw CSV data to real-time loan risk predictions through a production-ready architecture.

Tech Stack
Frontend:
Next.js
React
TypeScript
Tailwind CSS
Axios

Backend:
Python
FastAPI
Pandas
NumPy
Scikit-Learn
XGBoost
LightGBM

Architecture Overview:

The system follows a classic full-stack + ML architecture. The frontend communicates with the backend through REST APIs. The backend handles data processing and machine learning inference. Trained models are loaded at runtime and used to generate predictions. High-level flow:
User Interface → Next.js Frontend → FastAPI Backend → Machine Learning Pipeline → Prediction → Frontend Display


Machine Learning Pipeline:

Data Ingestion
Missing Value Detection
Data Cleaning
Feature Engineering
Model Training
    Logistic Regression, XGBoost, LightGBM . All models are compared, and the best-performing one is selected for deployment.
Model Persistence
Model Serving


Project Structure:
The repository is organized into frontend, backend, and data layers. Backend contains API application, ML pipeline, trained models, and business logic. Frontend contains pages, UI components, and API services. A separate data folder contains the raw CSV dataset.

Backend Responsibilities
The FastAPI backend handles CSV ingestion, data preprocessing, feature transformation, machine learning inference, and REST API exposure. It also provides automatic API documentation.

Frontend Responsibilities
The Next.js frontend handles user interface, data input forms, prediction requests, and result visualization. It communicates with FastAPI using HTTP requests.

API Flow:

User submits data through the frontend
Next.js sends request to FastAPI
FastAPI preprocesses input
ML model generates prediction
Result is returned to frontend
Frontend displays output
