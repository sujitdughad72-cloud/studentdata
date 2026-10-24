# 🚀 EduPulse Full-Stack Deployment Guide

This guide explains how to deploy both the **Spring Boot backend** and the **React frontend** together so that your application works live on the internet with a real cloud database.

---

## 🏗️ Architecture Options

| Option | Frontend | Backend | Database | Best For |
| :--- | :--- | :--- | :--- | :--- |
| **Option A (Recommended)** | **Render** (via Docker) | **Render** (via Docker) | Free Cloud MySQL | Easiest setup, single URL, zero CORS issues |
| **Option B** | **Vercel** | **Render / Railway** | Free Cloud MySQL | Keep existing Vercel domain |

---

## 🗄️ Step 1: Get a Free Cloud MySQL Database (Takes 2 minutes)

Your local database (`localhost:3306`) cannot be accessed by cloud servers. You need a free cloud MySQL instance:

### Using Aiven (Free Forever):
1. Go to [https://aiven.io](https://aiven.io) and sign up for free (No credit card needed).
2. Click **Create Service** → Choose **MySQL** → Select the **Free Plan**.
3. Choose your closest region (e.g., India / Singapore / Frankfurt) and click **Create Service**.
4. Once created, copy your connection details:
   - **Host** (e.g. `mysql-xyz.aivencloud.com`)
   - **Port** (e.g. `12345`)
   - **User** (e.g. `avnadmin`)
   - **Password**
   - **Database Name** (e.g. `defaultdb`)

Your JDBC URL will look like:
```
jdbc:mysql://HOST:PORT/DATABASE?sslmode=require
```

*(Alternative: [TiDB Cloud](https://tidbcloud.com/) provides free serverless MySQL compatible databases with zero setup).*

---

## 🌟 Option A: Deploy Both Together on Render (Easiest)

We created a multi-stage [`Dockerfile`](./Dockerfile) in your project root that compiles the React frontend and packages it directly inside the Spring Boot JAR.

### Steps to Deploy:
1. Push your latest code to GitHub:
   ```bash
   git add .
   git commit -m "Add Dockerfile and cloud database configuration"
   git push origin main
   ```
2. Go to [https://render.com](https://render.com) and log in with GitHub.
3. Click **New +** → **Web Service**.
4. Select your GitHub repository: `sujitdughad72-cloud/studentdata`.
5. Configure the service:
   - **Name**: `edupulse-portal`
   - **Region**: Closest to you (e.g., Singapore / Frankfurt)
   - **Runtime**: **Docker** (Render will automatically detect the root `Dockerfile`)
   - **Instance Type**: **Free**
6. Scroll down to **Environment Variables** and add:
   - `SPRING_DATASOURCE_URL`: `jdbc:mysql://HOST:PORT/DATABASE?sslmode=require`
   - `SPRING_DATASOURCE_USERNAME`: `your-db-username`
   - `SPRING_DATASOURCE_PASSWORD`: `your-db-password`
7. Click **Create Web Service**.

Render will automatically build the React frontend, package Spring Boot, and give you a public URL (e.g. `https://edupulse-portal.onrender.com`).  
Opening this URL serves the React app and connects to your live cloud database!

---

## ⚡ Option B: Keep Frontend on Vercel + Deploy Backend on Render

If you prefer keeping your frontend at `https://erpsystem-sujitdughad72-clouds-projects.vercel.app`:

### 1. Deploy Backend on Render:
1. In [Render.com](https://render.com), click **New +** → **Web Service**.
2. Connect your repo and set:
   - **Root Directory**: `curd`
   - **Runtime**: **Java**
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/curd-0.0.1-SNAPSHOT.jar`
3. Add Environment Variables:
   - `SPRING_DATASOURCE_URL`: your cloud JDBC URL
   - `SPRING_DATASOURCE_USERNAME`: your cloud DB user
   - `SPRING_DATASOURCE_PASSWORD`: your cloud DB password
4. Deploy and copy your backend URL (e.g. `https://curd-backend.onrender.com`).

### 2. Connect Vercel to Your Render Backend:
1. Go to your [Vercel Dashboard](https://vercel.com).
2. Open your project `erpsystem` → **Settings** → **Environment Variables**.
3. Add a new variable:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://curd-backend.onrender.com/api`
4. Go to the **Deployments** tab and click **Redeploy**.

Now when you visit your Vercel site, login and all CRUD operations will send requests directly to your live cloud Spring Boot backend!
