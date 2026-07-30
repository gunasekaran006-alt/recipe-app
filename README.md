
# 🍳 RecipeShare - Interactive Recipe Sharing Platform

RecipeShare is a full-stack web application designed for food lovers to discover, create, and share delicious recipes from around the world. It features secure user authentication, AI-powered recipe generation, and seamless local/cloud database integration.

---

## 🚀 Key Features

* **User Authentication & Authorization**: Secure signup, login, logout, and password recovery via 6-digit OTP using HttpOnly Cookies & JWT.
* **AI-Powered Magic Fill**: Integrated Google Gemini AI to auto-generate recipe details and fetch matching professional food photos via Unsplash API.
* **Voice Search**: Search recipes effortlessly using built-in Web Speech API voice commands.
* **Interactive Dashboard**: View New Arrivals, Trending Recipes (via Aggregation), and Category filtering (Veg, Non-Veg, Italian, etc.).
* **Recipe Management**: Create, Read, Update, and Delete (CRUD) recipes with ownership protection (users can only manage their own recipes).
* **Favorites System**: Save and manage favorite recipes linked directly to the user profile in MongoDB.

---

## 🛠️ Tech Stack

* **Frontend**: React.js, Vite, Bootstrap 5, Bootstrap Icons, React Toastify, React Router DOM.
* **Backend**: Node.js, Express.js, Mongoose.
* **Database**: MongoDB Atlas / Local MongoDB.
* **AI & Third-Party APIs**: Google Gemini API, Unsplash API, Nodemailer (for OTP emails).

---

## 📁 Project Folder Structure

RECIPE-APP/
│
├── public/                 # Static assets
├── server/                 # Backend (Node.js & Express)
│   ├── config/             # Database connection setup
│   ├── controllers/        # API business logic (Auth, Recipes, Password)
│   ├── middleware/         # Authentication & Error handling middleware
│   ├── models/             # Mongoose schemas (User, Recipe)
│   ├── routes/             # API routing configurations
│   └── utils/              # Email transporter utility (Nodemailer)
│
├── src/                    # Frontend (React components & pages)
│   ├── components/         # Reusable components (Navbar, Footer, Modals, Cards)
│   ├── pages/              # Views (Home, Favorites, MyRecipes, Login, Signup, Profile)
│   ├── services/           # Axios API configuration & service calls
│   ├── App.jsx             # Main routing and global state configuration
│   └── main.jsx            # React root entry point
│
├── .env.example            # Sample environment variables template
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation

```

---

## ⚙️ Installation & Setup Instructions

To run this project locally on your machine, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/recipe-app.git
cd recipe-app

```

### 2. Install Dependencies

Install dependencies for both the root frontend and the server:

```bash
# Install frontend dependencies
npm install

# Navigate to server and install backend dependencies
cd server
npm install

```

### 3. Environment Variables Configuration

Create a `.env` file inside the `server` folder (or reference `.env.example`) and add your secure credentials:

```env
PORT=8080
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

```

Create a `.env` file in the root frontend folder for API and AI keys:

```env
VITE_API_URL=http://localhost:8080/api/recipes
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key

```

### 4. Run the Application

* **Start Backend Server:**
```bash
cd server
npm run dev

```


* **Start Frontend Development Server:**
```bash
# Open a new terminal in the root folder
npm run dev

```



---

## 🌐 Deployment

* **Frontend**: Deployed on **Vercel** with environment variables configured.
* **Backend**: Deployed on **Render** as a Web Service connected to MongoDB Atlas.

---

## 👤 Author

* **Gunansekaran** — *Full-Stack Developer & MERN Intern*

```
