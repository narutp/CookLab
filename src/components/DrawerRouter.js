import Home from './MainScreen';
import MyDishes from './AppDrawerNavigator/MyDishes';
import SideMenu from './SideMenu';
import { DrawerNavigator } from 'react-navigation';

console.log('Page2',Page2)
export default DrawerNavigator({
  Home: {
    screen: Home
  },
  MyDishes: {
    screen: MyDishes
  }
}, {
  contentComponent: SideMenu,
  drawerWidth: 300
});
