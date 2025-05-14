class ProductManager {
  #admin;

  constructor() {
    this.products = [];
    this.#admin = true;
  }

  async getProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();

      this.products = data;
    } catch (error) {
      console.log("Hubo un error al traer los productos: ", error.message);
    }
  }

  deleteProductById(productId){
    try {
      
      if(this.#admin){
        const newList = this.products.filter( (product) => product.id !== productId );
        this.products = newList;
      }else{
        throw new Error("Permisos insuficientes");
      }

    } catch (error) {
      console.log("Hubo un error al eliminar un producto: ", error.message);
    }
  }

  addProduct(newProduct){
    try {
      if(this.#admin){
        this.products.push(newProduct);
      }else{
        throw new Error("Permisos insuficientes");
      }
    } catch (error) {
      console.log("Hubo un error al agregar un producto: ", error.message);
    }
  }

  updateProductById(){

  }

};


const main = async () => {
  try {
    const productManager = new ProductManager();
    await productManager.getProducts();
    productManager.deleteProductById(20);
    productManager.addProduct({ id: 21, title: "Buzo gris" });

    console.log(productManager.products)
  } catch (error) {
    console.log(error.message);
  }
}

main();