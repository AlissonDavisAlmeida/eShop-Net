export const getCookie = (key: string) => {

    const cookie = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)")
    // "(^|;)\\s*" + key + "\\s*=\\s*([^;]+)"
    console.log(cookie)
    return cookie ? cookie.pop() : ""
}

export const formatCurrencies = (value: number): string => {
    return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
        }).format(value)
}