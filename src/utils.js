import axios from 'axios'

export const getAll = (url) =>
    axios.get(url, {
        headers: { "x-access-token": sessionStorage['x-access-token'] }
    })


export const getItem = (url, id) =>
    axios.get(`${url}/${id}`, {
        headers: { "x-access-token": sessionStorage['x-access-token'] }
    });





