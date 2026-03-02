import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/authService";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(
    () => {
      authService.getCurrentUser()
        .then((userData) => {
          if (userData) {
            dispatch(login(userData));
          } else {
            dispatch(logout());
          }
        })
        .finally(() => setloading(false))
    }, [dispatch] // Handel dependency array to avoid unnecessary re-renders
  )

  return !loading ? (
    <div className='min-h-screen bg-background text-foreground flex flex-col'>
      <Header />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null
}

export default App
