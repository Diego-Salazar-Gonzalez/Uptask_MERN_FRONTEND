import { useState, useEffect, createContext } from "react";
import { useNavigate } from 'react-router-dom'
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    const autenticarUsusario = async () => {
      const token = localStorage.getItem("TokenJwtUptask_Mern_by_kirell");
      if (!token) {
        setCargando(false)
        return
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await clienteAxios("/usuarios/perfil", config);
        setAuth(data); //se crea la sesion si ya hay un token
        navigate('/proyectos')
      } catch (error) {
        setAuth({})    
    }
      setCargando(false);
    };
    autenticarUsusario();
  }, []);
  const cerrarSesionAuth = () =>{
    localStorage.removeItem("TokenJwtUptask_Mern_by_kirell");
    setAuth({})
  }
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        setCargando,
        cargando,
        cerrarSesionAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthProvider };
