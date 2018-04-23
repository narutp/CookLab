import constants from 'src/redux/constants'
const initialState = {
   imageSource: null,
   i_list: [],
   r_list: []
}

export default (state = initialState, action) => {
    switch (action.type) {
      case constants.SET_IMAGE_SOURCE:
          return{
              ...state,
              imageSource: action.payload
          }
      case constants.SET_INGREDIENT_LIST:
          return{
              ...state,
              i_list: action.payload
          }
      case constants.SET_RECIPE_LIST:
          return{
              ...state,
              r_list: action.payload
          }
      default:
          return state
    }
}
