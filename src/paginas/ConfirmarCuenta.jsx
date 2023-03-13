import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";
const ConfirmarCuenta = () => {
  const [alerta,setAlerta] = useState({})
  
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    const confirmarCuenta = async () => {
      
      try {
        
        const { data } = await clienteAxios(`/usuarios/confirmar/${id}`);

        setAlerta({
          msg: data.msg,
          error: false
        })
        setCuentaConfirmada(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    };
    confirmarCuenta();
  }, []);
  const {msg} = alerta
  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">
      Confirma tu cuenta y crea tus {" "}
      <span className="text-slate-700">Proyectos</span>
    </h1>
    <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
      {msg && <Alerta alerta = {alerta}/>}
    
        <Link
        className='text-center block my-5 text-slate-500 text-sm'
        to="/"
      >Ir a Inicio</Link>
    
    </div>
    </>
  );
};

export default ConfirmarCuenta;
