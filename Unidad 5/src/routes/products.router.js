import express from "express";
import ProductManager from "../ProductManager.js";
import uploader from "../utils/uploader.js";

const productsRouter = express.Router();
const productManager = new ProductManager("./src/products.json");

productsRouter.post("/", uploader.single("file"), async(req, res)=> {
  //comprobamos que nos envien el archivo
  if(!req.file) return res.status(401).json({ status: "error", message: "Falta adjuntar la imagen al formulario" });

  const title = req.body.title;
  const price = parseInt(req.body.price);
  const thumbnail = "/img/" + req.file.filename;

  await productManager.addProduct({ title, price, thumbnail });
  res.redirect("/dashboard");
});

export default productsRouter;