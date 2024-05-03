import axios from 'axios'
import { host } from '../Constants';


export const fetchUser = async () => {
    console.log("id")

    if (localStorage.length < 1 || localStorage.getItem("userDetails") === undefined || 
    localStorage.getItem("userDetails") === null) {
        return null;
    }

    try {

        const id = JSON.parse( localStorage.getItem("userDetails") ).id;
        console.log("id", id)

        if (id === undefined || id === null)
            return null;
        console.log("id", id)
        const data = await axios.get(`${host}fetchUser?id=${id}`)
        console.log(data);
        localStorage.setItem("userDetails", JSON.stringify(data))
    } catch(err) {
        console.log("err", err)
        return undefined;
    }

}

export const fetchWalletAmount = () => {
    console.log("in fetch amount");
    if (localStorage.getItem("userDetails") !== null) {
        console.log("logssss", JSON.parse(localStorage.getItem("userDetails")));
        return JSON.parse(localStorage.getItem("userDetails")).amount;
        // JSON.parse(JSON.parse(localStorage.getItem("userDetails")).amount ) ;
    } else {
        return 0;
        // return JSON.parse(localStorage.getItem("userDetails")).amount;
    }
}