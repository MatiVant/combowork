import API_URL from "../config";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

type Request = "get" | "post" | "put" | "patch" | "delete";

interface DefaultHeader {
  header: string;
  value: string;
}

interface OriginalRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface RequestResult<DataType = any> {
  data: DataType;
  hasError: boolean | null;
  msg: string;
  statusCode: number | null;
}

function responseIsSuccessful({ status }: { status: number }) {
  let successful = false;
  if (status >= 200 && status < 300) {
    successful = true;
  }
  return successful;
}

class HTTPService {
  static defaultHeader: DefaultHeader | null = null;
  protected http: AxiosInstance;
  get: (...args: any[]) => Promise<RequestResult>;
  post: (...args: any[]) => Promise<RequestResult>;
  put: (...args: any[]) => Promise<RequestResult>;
  patch: (...args: any[]) => Promise<RequestResult>;
  delete: (...args: any[]) => Promise<RequestResult>;

  constructor(baseRouteUrl?: string) {
    this.http = axios.create();
    this.http.defaults.baseURL = API_URL.url + (baseRouteUrl || "");

    const defaultHeader = HTTPService.defaultHeader;
    if (defaultHeader)
      this.setDefaultHeader(defaultHeader.header, defaultHeader.value);
    this.http.interceptors.request.use(this.handleRequestInterceptor);
    this.http.interceptors.response.use(null, this.handleErrorInterceptor);
    this.get = this.createRequestHandler("get");
    this.post = this.createRequestHandler("post");
    this.put = this.createRequestHandler("put");
    this.patch = this.createRequestHandler("patch");
    this.delete = this.createRequestHandler("delete");
  }

  createRequestHandler(
    verb: Request
  ): (...args: any[]) => Promise<RequestResult> {
    return async (...args: any[]): Promise<RequestResult> => {
      let hasError: boolean | null = null;
      let data: any = null;
      let statusCode: number | null = null;
      let msg: string = "";

      try {
        //@ts-ignore
        const response = await this.http[verb](...args);

        if (!responseIsSuccessful(response)) {
          hasError = true;
          // msg = response.data?.detail || "error";
        } else {
          data = response.data;
        }
        statusCode = response.status;
      } catch (err: any) {
        hasError = true;
        console.error(err)
        msg = err.response?.data?.error?.message || "Ha surgido un error";
      }
      return { data, hasError, msg, statusCode };
    };
  }

  /**
   * Setea cabecera por defecto, únicamente de la instancia
   * @param {*} header
   * @param {*} value
   */
  setDefaultHeader(header: string, value: string) {
    this.http.defaults.headers.common[header] = value;
  }

  /**
   * Setea cabecera por defecto para todas las instancias que se creen posteriormente al seteo. Setea también la de la instancia que ejecuta el método
   * @param {*} header
   * @param {*} value
   */
  setDefaultHeaderAllInstances(header: string, value: string): void {
    HTTPService.defaultHeader = { header, value };
    this.setDefaultHeader(header, value);
  }

  setDefaultBaseUrl(url: string = "") {
    this.http.defaults.baseURL = API_URL.url + url + "/";
  }

  async refresh(refreshToken: string) {
    const http = axios.create();
    return await http.post(API_URL.url + "/refresh", { refreshToken });
  }

  handleErrorInterceptor = async (
    error: AxiosError
  ): Promise<AxiosResponse> => {
    const originalRequest: OriginalRequest | undefined = error.config;

    if (error.response?.status === 401) {
      try {
        if (
          originalRequest &&
          !originalRequest._retry &&
          originalRequest.url !== "/refresh"
        ) {
          //get refreshToken
          const refreshToken: string | null =
            localStorage.getItem("refreshToken");

          // get new accessToken
          if (refreshToken) {
            const res = await this.refresh(refreshToken);
            localStorage.setItem("accessToken", res.data.accessToken);

            originalRequest._retry = true;

            // shoot request again
            const newRequest = this.setAuthHeaderToConfig(originalRequest);
            const result = await this.http(newRequest);

            return result;
          }
        }
      } catch (err) {
        console.error(err);
      }

      localStorage.clear();
      // window.location.reload()
    }
    throw error;
  };

  handleRequestInterceptor = (config: InternalAxiosRequestConfig) => {
    return this.setAuthHeaderToConfig(config);
  };

  /**
   * Asigna cabecera de authenticación a una `requestConfig` de `axios`. Toma el accesToken del `asyncStorage`
   * @param {*} config
   * @returns
   */

  setAuthHeaderToConfig = (config: InternalAxiosRequestConfig) => {
    const accessToken = this.getAccessToken();
    if (accessToken && config) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  };

  getAccessToken() {
    return localStorage.getItem("accessToken");
  }
}

export default HTTPService;
