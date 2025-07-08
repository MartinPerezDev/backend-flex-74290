import express from "express";
import Product from "../models/product.model.js";

const productsRouter = express.Router();

productsRouter.get("/", async(req, res)=> {
  try {
    const { limit = 10, page = 1 } = req.query;

    const data = await Product.paginate({}, { limit, page });
    const products = data.docs;
    delete data.docs;

    res.status(200).json({ status: "sucess", payload: products, ...data });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al recuperar los productos" })
  }
});


//Falta traer producto por su id

productsRouter.post("/", async(req, res)=> {
  try {
    const { title, description, code, price, stock, category } = req.body;

    const product = new Product({ title, description, code, price, stock, category });
    await product.save();

    res.status(201).json({ status: "success", payload: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al añadir un nuevo producto" });
  }
});

productsRouter.put("/:pid", async(req, res)=> {
  try {
    const pid = req.params.pid;
    const updateData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(pid, updateData, { new: true, runValidators: true });
    if(!updatedProduct) return res.status(404).json({ status: "error", message: "Producto no encontrado" });

    res.status(200).json({ status: "success", payload: updatedProduct });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al editar un producto" });
  }
});

productsRouter.delete("/:pid", async(req, res)=> {
  try {
    const pid = req.params.pid;

    const deletedProduct = await Product.findByIdAndDelete(pid);
    if(!deletedProduct) return res.status(404).json({ status: "error", message: "Producto no encontrado" });

    res.status(200).json({ status: "success", payload: deletedProduct });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al borrar un producto" });
  }
});

export default productsRouter;