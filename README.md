# 🗂️ TaskManager — Modern Full-Stack Task Management App

A production-ready, full-stack Task Manager built with **React**, **Node.js**, **PostgreSQL**, **Prisma**, and **Docker** — designed to be deployed on an **AWS EC2** instance.

> Built as a hands-on project to practice full-stack development, REST APIs, Docker, and cloud deployment.

---

## ✨ Features

- ✅ **Create, Read, Update, Delete** tasks
- 👤 **Persistent Profile**: Set name, position, and upload a profile photo (stored as Base64 in DB)
- 🔍 **Search** tasks by title or description
- 🎛️ **Filter** by All / Pending / Completed / Priority
- 📊 **Dashboard** with live statistics cards
- 🌙 **Dark Mode** toggle (fixed for Tailwind v4)
- 🔔 **Interactive Notifications**: View recent app events in a header dropdown
- 🚀 **Dockerized**: Fully containerized with Nginx reverse proxy
- 🧪 **Automated Testing**: Integrated API and Component tests (Jest/Vitest)
- ♾️ **CI/CD Pipeline**: Automated testing and deployment via GitHub Actions
- 📱 **Fully responsive** — mobile-first layout
- ⚡ **Loading states** and **empty state** handling

---

## 🧱 Tech Stack

| Layer       | Technology                     |
|-------------|-------------------------------|
| Frontend    | React 18, Vite, Tailwind CSS, Lucide React |
| Backend     | Node.js, Express, Morgan       |
| ORM         | Prisma                         |
| Database    | PostgreSQL 16                  |
| Proxy       | Nginx                          |
| Testing     | Jest, Supertest, Vitest, RTL   |
| CI/CD       | GitHub Actions                 |
| Containers  | Docker, Docker Compose         |
| Cloud       | AWS EC2 (Ubuntu)               |

---

## 📁 Project Structure

```
task-manager-app/
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma       # Data model
│   │   └── seed.js             # Sample data seeder
│   ├── src/
│   │   ├── controllers/
│   │   │   └── taskController.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   └── validator.js
│   │   ├── routes/
│   │   │   └── taskRoutes.js
│   │   └── index.js            # Express entry point
│   ├── .env                    # Local environment variables
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js        # Axios instance
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Stats.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── TaskModal.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env                    # Local env (VITE_API_URL)
│   ├── .env.docker             # Docker build env
│   ├── nginx.conf              # SPA routing for frontend container
│   ├── Dockerfile
│   └── package.json
│
├── nginx/
│   └── default.conf            # Reverse proxy config
│
├── docker-compose.yml
├── .env                        # Docker Compose env defaults
└── README.md
```

---

## 🗄️ Data Model

```prisma
model Task {
  id          String   @id @default(uuid())
  title       String
  description String?
  priority    Priority @default(MEDIUM)  // LOW | MEDIUM | HIGH
  status      Status   @default(PENDING) // PENDING | COMPLETED
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js 20+
- PostgreSQL (or Docker)
- npm

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app
```

### 2. Set up the backend

```bash
cd backend
cp .env .env.local   # edit DATABASE_URL to your local PostgreSQL
npm install
npx prisma migrate dev --name init
npm run prisma:seed  # optional: seed sample data
npm run dev
```

Backend runs on **http://localhost:5000**

### 3. Set up the frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on **http://localhost:5173**

---

## 🧪 Automated Testing

Both the backend and frontend have dedicated testing suites to ensure code quality.

### Running Backend Tests (Jest)
```bash
cd backend
npm test
```

### Running Frontend Tests (Vitest)
```bash
cd frontend
npm test
```

---

## ♾️ CI/CD Pipeline

The project uses **GitHub Actions** for continuous integration and deployment. The workflow is defined in `.github/workflows/main.yml`.

### Workflow Steps:
1. **Test Backend**: Runs Jest tests and Prisma validation.
2. **Test Frontend**: Runs Vitest component tests.
3. **Deploy**: If tests pass and the branch is `main`, it automatically SSHs into the EC2 instance and runs the deployment script.

### Required GitHub Secrets:
To enable automated deployment, add these secrets to your GitHub repository:
- `EC2_HOST`: The public IP or DNS of your EC2 instance.
- `SSH_PRIVATE_KEY`: Your private key (`.pem` file content) used to connect to the instance.

---

## 🐳 Docker Setup (Recommended)

### Run the entire stack with one command

```bash
# 1. Clone the repo
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app

# 2. (Optional) Override credentials in .env
cp .env .env.local

# 3. Build and run all containers
docker compose up --build

# 4. Seed sample data (optional, in a second terminal)
docker exec taskmanager_backend node prisma/seed.js
```

### Service URLs (Local Docker)

| Service  | URL                          |
|----------|------------------------------|
| App      | http://localhost:3030        |
| Backend  | http://localhost:5000        |
| Database | localhost:5432               |

### Stop containers

```bash
docker compose down

# Remove volumes (wipes database)
docker compose down -v
```

---

