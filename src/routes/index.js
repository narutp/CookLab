import { Router, Scene, Drawer, ActionConst } from 'react-native-router-flux'

import StatusPosting from 'src/components/sidepages/StatusPosting'
import MainScreen from 'src/components/MainScreen'
import Login from 'src/components/Login'
import Register from 'src/components/Register'
import { Provider } from 'react-redux'
import React from 'react'
import store from 'src/redux/store'
import DrawerRouter from '../components/DrawerRouter'
import SideMenu from 'src/components/SideMenu'
import CookingLevel from 'src/components/sidepages/CookingLevel'
import Leaderboard from 'src/components/sidepages/Leaderboard'
import MyDish from 'src/components/sidepages/MyDish'
import DishDetail from '../components/sidepages/DishDetail'
import Achievement from 'src/components/sidepages/Achievement'
import Aboutus from 'src/components/sidepages/Aboutus'
import UserDetail from '../components/sidepages/UserDetail'
import FollowList from '../components/sidepages/FollowList'
import FanList from '../components/sidepages/FanList'
import CommentPage from '../components/CommentPage'

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Scene key="root">
                    <Scene key="Login" component={Login} hideNavBar={1} initial />
                    <Scene key="StatusPosting" component={StatusPosting} hideNavBar={1} />
                    <Scene key="Register" component={Register} hideNavBar={1} />
                    <Scene key="SideMenu" component={SideMenu} drawerWidth={300} drawerPosition={'left'} hideNavBar={1} />
                    <Scene key="MainScreen" component={MainScreen} hideNavBar={1} type={ActionConst.RESET}/>
                    <Scene key="CookingLevel" component={CookingLevel} hideNavBar={1} />
                    <Scene key="Leaderboard" component={Leaderboard} hideNavBar={1} />
                    <Scene key="MyDish" component={MyDish} hideNavBar={1} />
                    <Scene key="DishDetail" component={DishDetail} hideNavBar={1} />
                    <Scene key="Achievement" component={Achievement} hideNavBar={1} />
                    <Scene key="Aboutus" component={Aboutus} hideNavBar={1} />
                    <Scene key="UserDetail" component={UserDetail} hideNavBar={1} />
                    <Scene key="FollowList" component={FollowList} hideNavBar={1} />
                    <Scene key="FanList" component={FanList} hideNavBar={1} />
                    <Scene key="CommentPage" component={CommentPage} hideNavBar={1} />
                </Scene>
            </Router>
        </Provider>
    )
}

export default App
