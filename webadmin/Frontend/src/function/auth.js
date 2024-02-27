import axios from "axios";
export const currentUser = async(authtoken) => {
    return await axios.post('http://localhost:3001/current-user', {}, {
        headers: {
            authtoken,
        },
    })
}