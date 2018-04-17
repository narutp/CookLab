import constants from 'src/redux/constants'
const initialState = {
   imageSource: null,
   FEleaderboard: [],
   FDleaderboard: [],
   FTleaderboard: [],
   GEleaderboard: [],
   GDleaderboard: [],
   GTleaderboard: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
      case constants.SET_IMAGE_SOURCE:
          return{
              ...state,
              imageSource: action.payload
          }
      case constants.FRIEND_EXP_LEADERBOARD:
          return{
              ...state,
              FEleaderboard: action.payload
          }
      case constants.FRIEND_DISH_LEADERBOARD:
          return{
              ...state,
              FDleaderboard: action.payload
          }
      case constants.FRIEND_TROPHY_LEADERBOARD:
          return{
              ...state,
              FTleaderboard: action.payload
          }
      case constants.GLOBAL_EXP_LEADERBOARD:
          return{
              ...state,
              GEleaderboard: action.payload
          } 
      case constants.GLOBAL_DISH_LEADERBOARD:
          return{
              ...state,
              GDleaderboard: action.payload
          }  
      case constants.GLOBAL_TROPHY_LEADERBOARD:
          return{
              ...state,
              GTleaderboard: action.payload
          }   
      default:
          return state
    }
}
