import Home from './MainScreen';
import MyDishes from './AppDrawerNavigator/MyDishes';
import Settings from './AppDrawerNavigator/Settings';
import Logout from './AppDrawerNavigator/Logout';

import SideMenu from './SideMenu';
import { DrawerNavigator } from 'react-navigation';

export default DrawerNavigator({
  Home: {
    screen: Home
  },
  MyDishes: {
    screen: MyDishes
  },
  Settings: {
    screen: Settings
  },
  Logout: {
    screen: Logout
  }
}, {
  contentComponent: SideMenu,
  drawerWidth: 300
});
