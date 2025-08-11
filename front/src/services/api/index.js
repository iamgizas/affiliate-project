const request = (url, method = "POST", body) => {
    return fetch(`${process.env.REACT_APP_API_URL}${url}`, {
        method,
        body: JSON.stringify(body),
        headers: {
            'content-type': 'application/json'
        }
    });
}

export const userRegister = (role, nome, email, senha) => {
    return request(`/register`, "POST", {role, nome, email, senha});
}

export const userLogin = (email, senha) => {
    return request(`/login`, "POST", {email, senha});
}