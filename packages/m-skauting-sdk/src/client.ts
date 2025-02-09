import { AxiosError, AxiosInstance } from "axios"
import { createAxiosClient } from "./axios"
// import { OrganizationDTO, OrganizationUpdateDTO } from "./types"
import { ApiError, BadRequestError, NotFoundError } from "./errors"

export class ApiClient {
    private axiosClient: AxiosInstance

    constructor(baseURL: string) {
        this.axiosClient = createAxiosClient(baseURL)
    }

    // async getOrganization(id: string): Promise<OrganizationDTO> {
    //     return this.get(`/organization/${id}`)
    // }

    // async updateOrganization(id: string, organization: OrganizationUpdateDTO): Promise<OrganizationDTO> {
    //     // TODO change to patch
    //     return this.get(`/organization/${id}`, organization)
    // }

    private async get<T, U>(url: string, params?: T, timeout?: number): Promise<U> {
        try {
            const r = await this.axiosClient.request<U>({
                method: "GET",
                url: url,
                headers: this.prepareHeaders(),
                params: params,
                timeout: timeout,
            })
            return r.data
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) {
                    throw new NotFoundError(error.response?.data.error)
                }
                if (error.response?.status === 400) {
                    throw new BadRequestError(error.response?.data.error)
                }
                throw new ApiError(error.response?.data.error, error.response?.status ?? 500)
            }
            throw error
        }
    }

    private prepareHeaders() {
        return {}
    }
}
