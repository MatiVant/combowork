import CRUDService from "./CRUDService";

interface LoginData {
  email: string;
  password: string;
}

interface RecoverPassData {
  email: string;
}
interface ChangerPassData {
  password: string;
}
interface ResetPassData {
  email: string;
  resetKey: string;
  password: string;
}

class AuthService extends CRUDService {
  constructor() {
    super("");
  }

  async login(data: LoginData) {
    const result = await this.post("users/refresh-login", data);
    if (!result.hasError) {
      localStorage.setItem("accessToken", result.data.accessToken);
      localStorage.setItem("refreshToken", result.data.refreshToken);
    }

    return result;
  }

  async findUser() {
    return await this.get("/whoAmI");
  }

  async passRecover(data: RecoverPassData) {
    const response = await this.post("users/password-recovery", data);
    return response;
  }
  async passReset(data: ResetPassData) {
    const response = await this.post("/users/password-reset", data);
    return response;
  }
  async changerPass(data: ChangerPassData) {
    const response = await this.post("users/password-changer", data);
    return response;
  }
}

export default new AuthService();
