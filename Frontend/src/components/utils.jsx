// Función para convertir fecha en formato DD/MM/AAAA a un objeto Date
export const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return new Date(`${year}-${month}-${day}`);
  };
  
// Función para ordenar horas en formato HH:MM-HH:MM
export const sortTimes = (a, b) => {
    const startA = a.split('-')[0];
    const startB = b.split('-')[0];
    const [ah, am] = startA.split(':').map(Number);
    const [bh, bm] = startB.split(':').map(Number);
    return ah - bh || am - bm;
  };
  