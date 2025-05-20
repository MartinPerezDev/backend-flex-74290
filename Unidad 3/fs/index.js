import ProductManager from "./ProductManager.js";


const main = async() => {
  try {
    const productManager = new ProductManager("./products.json");
    
    //await productManager.addProduct( { title: "Buzo rojo", description: "Buzo de invierno" } );

    const products = await productManager.getProducts();
    console.log(products);
  } catch (error) {
    console.log(error);
  }
}

main();