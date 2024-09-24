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

<div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px; text-align: center;">

  <div>
    <p><strong>Overview of the CPU Load Monitor</strong></p>
    <img src="https://github.com/user-attachments/assets/4b44fe1b-548c-4961-a614-a9f8e19addb7" alt="Screenshot 1" width="500"  style="border: 1px solid #ddd; border-radius: 4px; padding: 5px;" />
    <br/><br/>
  </div>

  <div>
    <p><strong>High Load Alert</strong></p>
    <img src="https://github.com/user-attachments/assets/963a8121-c2b2-46fc-997b-b647d9c34f2b" alt="Screenshot 2" width="500"  style="border: 1px solid #ddd; border-radius: 4px; padding: 5px;" />
    <br/><br/>
  </div>

  <div>
    <p><strong>Recovery Alert After Hight Load</strong></p>
    <img src="https://github.com/user-attachments/assets/1d5d8f88-5a4c-4c8b-a631-eeb910af5eb5" alt="Screenshot 3" width="500" style="border: 1px solid #ddd; border-radius: 4px; padding: 5px;" />
    <br/><br/>
  </div>

  <div>
    <p><strong>Second High Load Alert</strong></p>
    <img src="https://github.com/user-attachments/assets/1981b80a-4fe0-42dd-aaff-9ae56f8949d8" alt="Screenshot 4" width="500"  style="border: 1px solid #ddd; border-radius: 4px; padding: 5px;" />
    <br/><br/>
  </div>

## </div>

## 🛠️ Troubleshooting

### API Not Responding / Error Fetching Data

Issue: The frontend is unable to fetch data from the backend API, and you see network errors in the browser console.

**Solution:**

- Ensure the backend service is up and running.
- Check by navigating to the API URL (e.g., http://localhost:3001) or using tools like curl or Postman.
- Ensure API and frontend run on different ports. The frontend could be on port 3000 and the backend on 3001.
- Update the .env file with the correct API URL and port.
- In webpack.config.js, where the proxy is set, you will need to explicitly update the backend service URL for proxying to avoid CORS.

### Issue: Port Already in Use

**Solution**

- Identify the process using the port. On macOS/Linux, run:

```bahs
lsof -i :3000
```

- Kill the process using the following command:

```bash
kill -9 <PID>
```
