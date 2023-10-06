import axios from "axios";

const client = axios.create({ baseURL: "http://165.232.113.240:80/api/v1" });

const onSuccess = (response) => response;
const onFailure = (err) => {
    //we might redirect to login page if status is 401
    console.log(err);
    throw err;
}

export const request = (options) => {
    const token = localStorage.getItem("token");
    client.defaults.headers.common.Authorization = `Bearer ${token}`;

    return client(options).then(onSuccess).catch(onFailure);
}
