
# ☁️  Nymbus

**Nymbus** is a full-stack platform that allows developers to effortlessly deploy frontend applications (like React, Angular, Vue, etc.) without managing infrastructure. Built with a React frontend and a Go backend, it enables easy deployment and hosting of static client-side apps via a clean, developer-friendly UI.


## 🚩 Problem Statement

Frontend developers often face challenges when deploying client-side apps:

- Setting up CI/CD pipelines for simple apps is overkill.
- Hosting platforms might require specific configurations or knowledge.
- Managing different frameworks (React, Angular, Vue, etc.) adds complexity.
- **Also I wanted to learn Golang and DNS management... :)**

**Nymbus** simplifies this by offering a unified interface to upload, configure, and deploy static frontend applications with zero DevOps hassle.


## ✅ Solution

Nymbus offers a straightforward platform for deploying frontend apps:

- Enter the public github URL for the project.
- Enter the install command, build command and build directory.
- The backend handles file storage, routing, and hosting.
- The deployed app is accessible via a unique subdomain.


## 🚀 Features

- ⚙️ **Framework Agnostic**: Supports any static frontend (React, Angular, Vue, Svelte, etc.).
- 🧠 **Go Backend**: Efficient and fast file handling and routing.
- 🌐 **Auto Routing**: Automatically generates accessible URLs for deployed apps.
- 📁 **Static File Hosting**: Serve optimized, production-ready files without backend logic.
- 🌍 **Custom Domain Support** *(coming soon)*


## 💡 Use Cases

- Quickly host React or Angular demo projects.
- Share frontend project prototypes with clients.
- Lightweight deployment for hackathons or internal tools.
- Educators can deploy multiple student projects quickly.


## 🛠️ Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Go (Golang)
- **File Storage**: AWS S3
- **DNS Management**: Cloudflare


## 🌐 Live Demo

🔗 [Nymbus](https://www.nymbus.xyz) — *Access the live web app here!*



## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ShashankGupta10/Nymbus.git
cd Nymbus
```

### 2. Setup Frontend (React)
```bash
cd client
npm install
npm run dev
```

#### 3. Setup Backend (Golang)
```bash
cd server
go mod tidy
cp .env.example .env 
go run cmd/main.go
```
### 4. Access the App
`Navigate to http://localhost:5173 to use the frontend interface. Backend runs on localhost:8080.
`

## ⚙️ How It Works
**Details**: User enters the github URL, install and build command, build DIR.
**Backend Stores Files**: Files are stored locally or on a AWS S3 bucket.
**URL Generation**: A unique subdomain is assigned.
**Access Deployed App**: The frontend app is accessible via that URL.

## 📁 Project Structure
### Frontend
```bash
📦 frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.tsx
│   └── index.tsx
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Backend
```bash
📦 backend/
├── 📁 cmd/
│   └── main.go 
├── 📁 internal/
│   ├── 📁 adapters/
│   ├── 📁 config/
│   ├── 📁 core/
│   ├── 📁 domain/
│   └── 📁 ports/
│       ├── repository.go
│       └── services.go
├── 📁 services/
├── 📁 pkg/
├── 📁 projects/
├── 📁 tmp/
├── .air.toml
├── .env
├── .gitignore
├── Dockerfile
├── go.mod
└── go.sum
```

## 🪪 License
This project is licensed under the MIT License. See the LICENSE file for details.

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

## 📬 Contact

**For feedback, bugs, or feature requests:**

- 🐙 GitHub: [@ShashankGupta10](https://github.com/ShashankGupta10)  
- 📧 Email: [shashankgupta9248@gmail.com](mailto:shashankgupta9248@gmail.com)

---

Made with ❤️ by **Shashank Gupta**
