import axios from 'axios'

export const getAll = (url) =>
    axios.get(url, {
        headers: { "x-access-token": sessionStorage['x-access-token'] }
    })


export const getItem = (url, id) =>
    axios.get(`${url}/${id}`, {
        headers: { "x-access-token": sessionStorage['x-access-token'] }
    });


export const updateItem = (url, id, newItem) =>

    axios.put(`${url}/${id}`, newItem, {
        headers: { "x-access-token": sessionStorage['x-access-token'] }
    });


export const updateItems = (url, newItems) =>

    axios.put(url,  newItems , {
        headers: { "x-access-token": sessionStorage['x-access-token'] }
    });


export const deleteItem = (url) =>

    axios.delete(url, {
        headers: { "x-access-token": sessionStorage['x-access-token'] }
    });



// export const updateEmpDep = (url, empId, empIdsToUpdate) =>

// axios.put(`${url}/${empId}`, empIdsToUpdate, {
//     headers: { "x-access-token": sessionStorage['x-access-token'] }
// });


export const addItem = (url, newItem) => {

    axios.post(url, newItem, {
        headers: { "x-access-token": sessionStorage['x-access-token'] }
    });
}






