const BASE_AUTH_URL = "https://auth.nomoreparties.co";

function handleResponse(res) {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
}

export const authorize = (password, email) => {
    return fetch(`${BASE_AUTH_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => handleResponse(res));
};

export const register = (password, email) => {
    return fetch(`${BASE_AUTH_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
    }).then((res) => handleResponse(res));
};

export const getContent = (token) => {
    return fetch(`${BASE_AUTH_URL}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => handleResponse(res));
};