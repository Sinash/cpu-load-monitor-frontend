# 🚀 CPU Load Monitor - Frontend Application

![Node.js](https://img.shields.io/badge/Node.js-v14%2B-green?style=flat&logo=node.js)
![React](https://img.shields.io/badge/React-v17%2B-blue?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.0%2B-blue?style=flat&logo=typescript)
![Jest](https://img.shields.io/badge/Jest-27.0%2B-red?style=flat&logo=jest)
![SCSS](https://img.shields.io/badge/SCSS-3.0%2B-pink?style=flat&logo=sass)

## 📝 Overview

The **CPU Load Monitor Frontend Application** is a React-based web application that provides a real-time graphical interface to monitor CPU load. It interacts with the [Backend Service](https://github.com/Sinash/cpu-load-monitor-backend) to fetch CPU load data, track historical data, and visualize high load alerts and recovery events.

---

## ✨ Features

- 📊 **Real-time CPU Load Visualization**: Get a visual representation of the real-time CPU load.
- 📈 **Historical Data Graphs**: View the CPU load history for the last 10 minutes.
- 🔔 **High Load & Recovery Alerts**: Visualize high load and recovery events with clear indicators.
- 🌐 **Responsive UI**: Optimized for both desktop and mobile devices.

---

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime for server-side development.
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript for enhanced development experience.
- **Jest**: Testing framework for unit and integration tests.
- **ESLint**: Linter to maintain consistent and error-free code.
- **Prettier**: Code formatter to enforce a consistent style.
- **Nodemon**: Tool to automatically restart the server during development.
- **Husky**: Git hooks to enforce code quality before commits.
- **Dotenv**: Manages environment variables efficiently.

---

## 📦 Installation

### ✅ Prerequisites

Ensure you have the following installed:

- **Node.js**: Version 14.x or higher
- **npm**: Installed with Node.js (ensure it's updated using `npm install -g npm`)
- **nvm**: Recommended to manage Node.js versions
- **backend-service**: Make sure the backend service is up and running on a different port (preferably `3001`) than this application.

-- To verify Node.js is installed:

```bash
node -v
```

-- Find the setup instruction for the back-end service [here](https://github.com/Sinash/cpu-load-monitor-backend?tab=readme-ov-file#-cpu-load-monitor---backend-service)

### 🛠️ Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone git@github.com:Sinash/cpu-load-monitor-frontend.git
   cd cpu-load-monitor-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory:

   ```bash
   # .env
   PORT=3000
   BACKEND_URL="/api/v1"
   REACT_APP_API_USERNAME="cpu-user"
   REACT_APP_API_PASSWORD="cpu-password"
   ```

4. **Run the service:**

   For development with auto-restart:

   ```bash
   npm run dev
   ```

   For production:

   ```bash
   npm start
   ```

---

## 💻 Development Guide

### 1️⃣ **Linting**

Run ESLint to check for code issues:

```bash
npm run lint
```

To auto-fix issues:

```bash
npm run lint:fix
```

### 2️⃣ **Code Formatting**

Run Prettier to format your code:

```bash
npm run format
```

### 3️⃣ **Testing**

Run all tests using Jest:

```bash
npm test
```

---

## 📝 Commit Message Guidelines

- Use the present tense: "Add feature" not "Added feature."
- Limit the first line to 72 characters.
- Reference issues or PRs if applicable.

Example commit message:

```bash
git commit -m "feat: update the alert logic to set the threshold to 2 mins"
```

---

## 📸 Screenshots

---
