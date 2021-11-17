import axios from "axios"

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
export const getLocationFromCoords = async ({lat, lon}) => {
    
    try{
        return await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=vi`)
    }
    catch(e) {
        console.log(e)
    }
}

export const getCities = async () => {
    try{
        return await axios.get(
          `https://thongtindoanhnghiep.co/api/city`, {
            headers: {
              "Access-Control-Allow-Origin": "*"
            }
        }
        )
    }
    catch(e) {
        console.log(e)
    }
}

export const getDistricts = async ({cID}) => {
    try{
        return await axios.get(
          `https://thongtindoanhnghiep.co/api/city/${cID}/district`, {
            headers: {
              "Access-Control-Allow-Origin": "*"
            }
        }
        )
    }
    catch(e) {
        console.log(e)
    }
}

export const getWards = async ({dID}) => {
    try{
        return await axios.get(
          `https://thongtindoanhnghiep.co/api/district/${dID}/ward`, {
            headers: {
              "Access-Control-Allow-Origin": "*"
            }
        }
        )
    }
    catch(e) {
        console.log(e)
    }
}

export const getPublicLocations = () => {
    try{
        return axios.get(
          `https://accommodation-finder.herokuapp.com/location`
        )
    }
    catch(e) {
        console.log(e)
    }
}
