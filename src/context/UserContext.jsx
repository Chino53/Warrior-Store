import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Cargar usuario guardado del localStorage al iniciar la app
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Simulación de registro
  const register = async (name, email, password) => {
    // En el futuro esto será un POST al backend
    const newUser = { name, email };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  // ✅ Simulación de login
  const login = async (email, password) => {
    // En el futuro validará en backend
    const loggedUser = { name: "Usuario", email };
    localStorage.setItem("user", JSON.stringify(loggedUser));
    setUser(loggedUser);
    return loggedUser;
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, register, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
