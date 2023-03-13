import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";
const Tarea = ({ tarea }) => {
  const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = tarea;
  const { handleModalEditarTarea, handleEliminarTarea, completarTarea } = useProyectos();

  const admin = useAdmin();
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-1 text-gray-600">Prioridad: {prioridad}</p>
        {estado && <p className="text-xs bg-green uppercase rounded-lg text-white ">Completada por: {tarea?.completado?.nombre}</p>}
      </div>

      <div className="flex flex-col gap-2 lg:flex-row">
        {admin && (
          <button
            className="bg-indigo-600 px-4 py-3 text-white rounded-lg"
            onClick={() => {
              handleModalEditarTarea(tarea);
            }}
          >
            Editar
          </button>
        )}

        <button className={`${estado ? 'bg-sky-600' : 'bg-gray-600' } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`} onClick={() =>completarTarea(_id)}>
          {estado ? "Completa" : "Incompleta"}
        </button>
        {admin && (
          <button
            className="bg-red-600 px-4 py-3 text-white rounded-lg"
            onClick={ 
              () =>
                handleEliminarTarea(
                  tarea
                ) /*se usa callbacks para colocar una funcion con parametros*/
            }
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Tarea;
