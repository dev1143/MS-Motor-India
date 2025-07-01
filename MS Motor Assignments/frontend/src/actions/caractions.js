
import axios from "axios";
import { toast } from "react-toastify";
import { saveCarData } from "../slice/carSlice"


export function carCreate(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const tokenItem = JSON.parse(localStorage.getItem("store-value"));

            if (!tokenItem || !tokenItem.data?.token) {
                return reject("No token found");
            }

            const token = tokenItem.data.token;

            const request = await axios.post('http://localhost:5000/api/cars', data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}` // ✅ This is the correct format
                }
            });

            if (request.status === 200) {
                resolve(request.data.message);
            } else {
                reject(request.data);
            }
        } catch (err) {
            console.log(err.message || "Request failed");
            reject(err);
        }
    });
}



export function viewCarsList() {
    return async (dispatch) => {
        try {
            const res = await viewCars();
            if (res) {
                const { rows, count } = res;
                dispatch(saveCarData(rows));
            }
        } catch (err) {
            toast.error(err.message || 'Something went wrong');
        }
    };
}


export function deleteCars(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post('http://localhost:5000/api/delete-cars', { id: id });

            if (response.status === 200) {
                resolve(response.data);
            } else {
                reject(response.data);
                toast.error('Car was not deleted successfully!');
            }
        } catch (err) {
            reject(err); // important!
            toast.error(err.message || 'Something went wrong');
        }
    });
}

export function viewCars() {
    return new Promise(async (resolve, reject) => {
        try {
            // service call to be handled
            let response = await axios.get('http://localhost:5000/api/cars')
            if (response.status == 200) {
                let { rows, count } = response.data
                console.log('cars cars', rows)
                resolve(response.data)
                // dispatch(saveCarData(rows))
            } else {
                reject(response.data)
                toast.error('Cars was not added Successfully !')
            }
        } catch (err) {
            toast.error(err.message)
        }

    })
}

