import {BackendUrl} from './index'

export const approveOwnerAccount = (email) => {
    return axios.patch(`${BackendUrl}/owner/approve'`, { email: email})
}

export const deleteOwnerAccount = (email) => {
    return axios.delete(`${BackendUrl}/owner/profile/${email}`, {})
}

export const fetchOwnerAccount = () => {
    return axios({
        method: 'GET',
        url: `${BackendUrl}/admin/management-owner`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
}

export const fetchAllPost = () => {
    return axios({
        method: 'GET',
        url: `${BackendUrl}/admin/management-post`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
}

export const approvePost = (id) => {
    return axios.put(`${BackendUrl}/accommodation/approve`, { accommodationId: id })
}

export const deletePost = (id) => {
    return axios
    .delete(
      `${BackendUrl}/accommodation/${id}`,
      {}
    )
}
