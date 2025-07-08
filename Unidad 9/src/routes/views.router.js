import express from "express";
import ProductManager from "../ProductManager.js";
import Product from "../models/product.model.js";

const viewsRouter = express.Router();
const productManager = new ProductManager("./src/data/products.json");

viewsRouter.get("/", async(req, res)=> {
  try{
    const { limit = 10, page = 1 } = req.query;

    const data = await Product.paginate({}, { limit, page, lean: true });
    const products = data.docs;
    delete data.docs;

    const links = [];

    for(let i = 1 ; i <= data.totalPages; i++){
      links.push({ text: i, link: `?limit=${limit}&page=${i}` });
    }

    res.render("home", { products, links });
  }catch(error){
    res.status(500).send({ message: error.message });
  }
});

viewsRouter.get("/realtimeproducts", async(req, res)=> {
  try{
    const products = await productManager.getProducts();
    res.render("realTimeProducts", { products });
  }catch(error){
    res.status(500).send({ message: error.message });
  }
});

export default viewsRouter;