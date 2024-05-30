module.exports = () => {
    function generarFechas(inicio, fin) {
        try {
            let fechaInicio = new Date(inicio);
            let fechaFinal = new Date(fin);

            if (fechaInicio <= fechaFinal) {
                return [fechaInicio, fechaFinal];
            }
        }catch{
            console.log('error')
        }
    }
    return generarFechas;
}