import { AxiosError, AxiosInstance } from "axios"
import { createAxiosClient } from "./axios"
import { ApiError, BadRequestError, NotFoundError } from "./errors"
import { UserDTO, UserPartialDTO } from "./schemas/userSchema"
import { AlreadyExistsRejection, NotFoundRejection } from "./rejections"

export class ApiClient {
    private axiosClient: AxiosInstance

    constructor(baseURL: string) {
        this.axiosClient = createAxiosClient(baseURL)
    }

    async getUsers(): Promise<UserDTO[]> {
        return this.get(`/users`)
    }

    async getUser(id: string): Promise<UserDTO | NotFoundRejection> {
        return this.get(`/user/${id}`)
    }

    async createUser(user: UserDTO): Promise<UserDTO | AlreadyExistsRejection> {
        return this.post(`/user`, user)
    }

    async updateUser(id: string, user: UserPartialDTO): Promise<UserDTO | NotFoundRejection | AlreadyExistsRejection> {
        return this.put(`/user/${id}`, user)
    }

    async deleteUser(id: string): Promise<{ status: "ok" } | NotFoundRejection> {
        return this.delete(`/user/${id}`)
    }

    // async updateOrganization(id: string, organization: OrganizationUpdateDTO): Promise<OrganizationDTO> {
    //     // TODO change to patch
    //     return this.get(`/organization/${id}`, organization)
    // }

    private async get<T, U>(url: string, data?: T, timeout?: number): Promise<U> {
        return this.request<T, U>(url, "GET", data, timeout)
    }

    private async post<T, U>(url: string, data?: T, timeout?: number): Promise<U> {
        return this.request<T, U>(url, "POST", data, timeout)
    }

    private async put<T, U>(url: string, data?: T, timeout?: number): Promise<U> {
        return this.request<T, U>(url, "PUT", data, timeout)
    }

    private async delete<T, U>(url: string, data?: T, timeout?: number): Promise<U> {
        return this.request<T, U>(url, "DELETE", data, timeout)
    }

    private async request<T, U>(
        url: string,
        method: "GET" | "POST" | "PUT" | "DELETE",
        data?: T,
        timeout?: number,
    ): Promise<U> {
        try {
            console.log(url, method, data, timeout)
            const r = await this.axiosClient.request<U>({
                method: method,
                url: url,
                headers: this.prepareHeaders(),
                data: data,
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
