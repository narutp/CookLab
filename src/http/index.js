import Axios from 'react-native-axios'

const axiosConfig = {
    baseURL: 'https://cooklab.online'
}

let instance = Axios.create(axiosConfig)
export default instance

