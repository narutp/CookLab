import constants from 'src/redux/constants'
const initialState = {
   imageSource: null
}

export default (state = initialState, action) => {
    switch (action.type) {
      case constants.SET_IMAGE_SOURCE:
          return{
              ...state,
              imageSource: action.payload
          }
      default:
          return state
    }
}
