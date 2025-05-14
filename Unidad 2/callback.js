const saludar = (nombre, callback) => {
  console.log(`Hola, ${nombre}`);
  
  callback();
}

const despedir = () => {
  console.log("Adios, que tengas un buen dia");
}

//saludar("Eliana", despedir);

const arrayNumeros = [1, 2, 3, 4, 5];

const nuevoArray = arrayNumeros.map( (numero) => numero + 1 );

console.log(nuevoArray);

//definiendo un callback por fuera

const funcionCallback = (numero) => {
  if( numero%2 === 0 ){
    return numero
  }else{
    return "no es par";
  }
}

const evaluarPares = arrayNumeros.map( funcionCallback );
console.log(evaluarPares);