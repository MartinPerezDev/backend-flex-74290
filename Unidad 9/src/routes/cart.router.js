import express from "express";
import CartManager from "../CartManager.js";
import Cart from "../models/cart.model.js";

//instanciamos el router de express para manejar las rutas
const cartRouter = express.Router();
//instanciamos el manejador de nuestro archivo de carrito
const cartManager = new CartManager("./src/data/cart.json");

cartRouter.post("/", async(req, res) => {
  try {
    const cart = new Cart();
    await cart.save();
    res.status(201).json({ status: "succes", payload: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

cartRouter.get("/:cid", async(req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await Cart.findById(cid).populate("products.product");
    if(!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

cartRouter.post("/:cid/product/:pid", async(req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    
    const updatedCart = await Cart.findByIdAndUpdate( cid, { $push: { products: { product: pid, quantity } } }, { new: true } );
    if(!updatedCart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    res.status(201).json({ status: "success", payload: updatedCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default cartRouter;