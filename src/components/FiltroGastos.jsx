import { useEffect, useState } from 'react'

const FiltroGastos = ({filtro, setFiltro}) => {

    

  return (
    <div className='contenedor sombra filtros '>
        <form>
          <div className='campo'>
              <label htmlFor='filtro'>Filtrar Gastos</label>
              <select 
                id='filtro'
                value={filtro} 
                onChange={e => setFiltro(e.target.value)}
              >
                  <option value="">Todas las Categorias</option>
                  <option value="ahorro">Ahorro</option>
                  <option value="comida">Comida</option>
                  <option value="casa">Casa</option>
                  <option value="gastos">Gastos Varios</option>
                  <option value="ocio">Ocio</option>
                  <option value="salud">Salud</option>
                  <option value="subscripciones">Subscripciones</option>
              </select>
          </div>
        </form>
    </div>
  )
}

export default FiltroGastos