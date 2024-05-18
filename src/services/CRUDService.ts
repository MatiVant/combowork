import API_URL from "../config";
import HTTPService from "./HTTPService";

interface FilterParams<T = object> {
  limit?: number;
  offset?: number;
  order?: string;
  where?: T;
  include?: string[];
}

interface RequestResult {
  data: any;
  hasError: boolean | null;
  msg: string;
  statusCode: number | null;
}

class CRUDService extends HTTPService {
  nombreRecurso = "";

  // recibimos en el constructor el nombre de un recurso
  // representa un modelo en la api
  constructor(recurso = "") {
    super()
    this.nombreRecurso = recurso;
    this.http.defaults.baseURL = API_URL.url + "/" + this.nombreRecurso;
  }


  async getList(page: number, filter: FilterParams = {}) {
    if (!page) page = 1

    const limit = 10
    const offset = limit * (page - 1)

    const resource = await this.get("", {
      params: {
        filter: {
          limit,
          offset,
          order: "createdAt DESC",
          ...filter
        }
      }
    })

    const count = await this.get("/count")

    return {
      count: count.data.count,
      list: resource.data
    }
  }

  async find(filter: FilterParams = {}) {
    return await this.get("", {
      params: {
        filter
      }
    });
  }

  async count(where = {}) {
    return await this.get("/count", {
      params: {
        where
      }
    });
  }

  async findById(id: number | undefined, filter: FilterParams = {}) {
    return await this.get(`/${id}`, {
      params: {
        filter
      }
    })
  }

  async create(data: Object): Promise<RequestResult> {
    return await this.post("", data);
  }

  async uploadFiles(file: File, id: string, propertyName: string = "files"): Promise<RequestResult> {
    const formData: FormData = new FormData();
    formData.append("file", file);
    const response: RequestResult = await this.post("/" + id + "/" + propertyName, formData);
    return response;
  }

  async update(id: string, data: Object): Promise<RequestResult> {
    return await this.put("/" + id, data);
  }

  async updateFields(id: string, data: Object): Promise<RequestResult> {
    return await this.patch("/" + id, data);
  }

  async destroy(id: string): Promise<RequestResult> {
    return await this.delete("/" + id);
  }

  async findLinked(modelId: string, targetName: string, filter: FilterParams): Promise<RequestResult> {
    return await this.get("/" + modelId + "/" + targetName, {
      params: {
        filter
      }
    });
  }

  async link(modelId: string, targetName: string, targetId: string): Promise<RequestResult> {
    return await this.patch("/" + modelId + "/" + targetName + "/link/" + targetId);
  }

  async unlink(modelId: string, targetName: string, targetId: string): Promise<RequestResult> {
    return await this.delete("/" + modelId + "/" + targetName + "/unlink/" + targetId);
  }
};

export default CRUDService;
