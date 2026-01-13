# Baburam Bastola - AI & Software Engineering Portfolio

A modern, high-performance personal portfolio website designed for an AI Engineer and Software Developer. This project features a "Best-in-Class" **Glassmorphism** UI, a custom **Interactive AI Particle Background**, and a hybrid One-Page/Multi-Page architecture optimized for SEO.

🔗 **Live Demo:** [https://baburambastola.dev](https://baburambastola.dev) (Coming Soon)

## ✨ Key Features

-   **🎨 Glassmorphism Design**: Sleek, frosted-glass cards floating over a dynamic background.
-   **🧠 AI Particle Animation**: A custom Canvas-based neural network visualization that interacts with mouse movement.
-   **🚀 Hybrid Architecture**:
    -   **One-Page Landing**: Summarizes About, Experience, Projects, and Skills on the homepage for immediate impact.
    -   **Deep-Dive Pages**: Dedicated HTML pages (`/projects`, `/media`, etc.) for maximum SEO ranking.
-   **⚡ Performance**: Built with **Vite** for instant HMR and optimized production builds.
-   **📱 Mobile-First**: Fully responsive navigation and layout.
-   **🔍 SEO Optimized**:
    -   JSON-LD Schema Markup (Person, SoftwareSourceCode).
    -   Open Graph & Twitter Cards for social sharing.
    -   Canonical tags and `robots.txt` configuration.
-   **✉️ Contact Ready**: Pre-configured **Netlify Forms** for backend-free email submissions.

## 🛠️ Tech Stack

-   **Frontend**: HTML5, CSS3 (Custom Variables), JavaScript (ES6+)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Deployment**: Netlify (Recommended)
-   **Assets**: SVG Icons, Custom Fonts (Inter)

## 🚀 Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   npm (v7 or higher)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/bastola-wrld/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start development server:**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:5173` to view the site.

## 📦 Deployment

### Netlify (Recommended)

1.  Push your code to GitHub.
2.  Import the repository into [Netlify](https://www.netlify.com/).
3.  Set the **Build Command** to `npm run build`.
4.  Set the **Publish Directory** to `dist`.
5.  **Important:** The contact forms are pre-configured with `data-netlify="true"`. They will automatically start working once deployed.

### Docker (Self-Hosted)

If you prefer to run this in a container:

1.  **Build the image:**
    ```bash
    docker build -t portfolio .
    ```

2.  **Run the container:**
    ```bash
    docker run -d -p 8080:80 portfolio
    ```
    Visit `http://localhost:8080`.
    *Note: Netlify Forms will not work in a raw Docker container without your own backend.*

```
├── public/
│   ├── resume.pdf       # Your CV download
│   ├── profile.jpg      # Profile image
│   └── robots.txt       # SEO configuration
├── src/
│   ├── style.css        # Global styles & glassmorphism
│   ├── main.js          # Logic (Typewriter, AI Particles, Mobile Menu)
├── index.html           # Homepage (One-Page Landing)
├── about.html           # Dedicated About Page
├── projects.html        # Verified Projects List
├── vite.config.js       # Build configuration
└── package.json         # Dependencies
```

## 📄 License

© 2026 Baburam Bastola. All rights reserved.
