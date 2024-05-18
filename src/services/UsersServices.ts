import CRUDService from "./CRUDService";
import { newUser } from "../types/newUser";

class UsersServices extends CRUDService {
  constructor() {
    super("users");
  }
  async create(data:{user:newUser,companyCode:string}) {
    const result = await this.post("/signup", data);
    return result;
  }
}

export default new UsersServices();
