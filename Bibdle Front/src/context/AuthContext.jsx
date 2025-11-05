import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // user = { userId, role, token }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const payload = JSON.parse(atob(token.split(".")[1])); // decodifica JWT
    setUser({
      userId: payload.userId,
      role: payload.role,
      token,
    });
  }, []);

  const login = async (email, password) => {
    const res = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Credenciales inválidas");

    const data = await res.json(); // data = { access_token }
    const token = data.access_token;

    localStorage.setItem("token", token);

    const payload = JSON.parse(atob(token.split(".")[1]));

    setUser({
      userId: payload.userId,
      role: payload.role,
      token,
    });
  };

  const register = async (username, email, password) => {
    const res = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, names: username, password }),
    });

    if (!res.ok) throw new Error("Error al registrarse");

    const data = await res.json();
    const token = data.access_token;

    localStorage.setItem("token", token);
    const payload = JSON.parse(atob(token.split(".")[1]));
    setUser({ userId: payload.userId, role: payload.role, token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLogged: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}