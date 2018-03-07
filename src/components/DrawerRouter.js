import Page1 from './MainScreen';
import Page2 from './AppDrawerNavigator/MyDishes';
import SideMenu from './SideMenu';
import { DrawerNavigator } from 'react-navigation';

export default DrawerNavigator({
  Page1: {
    screen: Page1
  },
  Page2: {
    screen: Page2
  }
}, {
  contentComponent: SideMenu,
  drawerWidth: 300
});
