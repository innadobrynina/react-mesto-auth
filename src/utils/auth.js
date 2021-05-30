export const BASE_AUTH_URL = "https://auth.nomoreparties.co";

export const authorize = (password, email) => {
    return fetch(`${BASE_AUTH_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.token) {
                localStorage.setItem("token", data.token);
                return data;
            }
        })
        .catch((err) => console.log(err));
};

export const register = (password, email) => {
    return fetch(`${BASE_AUTH_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
    })
        .then((response) => {
            try {
                if (response.status === 400 || response.status === 401) {
                    return response.json();
                }
            } catch (e) {
                return e;
            }
        })
        .then((res) => {
            return res;
        })
        .catch((err) => console.log(err));
};

export const getContent = (token) => {
    return fetch(`${BASE_AUTH_URL}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .then((data) => data);
};