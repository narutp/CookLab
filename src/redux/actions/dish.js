import constants from 'src/redux/constants'

const DishActions = {
    setImageSource: (imageSource) => ({
        type: constants.SET_IMAGE_SOURCE,
        payload: imageSource
    }),
    setIngredientList: (list) => ({
        type: constants.SET_INGREDIENT_LIST,
        payload: list
    }),
    setRecipeList: (list) => ({
        type: constants.SET_RECIPE_LIST,
        payload: list
    })
}

export default DishActions
