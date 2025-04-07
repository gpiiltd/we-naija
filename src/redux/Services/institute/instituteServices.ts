import apiRoutes from "../../network/config";
import { get } from "../../network/https";

export class ListAllInstitute {
  static async list_all_institute(data: Record<string, string>) {
    const response = await get({
      url: apiRoutes.allInstitute,
      data: { ...data },
    });
    console.log("response*****", response);
    if (response.status === "error") {
      return Promise.reject({
        message: response.message,
        status_code: response.status_code,
        results: response.results,
      });
    }
    if (response.status === "success") {
      return response;
    }
  }
}

