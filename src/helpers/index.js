//generar ID unico para listar componentes en un .map()
export const generarID = () => {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)
    return random + fecha 
}

//para formatear fecha de date.now()
export const formatearFecha = fecha => {
    //const newFecha = new Date(fecha)
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
    return new Date(fecha).toLocaleDateString('es-ES', opciones)
}

// para formatear a currency, super esta funcion
export const formatearCantidad = cantidad => {
    return Number(cantidad).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
}