import { useState } from 'react'
import { Link } from "react-router-dom"
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'
const Registrar = () => {
  const [ nombre,setNombre] = useState('')
  const [ email,setEmail] = useState('')
  const [ password,setPassword] = useState('')
  const [ password2,setPassword2] = useState('')
  const [ alerta,setAlerta] = useState({})

  const handleSubmit = async e =>{
    e.preventDefault()

    if([nombre,email,password,password2].includes('')){
     setAlerta({
      msg: 'Todos los campos son obligatorios',
      error: true
     })

    
     return
    }

    if(password !== password2){
      setAlerta({
        msg: 'Las contraseñas no son iguales',
        error: true
       })
       return
    }
    if(password.length < 6){
      setAlerta({
        msg: 'La contraseña debe ser mayor a 6 caracteres',
        error: true
       })
       return
    }
    setAlerta({})
    try {
      const {data} = await clienteAxios.post(`/usuarios`,{nombre,email,password})
      setAlerta({
        msg: data.msg,
        error: false
      })
      //reiniciando el form
      setNombre('')
      setEmail('')
      setPassword('')
      setPassword2('')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }

  }

  const {msg} = alerta
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Crea tu cuenta y administra tus{" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta}/>}

      <form 
        className="my-10 bg-white shadow rounded-lg px-10 py-5"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >Nombre</label>
          <input
            id="nombre"
            type="text"
            placeholder="Tu Nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >password</label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password2"
          >Repetir Password</label>
          <input
            id="password2"
            type="password"
            placeholder="Repetir tu password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Iniciar Sesion"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className='text-center block my-5 text-slate-500 text-sm'
          to="/"
        >¿Ya tienes una cuenta? Inicia Sesion</Link>
        <Link
          className='text-center block my-5 text-slate-500 text-sm'
          to="registrar"
        >Olvide Mi contraseña</Link>
      </nav>
    </>
  )
}

export default Registrar