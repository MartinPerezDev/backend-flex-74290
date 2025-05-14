//[100, 500, 50]

const calcularSumaTotal = ( ...precios ) => {
  let total = 0;

  precios.forEach((precio)=> {
    total = total + precio;
  })

  return total;
};

console.log( calcularSumaTotal(100, 500, 50) )
console.log( calcularSumaTotal(5000, 100, 100, 10) )