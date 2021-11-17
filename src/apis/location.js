import axios from "axios"

const locationURL = "https://cors-anywhere.herokuapp.com/" + "https://thongtindoanhnghiep.co"

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
          `${locationURL}/api/city`, {
            headers: {
              "Access-Control-Allow-Origin": "*",
            //   "origin": "http://192.168.0.104:3000/"
            },
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
          `${locationURL}/api/city/${cID}/district`, {
            headers: {
              "Access-Control-Allow-Origin": "*",
            //   "origin": "http://192.168.0.104:3000/"
            },
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
          `${locationURL}/api/district/${dID}/ward`, {
            headers: {
              "Access-Control-Allow-Origin": "*",
            //   "origin": "http://192.168.0.104:3000/"
            },
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
