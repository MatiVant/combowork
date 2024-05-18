import CRUDService from "./CRUDService";

class CompaniesServices extends CRUDService {
    constructor() {
        super("companies");
    }
}

export default new CompaniesServices;