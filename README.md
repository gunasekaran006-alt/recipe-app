# 🍳 AI-Powered Recipe Hub

An interactive, AI-integrated Recipe Sharing Platform built with React.js. This application simplifies recipe management by leveraging Google's Gemini AI to automatically generate comprehensive recipe details and a smart hybrid image system for accurate food photography.

## ✨ Key Features

* **🪄 AI Magic Fill:** Enter a dish name and click "AI Fill". The app uses **Google Gemini 2.5 Flash** to instantly generate ingredients, cooking instructions, prep time, and difficulty levels.
* **📊 Nutritional Dashboard:** Automatically calculates and displays Calories, Protein, Carbs, and Fats for every generated recipe.
* **📸 Smart Hybrid Image Search:** Uses a custom fallback algorithm to fetch beautiful food photography. It searches a localized database for regional Indian foods first, falling back to the **Unsplash API** for global cuisines, ensuring zero miss-matched images.
* **✏️ Complete Recipe Management:** Perform full CRUD operations (Create, Read, Update, Delete) on your recipe collection.
* **📱 Responsive UI/UX:** Built with Bootstrap to ensure a flawless experience across mobile, tablet, and desktop devices.
* **🔒 Secure Architecture:** Strict environment variable (`.env`) management to protect sensitive API keys.

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite)
* **Styling:** Bootstrap 5 & Custom CSS
* **Generative AI:** Google Gemini 2.5 Flash API
* **Image Delivery:** Unsplash API & Local Dictionary
* **Backend / Database:** JSON-Server
* **State Management:** React Hooks (`useState`, `useEffect`)

## 🚀 Getting Started

### Prerequisites
* Node.js installed on your local machine.
* A free [Google Gemini API Key](https://aistudio.google.com/).
* A free [Unsplash Developer Access Key](https://unsplash.com/developers).

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/recipe-ai-hub.git](https://github.com/yourusername/recipe-ai-hub.git)
   cd recipe-ai-hub