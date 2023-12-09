import { useState, useEffect } from 'react'
import Header from './components/Header'
import { generarID } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import FiltroGastos from './components/FiltroGastos'



function App() {
  
  const [gastos, setGastos] = useState(JSON.parse(localStorage.getItem('gastos')) ?? [])

  const [presupuesto, setPresupuesto] = useState(localStorage.getItem('presupuesto') ?? 0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if(localStorage.getItem('presupuesto') > 0) {
      setIsValidPresupuesto(true)
    }
    
  }, [])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos))
  },[gastos])

  
  

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0) {
      setModal(true)
      setTimeout(() => {
      setAnimarModal(true)
    }, 500)
    }
  }, [gastoEditar])

  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])
  
  

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 500)
  }

  const guardarGasto = gasto => {
    if(gasto.id) {
      //Actualizar Gasto
        const gastosActualizado = gastos.map(actGasto => actGasto.id !== gasto.id ? actGasto : gasto )
        setGastos(gastosActualizado)
    } else {
      //Agregar Nuevo Gasto
      gasto.id = generarID()
      gasto.fecha =Date.now()
      setGastos([...gastos, gasto])
    }
  }

  const eliminarGasto = id => {
      const gastosActualizado = gastos.filter(gasto => gasto.id !== id)
      setGastos(gastosActualizado)
       
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto} 
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto} 
      />

      {isValidPresupuesto && (
        <>
          <main>
            <FiltroGastos 
              filtro={filtro} 
              setFiltro={setFiltro} 
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              gastosFiltrados={gastosFiltrados}
              filtro={filtro}
            />
          </main>
          <div className='nuevo-gasto'>
            <img 
              src={IconoNuevoGasto} 
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && <Modal 
                  setModal={setModal} 
                  animarModal={animarModal} 
                  setAnimarModal={setAnimarModal}
                  guardarGasto={guardarGasto}
                  gastoEditar={gastoEditar}
                  setGastoEditar={setGastoEditar}
                />}

    </div>
  )
}

export default App
