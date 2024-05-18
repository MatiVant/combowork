import CRUDService from "./CRUDService";

class OrdersServices extends CRUDService {
    constructor() {
        super("orders");
    }
}

export default new OrdersServices;