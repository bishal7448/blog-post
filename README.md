# 📝 Blog Post

A modern, full-featured blogging platform built with **React** and **Appwrite**. Create, edit, and share articles with a rich text editor, image uploads, and user authentication — all wrapped in a beautiful, responsive UI.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Appwrite](https://img.shields.io/badge/Appwrite-Cloud-FD366E?logo=appwrite&logoColor=white)

---

## ✨ Features

- **User Authentication** — Sign up and log in with email/password via Appwrite Auth
- **Rich Text Editor** — Write articles with [TinyMCE](https://www.tiny.cloud/) for a full WYSIWYG editing experience
- **Image Uploads** — Upload featured images stored in Appwrite Storage
- **CRUD Operations** — Create, read, update, and delete blog posts
- **Post Visibility** — Control whether posts are active (public) or inactive (draft)
- **Responsive Design** — Beautiful UI powered by Tailwind CSS with animations
- **State Management** — Centralized state with Redux Toolkit
- **Client-Side Routing** — Seamless navigation with React Router v7
- **Deployed on Vercel** — Production-ready with SPA rewrites configured

---

## 🛠️ Tech Stack

| Layer        | Technology                        |
| ------------ | --------------------------------- |
| Framework    | React 19                          |
| Build Tool   | Vite 7                            |
| Styling      | Tailwind CSS 3 + tailwindcss-animate |
| Backend      | Appwrite (Auth, Database, Storage)|
| State        | Redux Toolkit + React Redux       |
| Routing      | React Router DOM v7               |
| Rich Editor  | TinyMCE (React wrapper)           |
| Forms        | React Hook Form                   |
| Deployment   | Vercel                            |

---

## 📁 Project Structure

```
blog-post/
├── public/                  # Static assets
├── src/
│   ├── appwrite/            # Appwrite service layer
│   │   ├── appwrite.js      # Appwrite client configuration
│   │   ├── authService.js   # Authentication service
│   │   ├── bucketService.js # File/image storage service
│   │   └── databaseService.js # Database CRUD service
│   ├── components/          # Reusable UI components
│   │   ├── AuthLayout/      # Protected route wrapper
│   │   ├── Header/          # Navigation header
│   │   ├── Footer/          # Page footer
│   │   ├── PostCard/        # Blog post preview card
│   │   ├── PostForm/        # Create/edit post form
│   │   ├── RTE/             # Rich text editor (TinyMCE)
│   │   ├── Login/           # Login form
│   │   ├── Signup/          # Signup form
│   │   └── ...              # Button, Input, Select, etc.
│   ├── pages/               # Route-level page components
│   │   ├── Home.jsx         # Landing / home page
│   │   ├── AllPost.jsx      # All posts listing
│   │   ├── Post.jsx         # Single post view
│   │   ├── AddPost.jsx      # Create new post
│   │   ├── EditPost.jsx     # Edit existing post
│   │   ├── Login.jsx        # Login page
│   │   └── Signup.jsx       # Signup page
│   ├── store/               # Redux store & slices
│   ├── config/              # App configuration
│   ├── lib/                 # Utility functions
│   ├── App.jsx              # Root app component
│   └── main.jsx             # Entry point with routing
├── .env                     # Environment variables (not committed)
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.js           # Vite configuration
├── vercel.json              # Vercel deployment config
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- An [Appwrite](https://appwrite.io/) project with **Auth**, **Database**, and **Storage** configured

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/blog-post.git
   cd blog-post
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root:

   ```env
   VITE_APPWRITE_URL=https://fra.cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_COLLECTION_ID=articles
   VITE_APPWRITE_BUCKET_ID=your_bucket_id
   VITE_APPWRITE_PROJECT_NAME=YourProjectName
   VITE_TINYMCE_API_KEY=your_tinymce_api_key
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

---

## 📜 Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite development server    |
| `npm run build`   | Build for production                 |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

---

## 🌐 Deployment

This project is configured for **Vercel** with SPA client-side routing support (`vercel.json`).

1. Push your code to GitHub
2. Import the repo on [Vercel](https://vercel.com/)
3. Add your environment variables in the Vercel dashboard
4. Deploy 🚀

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
