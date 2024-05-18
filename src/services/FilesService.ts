import HTTPService from "./HTTPService";

class FilesServices extends HTTPService {
  constructor() {
    super();
  }
  async fileUpload(file: File) {
    const formData: FormData = new FormData();
    formData.append("file", file);
    const result = await this.post("files", formData);
    return result;
  }
}

export default new FilesServices();
