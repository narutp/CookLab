import { Router, Scene } from 'react-native-router-flux'

import StatusPosting from 'src/components/sidepages/StatusPosting'
import MainScreen from 'src/components/MainScreen'
import Login from 'src/components/Login'
import { Provider } from 'react-redux'
import React from 'react'
import store from 'src/redux/store'

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Scene key="root">
                    <Scene key="Login" component={Login} />
                    <Scene key="MainScreen" component={MainScreen} initial/>
                    <Scene key="StatusPosting" component={StatusPosting} />
                </Scene>
            </Router>
        </Provider>
    )
}

export default App
