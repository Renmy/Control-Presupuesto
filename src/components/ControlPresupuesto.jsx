import {useState, useEffect} from 'react'
import { formatearCantidad } from '../helpers'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({presupuesto, setPresupuesto, gastos, setGastos, setIsValidPresupuesto}) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0) 

    useEffect(() => {
//reduce lleva 2 parametros, total->acumulado y gasto->elemento iterativo luego va a sumar todo lo ke vaya encontrando en la prop con objeto.prop + total, luego valor inicial 0
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0) 
        const totalDisponible = presupuesto - totalGastado

        const nuevoPorcentaje = ((totalGastado / presupuesto)*100).toFixed(2)
        setGastado(totalGastado)
        setDisponible(totalDisponible)
        setPorcentaje(nuevoPorcentaje)
    }, [gastos])
    
    const handleResetApp = () => {
        if(confirm('Desea Reiniciar el Presupuesto y los gastos?')) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        } 
    }
    

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div >
            <CircularProgressbar
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
                styles={buildStyles({
                    pathTransitionDuration: 3,
                    pathColor: porcentaje > 100 ? '#dc2626' :'#3b82f6',
                    trailColor: '#f5f5f5',
                    textColor: porcentaje > 100 ? '#dc2626' :'#3b82f6'
                })}
            />

            
        </div>

        <div className='contenido-presupuesto'>
            <button
                className='reset-app'
                type='button'
                onClick={handleResetApp}
            >Resetear App</button>
            
            <p>
                <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : '' }`}>
                <span>Disponible: </span>{formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span>{formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto