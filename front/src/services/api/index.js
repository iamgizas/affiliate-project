// const request = (url: string, method: string = "POST", body?: object) => {
//     return fetch(`${process.env.DATABASE_URL}${url}`, {
//         method,
//         body: JSON.stringify(body),
//         headers: {
//             'content-type': 'application/json'
//         }
//     });
// }

// export const userRegister = (name: string, email: string, password: string, role: string) => {
//     return request(`/register`, "POST", {name, email, password, role});
// }