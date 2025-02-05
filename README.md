# 🏢 OptimaHub

## 🌟 Project Overview

The **Employee Management System** is a web-based application designed to efficiently manage employees within an organization. It provides features for employee records, role management and more. Built with **React, Vite, Firebase, and TailwindCSS**, this project ensures a seamless user experience with modern UI components and real-time updates.

🔗 **Live Project:** [OptimaHub
](https://optimahub-e78ad.web.app/)

### 🚀 Technologies Used

- **Frontend:** React, React Router, Vite
- **State Management & API Handling:** TanStack React Query, Axios
- **UI & Styling:** TailwindCSS, Radix UI, Lucide React, Headless UI
- **Charts & Data Visualization:** Recharts, React Chart.js 2
- **Animations & UX Enhancements:** Framer Motion, Keen Slider
- **Date & Time Management:** Date-fns, React Datepicker, React Day Picker
- **Notifications & Alerts:** Sonner, React Toastify
- **Authentication & Database:** Firebase
- **Image Uploads:** ImgBB API
- **Payment Processing (if applicable):** Stripe

---

### ✨ Core Features

✅ **Employee Management** - Add, update, and delete employee details  
✅ **Role-Based Access Control** - Assign roles and permissions  
✅ **Attendance Tracking** - Monitor employee attendance  
✅ **Salary & Payroll Management** (if applicable)  
✅ **Charts & Reports** - Data visualization using Recharts & Chart.js  
✅ **Secure Authentication** - Firebase-based login & authorization  
✅ **Real-time Data Updates** - Instant updates via Firebase  
✅ **Modern & Responsive UI** - Built with TailwindCSS & Radix UI  
✅ **Notification System** - Alerts using Sonner & React Toastify

### 🔑 Environment Variables

Create a `.env.local` file in the root directory and add the following:

```sh
# ImgBB API Key (for image uploads)
VITE_IMGBB_API_KEY=your_imgbb_api_key_here

# Firebase Configuration
VITE_apiKey=your_firebase_api_key_here
VITE_authDomain=your_firebase_project_authDomain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id
```

> ⚠️ **Do not share these keys publicly. Add `.env.local` to `.gitignore`.**

### 📦 Dependencies

### **Main Dependencies**

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router": "^7.1.1",
  "firebase": "^11.1.0",
  "axios": "^1.7.9",
  "@tanstack/react-query": "^5.64.2",
  "@stripe/react-stripe-js": "^3.1.1",
  "@stripe/stripe-js": "^5.6.0",
  "recharts": "^2.15.1",
  "react-chartjs-2": "^5.3.0",
  "react-datepicker": "^7.6.0",
  "react-toastify": "^11.0.3",
  "framer-motion": "^12.0.6",
  "tailwindcss": "^3.4.17",
  "lucide-react": "^0.471.2",
  "vite": "^6.0.5"
}
```

### **Development Dependencies**

```json
{
  "@eslint/js": "^9.17.0",
  "@vitejs/plugin-react": "^4.3.4",
  "eslint": "^9.17.0",
  "eslint-plugin-react": "^7.37.2",
  "postcss": "^8.5.1"
}
```

### 🛠️ Installation & Setup

Follow these steps to set up the project locally:

### 1️⃣ Clone the Repository

```sh
git https://github.com/parthosarothi46/OptimaHub-Client.git
cd OptimaHub-Client
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Create an `.env.local` File

```sh
touch .env.local
```

Copy the environment variables from the **🔑 Environment Variables** section above into this file.

### 4️⃣ Start the Development Server

```sh
npm run dev
```

By default, the project runs on `http://localhost:5173/`.

### 5️⃣ Build for Production

```sh
npm run build
```

### 6️⃣ Lint the Code

```sh
npm run lint
```

### 🤝 Contribution Guidelines

Contributions are welcome! Follow these steps to contribute:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature-branch`)
3. **Commit changes** (`git commit -m "Added new feature"`)
4. **Push to your fork** (`git push origin feature-branch`)
5. **Open a Pull Request**

---
