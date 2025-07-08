import express from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import http from "http";
import ProductManager from "./ProductManager.js";
import connectMongoDB from "./config/db.js";
import __dirname from "../dirname.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

connectMongoDB();

//handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/src/views");

const PORT = 8080;
app.use(express.json());
app.use(express.static(__dirname + "/public"));

//endpoints
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

//websockets

const productManager = new ProductManager("./src/data/products.json");

io.on("connection", (socket)=> {
  console.log("Nuevo usuario conectado");

  socket.on("newProduct", async(productData)=> {
    try {
      const newProduct = await productManager.addProduct(productData);

      io.emit("productAdded", newProduct);
    } catch (error) {
      console.error("Error al añadir el producto");
    }
  });

});

//iniciamos el servidor y escuchamos en el puerto definido
server.listen(PORT, ()=> console.log(`Servidor iniciado en: http://localhost:${PORT}`) );