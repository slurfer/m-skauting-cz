import { AxiosInstance } from "axios"
import { createAxiosClient } from "./axios"
import { OrganizationDTO } from "./types"

export class ApiClient {
    private axiosClient: AxiosInstance

    constructor(baseURL: string) {
        this.axiosClient = createAxiosClient(baseURL)
    }

    async getOrganization(id: string): Promise<OrganizationDTO> {
        return this.get(`/organization/${id}`)
    }

    private async get<T, U>(url: string, params?: T, timeout?: number): Promise<U> {
        const r = await this.axiosClient.request<U>({
            method: "GET",
            url: url,
            headers: this.prepareHeaders(),
            params: params,
            timeout: timeout,
        })
        return r.data
    }

    private prepareHeaders() {
        return {}
    }
}
