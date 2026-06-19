import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AUTH_KEY = "cbt_auth";

export function useLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const saved = localStorage.getItem(AUTH_KEY);

    if (saved) {
      setIsLoggedIn(true);
      navigate("/exam");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      if (username === "dot" && password === "123") {
        localStorage.setItem(AUTH_KEY, "true");

        setIsLoggedIn(true);
        navigate("/exam");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsLoggedIn(false);
    navigate("/");
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    handleSubmit,
    loading,
    error,
    isLoggedIn,
    logout,
  };
}