## 🌐 API Reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint           | Description               |
|--------|--------------------|---------------------------|
| GET    | `/tasks`           | Get all tasks             |
| GET    | `/tasks?search=x`  | Search tasks              |
| GET    | `/tasks?status=PENDING` | Filter by status    |
| GET    | `/tasks?priority=HIGH` | Filter by priority   |
| GET    | `/tasks/:id`       | Get a single task         |
| POST   | `/tasks`           | Create a task             |
| PUT    | `/tasks/:id`       | Update a task             |
| DELETE | `/tasks/:id`       | Delete a task             |
| GET    | `/health`          | API health check          |

### POST/PUT Body Example

```json
{
  "title": "Deploy to AWS",
  "description": "Set up EC2 and run Docker Compose",
  "priority": "HIGH",
  "status": "PENDING"
}
```

---

## ☁️ AWS EC2 Deployment Guide

### Step 1 — Launch EC2 Instance

1. Go to [AWS Console → EC2](https://console.aws.amazon.com/ec2)
2. Click **Launch Instance**
3. Choose **Ubuntu Server 22.04 LTS (Free Tier eligible)**
4. Select **t2.micro** (Free Tier) or **t3.small** for better performance
5. Create or select a **Key Pair** (`.pem` file) — download it
6. Under **Network settings**, configure **Security Group**:

| Type  | Protocol | Port | Source     |
|-------|----------|------|------------|
| SSH   | TCP      | 22   | My IP      |
| HTTP  | TCP      | 80   | 0.0.0.0/0  |
| Custom TCP | TCP | 5000 | 0.0.0.0/0 |

7. Set **Storage** to at least 20 GB
8. Click **Launch Instance**

---

### Step 2 — Connect via SSH

```bash
# Set permissions on your key file
chmod 400 your-key.pem

# SSH into the instance
ssh -i your-key.pem ubuntu@<YOUR_EC2_PUBLIC_IP>
```

---

### Step 3 — Install Docker & Docker Compose

```bash
# Update packages
sudo apt-get update && sudo apt-get upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add ubuntu user to docker group (no sudo needed)
sudo usermod -aG docker ubuntu
newgrp docker

# Verify Docker
docker --version

# Install Docker Compose plugin
sudo apt-get install -y docker-compose-plugin

# Verify
docker compose version
```

---

### Step 4 — Clone & Set Up

```bash
# Clone the repository
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app

# Create production environment file
cp .env.prod.example .env
# Edit .env with your secure credentials
nano .env
```

### Step 5 — Deploy

You can deploy manually using Docker Compose:

```bash
# Build and start all containers using production config
docker compose -f docker-compose.prod.yml up --build -d

# Check running containers
docker ps

# Seed sample data (optional)
docker exec taskmanager_backend_prod node prisma/seed.js
```

### Step 6 — Access the Application

Open your browser and navigate to:

```
http://<YOUR_EC2_PUBLIC_IP>
```

🎉 Your Task Manager app is now live on AWS (running on port 80)!

### Step 6 — Using the Deployment Script (Recommended)

To simplify future updates, I've included a `scripts/deploy.sh` script.

1. Give it execution permissions:
   ```bash
   chmod +x scripts/deploy.sh
   ```
2. Run it whenever you want to pull changes and redeploy:
   ```bash
   ./scripts/deploy.sh
   ```

---

### Production Persistence
- The database is backed by a Docker volume (`postgres_data`).
- All user profile images are stored as **Base64 strings** in the PostgreSQL database, so they persist across container restarts.

---

---

### Useful Docker Commands on EC2

```bash
# Stop all containers
docker compose -f docker-compose.prod.yml down

# Restart containers
docker compose -f docker-compose.prod.yml restart

# View backend logs
docker logs taskmanager_backend_prod -f

# Run Prisma migrations manually
docker exec taskmanager_backend_prod npx prisma migrate deploy

# Shell into backend container
docker exec -it taskmanager_backend_prod sh
```

---

## 🔐 Environment Variables

The project uses different environment files for different scenarios.

### Root `.env` (Production / Docker Compose)
Copy `.env.prod.example` to `.env` on your server.

| Variable           | Default        | Description              |
|--------------------|----------------|--------------------------|
| `POSTGRES_USER`    | `taskuser`     | Database username        |
| `POSTGRES_PASSWORD`| `taskpassword` | Database password        |
| `POSTGRES_DB`      | `taskdb`       | Database name            |

### `backend/.env` (Local development)

| Variable       | Example                                             | Description        |
|----------------|-----------------------------------------------------|--------------------|
| `PORT`         | `5000`                                              | Express port       |
| `DATABASE_URL` | `postgresql://user:pass@localhost:5432/taskdb`      | PostgreSQL URL     |
| `NODE_ENV`     | `development`                                       | Environment        |

### `frontend/.env` (Local development)

| Variable       | Example                       | Description       |
|----------------|-------------------------------|-------------------|
| `VITE_API_URL` | `http://localhost:5000/api`   | Backend API URL   |

---

## 📄 License

MIT — free to use for learning and personal projects.
