import apiUrl from '../apiConfig'
import axios from 'axios'

// GET -> read(index)
export const getAllPlayers = () => {
    return axios(`${apiUrl}/players`)
}
// GET -> read(show)
export const getOnePlayer = id => {
    return axios(`${apiUrl}/players/${id}`)
}
// POST -> create
// need to pass auth token in the header for create
export const createPlayer = (user, newPlayer) => {
    return axios({
        url: `${apiUrl}/players`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: { player: newPlayer },
    })
}
// PATCH -> update
// also need auth token to update a player
export const updatePlayer = (user, updatedPlayer) => {
    return axios({
        url: `${apiUrl}/players/${updatedPlayer._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: { player: updatedPlayer },
    })
}

// DELETE -> delete
export const deletePlayer = (user, playerId) => {
    return axios({
        url: `${apiUrl}/players/${playerId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
    })
}
