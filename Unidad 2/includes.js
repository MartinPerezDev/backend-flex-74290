const metodosPago = ["tarjeta", "paypal", "QR", "efectivo"];

const metodoUsuario = "QR";

if(metodosPago.includes(metodoUsuario)){
  console.log("Metodo de pago aceptado");
}else{
  console.log("Metodo de pago no valido");
}