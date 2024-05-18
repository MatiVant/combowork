import CRUDService from "./CRUDService";

class CategoriesServices extends CRUDService {
    constructor() {
        super("categories");
    }

    getCategoriesWhithProducts = async (id: number) => {
        return this.findById(id,
            {
                include: ['products']
            }
        )
    }
}

export default new CategoriesServices;