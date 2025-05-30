import express from 'express';
import CartManager from './CartManager.js';

const app = express();
app.use(express.json());

const cartManager = new CartManager('./src/carts.json');

//endpoints

//----------- /api/products ---------------------
//Debe listar todos los productos.
app.get('/api/products', (req, res)=>{

});

//Debe traer solo el producto con el id proporcionado.
app.get('/api/products/:pid', (req, res)=>{

});

//Debe agregar un nuevo producto
app.post('/api/products', (req, res)=>{

});

//Debe actualizar un producto
app.put('/api/products/:pid', (req, res)=>{

});

//Debe eliminar el producto con el pid indicado
app.delete('/api/products/:pid', (req, res)=>{

});

//----------- /api/carts ---------------------
app.post("/api/carts", async(req, res)=> {
  try {
    const carts = await cartManager.addCart();
    res.status(201).json({ status: "success", carts });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
})

app.post("/api/carts/:cid/product/:pid", async(req, res)=> {
  try {
    const { cid, pid } = req.params;
    const quantity = req.body.quantity;

    const carts = await cartManager.addProductInCart(cid, pid, quantity);
    res.status(200).json({ status: "success", carts });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.get("/api/carts/:cid", async(req, res)=> {
  try {
    const cid = req.params.cid;

    const products = await cartManager.getProductsInCartById(cid);
    res.status(200).json({ status: "success", products });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
})

app.listen(8080, ()=> {
  console.log('Servidor iniciado en el puerto 8080');
});