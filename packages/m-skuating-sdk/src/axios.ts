import axios from "axios"

export const createAxiosClient = (baseURL: string) => {
    return axios.create({
        baseURL,
        timeout: 5000,
        headers: {
            "Content-Type": "application/json",
        },
    })
}
