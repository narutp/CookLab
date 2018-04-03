import Axios from 'react-native-axios'

const axiosConfig = {
    baseURL: 'http://localhost:3000'
}

let instance = Axios.create(axiosConfig)
export default instance

