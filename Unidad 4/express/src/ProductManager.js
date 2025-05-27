import fs from "fs";

class ProductManager {

  constructor(pathFile) {
    this.pathFile = pathFile;
  }

  async getProducts() {
    try {
      //recuperar la data
      const fileData = await fs.promises.readFile(this.pathFile, "utf-8");
      const products = JSON.parse(fileData);
      return products;
    } catch (error) {
      throw new Error("Error al traer los productos - ", error.message);
    }
  }

  generateNewId(products) {
    if (products.length > 0) {
      return products[products.length - 1].id + 1;
    } else {
      return 1;
    }
  }

  async addProduct(newProduct) {
    try {
      //recuperar la data
      const fileData = await fs.promises.readFile(this.pathFile, "utf-8");
      const products = JSON.parse(fileData);

      const newId = this.generateNewId(products);
      //editamos la data
      const product = { id: newId, ...newProduct };
      products.push(product);

      //guardar en el archivo
      await fs.promises.writeFile(this.pathFile, JSON.stringify(products, null, 2), "utf-8");
      return products;
    } catch (error) {
      throw new Error("Error al añadir el producto - ", error.message);
    }
  }

  async deleteProductById(idProduct){
    try {
      const fileData = await fs.promises.readFile(this.pathFile, 'utf-8');
      const data = JSON.parse(fileData);
      const productIndex = data.findIndex((prod) => prod.id === parseInt(idProduct));

      if (productIndex === -1) throw new Error(`Producto con id: ${idProduct} no encontrado`);
      data.splice(productIndex, 1);

      await fs.promises.writeFile(this.pathFile, JSON.stringify(data, null, 2), 'utf-8');

      return data;
    } catch (error) {
      throw new Error(`Error al eliminar el producto: ${error.message}`);
    }
  }

  async updateProductById(idProduct, updatedProduct){
    try {
      const fileData = await fs.promises.readFile(this.pathFile, 'utf-8');
      const data = JSON.parse(fileData);
      const productIndex = data.findIndex((prod) => prod.id === parseInt(idProduct));
      if (productIndex === -1) throw new Error(`Producto con id: ${idProduct} no encontrado`);

      data[productIndex] = { ...data[productIndex], ...updatedProduct };
      await fs.promises.writeFile(this.pathFile, JSON.stringify(data, null, 2), 'utf-8');

      return data;
    } catch (error) {
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  }

  //getProductById
}

export default ProductManager;