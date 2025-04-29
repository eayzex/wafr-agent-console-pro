```markdown
# WafR Management Console (Frontend)

A sleek and modern management console for WafR customer support agents, built with **React**, **TypeScript**, and **Tailwind CSS**. This application enables internal agents to search for users, view transactions, manage account status, and export transaction history — all through a responsive and stylish UI.

## 🚀 Project Overview

The WafR Management Console is designed to automate internal support operations that were previously done manually via the database. It provides:

- Secure login via **Firebase Authentication**
- User search by phone number
- View of user details and transaction history
- Block/unblock user accounts
- Export mock PDF of user transactions
- Clean, responsive UI with a professional purple theme

## 🧑‍💼 Features Implemented

- 🔐 Login / Signup / Forgot Password (Firebase Auth)
- 🏠 Home Dashboard with sidebar navigation
- 📞 User search by phone number
- 📄 View user details: balance, transaction history
- 🚫 Block / ✅ Unblock user accounts
- 🧾 Export transaction history as a (mock) PDF
- 🎨 Purple gradient theme inspired by the WafR logo
- 📱 Fully responsive design

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **PDF Export**: jsPDF (mocked)
- **API Communication**: RESTful calls to backend

## 🔧 Setup Instructions

1. **Clone the repo**
   ```bash
   git clone[https://github.com/eayzex/wafr-agent-console-pro.git
   cd wafr-agent-console-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start the app**
   ```bash
   npm run dev
   ```

## 🔐 Firebase Setup

Make sure you:
- Enable **Email/Password Authentication** in Firebase Console
- Use matching Firebase credentials in your `.env` file
- Set up users via Firebase or allow signup through the app

## 📸 live Demo 

👉 [Click here for demo video] (https://wafr-agent-console-pro.lovable.app/)
*(Login → Dashboard → Search → View → Block/Unblock → Export PDF)*

## 📁 Folder Structure

```
📦 wafr-frontend/
├── 📁 src/
│   ├── 📁 components/        → Reusable UI components
│   ├── 📁 pages/             → Auth, Home, Dashboard, etc.
│   ├── 📁 services/          → API services
│   ├── 📁 utils/             → Helper functions
│   └── main.tsx             → App entry point
├── 📄 tailwind.config.ts    → Tailwind theme config
├── 📄 .env                  → Environment variables
├── 📄 index.html
└── 📄 README.md
```

## 🧪 Future Improvements

- Live PDF generation from real transaction data
- Admin role-based routing 
- Search suggestions & phone validation
- Dark mode toggle

## 🤝 Contribution

Feel free to fork and improve! PRs are welcome if you'd like to extend features or polish UI further.

## 📝 License

MIT License.

---

Made by youssef
