import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000'
})

export function getTickets() {
    return api.get('/tickets')
}

export default api