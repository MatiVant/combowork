import { Product } from "../types/product";
import CRUDService from "./CRUDService";

class ProductsServices extends CRUDService {
  constructor() {
    super("products");
  }

  getProductWhithCategory = async (id: number) => {
    return this.findById(id, {
      include: ["category"],
    });
  };
  chekStock = async (products: Product[]) => {
    const rsp = await this.post(`check-stock`, { products });
    // console.log(rsp);
    return rsp;
  };
  getProducts = async () => {
    const resp = await this.get();
    return resp;
  };
}

export default new ProductsServices();
