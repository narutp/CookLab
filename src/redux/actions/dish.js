import constants from 'src/redux/constants'

const DishActions = {
    setImageSource: (imageSource) => ({
        type: constants.SET_IMAGE_SOURCE,
        payload: imageSource
    }),
    setFriendExpLeaderboard: (leaderboard) => ({
        type: constants.FRIEND_EXP_LEADERBOARD,
        payload: leaderboard
    }),
    setFriendDishLeaderboard: (leaderboard) => ({
        type: constants.FRIEND_DISH_LEADERBOARD,
        payload: leaderboard
    }),
    setFriendTrophyLeaderboard: (leaderboard) => ({
        type: constants.FRIEND_TROPHY_LEADERBOARD,
        payload: leaderboard
    }),
    setGlobalExpLeaderboard: (leaderboard) => ({
        type: constants.GLOBAL_EXP_LEADERBOARD,
        payload: leaderboard
    }),
    setGlobalDishLeaderboard: (leaderboard) => ({
        type: constants.GLOBAL_DISH_LEADERBOARD,
        payload: leaderboard
    }),
    setGlobalTrophyLeaderboard: (leaderboard) => ({
        type: constants.GLOBAL_TROPHY_LEADERBOARD,
        payload: leaderboard
    }),
}

export default DishActions
