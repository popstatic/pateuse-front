import { API_URL } from '../../secret'
import { getToken } from './token';

const getHeaders = async () => {
    const token = await getToken();
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'mode':"cors"
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return headers;
};

export const post = async (destination, body) => {
    //console.log("from req", body.user).email;
    var headers = await getHeaders();
    //console.log('GET ID', body,`${API_URL}${destination}?+mail=${body.user.email}&password=${body.user.password}`)
    const result = await fetch(`${API_URL}${destination}?email=${body.user.email}&password=${body.user.password}`, {
        method: 'GET',
        mode:"cors"
    });
    console.log("RESULTYS",result.ok)
    if (result.ok) {
        return await result.json();
    }
    throw { error: result.status };
};



export const get = async (destination) => {
    var headers = await getHeaders();
    console.log('GET')
    
    const result = await fetch(`${API_URL}${destination}`, {
        method: 'GET',
        mode:"cors"
    });
    console.log("GET USRS",result.ok);
    if (result.ok) {
        return await result.json();
    }
    throw { error: result.status };
};