import express from "express";
import http from "http";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
//Input - Output
const io = new Server(server);
const PORT = 8080;

//config handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//endpoints
app.use("/", viewsRouter);

//persistencia en memoria de los mensajes de chat
const messages = [];

//websockets desde el servidor
io.on("connection", (socket)=> {
  //emitimos un evento desde el servidor al cliente
  socket.emit("message history", messages);

  console.log("Nuevo cliente conectado!");


  //escuchamos un evento
  socket.on("new message", (dataMessage)=> {
    messages.push(dataMessage);
    
    //transimitimos el nuevo mensaje a todo los clientes
    io.emit("broadcast new message", dataMessage);
  });
})

server.listen(PORT, ()=> {
  console.log("Servidor iniciado en el puerto 8080");
})