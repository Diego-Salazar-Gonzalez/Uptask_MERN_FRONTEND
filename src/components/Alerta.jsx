

const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-400' : 'from-sky-400 to-sky-600' } bg-gradient-to-br text-center p-3 m-5 rounded-xl uppercase text-white`}>
        {alerta.msg}</div>
  )
}

export default Alerta