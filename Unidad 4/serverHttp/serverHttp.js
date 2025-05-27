import http from "http";

const server = http.createServer( (request, response) => {
  response.setHeader("Content-Type", "text/plain");

  if( request.method === "GET" && request.url === "/api/products" ){
    response.end("Hola mundo!")
  }

});

server.listen(8080, ()=> {
  console.log("Servidor iniciado en el puerto 8080");
})