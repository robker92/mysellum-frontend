/* eslint-disable prettier/prettier */
export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'))

    if (user && user.token) {
        return {
            Authorization: 'Bearer ' + user.token,
            "x-access-token": user.token
        }
    } else {
        return {}
    }
}