import constants from 'src/redux/constants'

const DishActions = {
    setImageSource: (imageSource) => ({
        type: constants.SET_IMAGE_SOURCE,
        payload: imageSource
    })
}

export default DishActions
