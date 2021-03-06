import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";

axios.defaults.baseURL = "http://localhost:5000/api/"
axios.defaults.withCredentials = true

axios.interceptors.response.use(response => {
    return response
}, (error: AxiosError) => {
    const { data, status } = error.response!

    switch (status) {
        case 400:

            if (data.errors) {
                const modelStateErrors: string[] = []
                for (const key in data.errors) {
                    modelStateErrors.push(data.errors[key])
                }

                throw modelStateErrors.flat()
            }

            toast.error(data.title)
            break;
        case 401:
            toast.error(data.title)
            break;
        case 500:
            history.push({
                pathname: "server-error",
                state: { error: data }
            })
            break;
        default:
            break;
    }

    return Promise.reject(error.response)
})


const responseBody = (response: AxiosResponse) => {
    return response.data
}

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: (params?: URLSearchParams) => requests.get("Products", params),
    details: (id: number) => requests.get(`Products/${id}`),
    fetchFilters: () => requests.get("Products/filters")
}

const Cart = {
    get: () => requests.get("Cart"),
    addItem: (productID: number, quantity: number = 1) => requests.post(`Cart?productID=${productID}&quantity=${quantity}`, {}),
    removeItem: (productID: number, quantity: number = 1) => requests.delete(`Cart?productID=${productID}&quantity=${quantity}`),
}

const TestErrors = {
    get400Error: () => requests.get("Buggy/bad-request"),
    get401Error: () => requests.get("Buggy/unauthorized"),
    get404Error: () => requests.get("Buggy/not-found"),
    get500Error: () => requests.get("Buggy/server-error"),
    getValidationError: () => requests.get("Buggy/validation-error"),

}

export const agents = {
    Catalog,
    TestErrors,
    Cart
}