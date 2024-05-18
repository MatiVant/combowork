// @ts-nocheck

class CarritoService {
  getProducts() {
    const products = JSON.parse(localStorage.getItem("products"));
    return products;
  }

  getQuantity() {
    const _quantity = JSON.parse(localStorage.getItem("totalQuantity"));
    return _quantity;
  }

  setEmpyArray() {
    localStorage.setItem("products", JSON.stringify([]));
    localStorage.setItem("totalQuantity", 0);
  };

  addProduct(newProduct) {
    const products = JSON.parse(localStorage.getItem("products"));
    let totalQuantity = Number(localStorage.getItem("totalQuantity"));
    if (!products) {
      // si no existe ningun prod
      localStorage.setItem("products", JSON.stringify([newProduct]));
      // almacena en key products el nuevo producto
    } else {
      // si existen prod
      const productFound = products.find((p) => p.id === newProduct.id);
      // busca entre los productos almacenados si existe el nuevo añadido
      const total = Number(localStorage.getItem("totalQuantity"));
      if (productFound) {
        // si existe
        // al producto que ya esta en el localStorage
        // le aumento la quantity del producto añadido (porque son el mismo)
        productFound.quantity += newProduct.quantity;
        localStorage.setItem("products", JSON.stringify(products));
        localStorage.setItem("totalQuantity", total + newProduct.quantity);
      } else {
        // si no existe
        products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(products));
        localStorage.setItem("totalQuantity", total + newProduct.quantity);
      }
    }

    if (!totalQuantity) {
      localStorage.setItem("totalQuantity", newProduct.quantity);
    } else {
      const newTotalQuantity = (totalQuantity += newProduct.quantity);
      localStorage.setItem("totalQuantity", newTotalQuantity);
    }
  }

  removeProduct(product, index) {
    const products = JSON.parse(localStorage.getItem("products"));
    const totalQuantity = Number(localStorage.getItem("totalQuantity"));
    //------------------------------------------------------------------
    if (!products) {
      return;
    } else {
      if (products.length === 1) {
        localStorage.setItem("products", JSON.stringify([]));
        localStorage.setItem("totalQuantity", 0);
      } else {
        products.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(products));
        localStorage.setItem("totalQuantity", totalQuantity - product.quantity);
      }
    }
    //console.log(products);
    /*
        if (!products) {                                                           
            // si no hay productos
            return;                                                                
            // vuelve sin hacer nada
        } else {                                                                   
            // si no
            const productFound = products.find(p => p.id === product.productId);   

            if (productFound && productFound.quantity === 0) {
                return;
            }

            if (productFound) {
                productFound.quantity--;
                localStorage.setItem("products", JSON.stringify(products));
            } else {
                return;
            }
        }

        if (!totalQuantity) {
            localStorage.setItem("totalQuantity", 0);
        } else {
            if (totalQuantity === 0) {
                return;
            } else {
                const newTotalQuantity = totalQuantity - 1;
                localStorage.setItem("totalQuantity", newTotalQuantity);
            }
        }*/
  }

  cancelProduct(productToCancel) {
    const products = JSON.parse(localStorage.getItem("products"));
    const totalQuantity = localStorage.getItem("totalQuantity");
    const totalPrice = localStorage.getItem("totalPrice");

    if (!products) {
      return;
    } else if (products.length === 1) {
      localStorage.removeItem("products");
      const newQuantity = totalQuantity - productToCancel.quantity;
      const newTotalPrice =
        totalPrice - productToCancel.precio * productToCancel.quantity;

      localStorage.setItem("totalQuantity", newQuantity);
      localStorage.setItem("totalPrice", newTotalPrice);
    } else {
      const newQuantity = totalQuantity - productToCancel.quantity;
      const newTotalPrice =
        totalPrice - productToCancel.precio * productToCancel.quantity;

      localStorage.setItem("totalQuantity", newQuantity);
      localStorage.setItem("totalPrice", newTotalPrice);

      products.forEach((p, idx) => {
        if (p.id === productToCancel.id) {
          products.splice(idx, 1);
        }
      });
      localStorage.setItem("products", JSON.stringify(products));
    }
  }
}
export default new CarritoService();
