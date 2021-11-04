import axios from "axios"

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
          `https://thongtindoanhnghiep.co/api/city`
        )
    }
    catch(e) {
        console.log(e)
    }
}

export const getDistricts = async ({cID}) => {
    try{
        return await axios.get(
          `https://thongtindoanhnghiep.co/api/city/${cID}/district`
        )
    }
    catch(e) {
        console.log(e)
    }
}

export const getWards = async ({dID}) => {
    try{
        return await axios.get(
          `https://thongtindoanhnghiep.co/api/district/${dID}/ward`
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
