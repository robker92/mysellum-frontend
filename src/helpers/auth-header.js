/* eslint-disable prettier/prettier */
export function authHeader() {
    let authToken = getCookie("authToken");
    console.log(authToken);
    if (authToken != "") {
        return {
            //Authorization: 'Bearer ' + user.token,
            "x-access-token": authToken
        }
    } else {
        return {}
    };
};

export function getCookie(cName) {
    //reads out the value for the provided cookie key
    var name = cName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        };
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        };
    };
    return "";
};