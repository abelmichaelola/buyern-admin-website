import { Switch, Route } from 'react-router';
import FoodPage from '../FoodPage/FoodPage';
import { NavItemData } from '../NavigationMain/NavigationItem/NavigationItem';
import ListView from '../ui/ListView/ListView';
import { SearchBarConstructor } from '../ui/SplitViewTemplateComponent/SplitViewLeftSide/SplitViewLeftSide';
import { SplitViewTemplateComponent } from '../ui/SplitViewTemplateComponent/SplitViewTemplateComponent';
import TabNavigation, { TabNavigationItem } from '../ui/TabNavigation/TabNavigation';
// import styles from './OrdersPage.module.scss';

class MenusPage extends SplitViewTemplateComponent {
  list1: NavItemData[] = [];

  constructor(props: any) {
    super(props);

    this.tabNav = (
      <TabNavigation>
        <TabNavigationItem link={this.props.match.url + "/all"} text={"All Foods"} />
        <TabNavigationItem link={this.props.match.url + "/publicListing"} text={"Public Listing"} />
        <TabNavigationItem link={this.props.match.url + "/drafts"} text={"Drafts"} />
        <TabNavigationItem link={this.props.match.url + "/unavailable"} text={"Out Of Stock"} />
      </TabNavigation>
    );
    this.mainPageSwitch =
      (<Switch>
        <Route path={this.props.match.path + "*/food/:foodId"} component={FoodPage} />
      </Switch>
      );
    this.LeftListSwitch = (
      <Switch>
        <Route path={["/foods/all", "/foods"]} render={(props) => (<ListView {...props} navItems={this.list1} />)} />,
        <Route path={"/foods/drafts"} render={(props) => (<ListView {...props} navItems={this.list1} />)} />,
        <Route path={"/foods/publicListing"} render={(props) => (<ListView {...props} navItems={this.list1} />)} />,
        <Route path={"/foods/unavailable"} render={(props) => (<ListView {...props} navItems={this.list1} />)} />
      </Switch>
    )
    this.SearchSwitch = (<Switch>
      <Route path={"*/foods"} render={(props) => (<SearchBarConstructor {...props} searchType={"permissions"} placeHolder={"Search Foods"} callback={() => { }} />)} />
    </Switch>)
    this.list1 = [
      {
        anchorText: "$8,000.00",
        title: "One plate of Chinese Rice with marinated Chicken",
        subText: "2 New Orders",
        wrapTitle: true,
        link: "/food/yeafg87ew",
        isActive: true,
      },
      {
        anchorText: "$8,000.00",
        title: "One plate of Chinese Rice with marinated Chicken",
        subText: "2 New Orders",
        wrapTitle: true,
        link: "/food/yhddgetg",
        isActive: true,
      },
      {
        anchorText: "$8,000.00",
        title: "One plate of Chinese Rice with marinated Chicken",
        subText: "2 New Orders",
        wrapTitle: true,
        link: "/food/yedathseat",
        isActive: true,
      },
      {
        anchorText: "$8,000.00",
        title: "One plate of Chinese Rice with marinated Chicken",
        subText: "2 New Orders",
        wrapTitle: true,
        link: "/food/ysrjrthh",
        isActive: true,
      },

    ]

    this.resizeCallback = (isSmallScreen: boolean) => {
      // console.log(isSmallScreen);
      if (isSmallScreen) {
        this.setState({
          leftViewIsExact: true,
          leftViewPath: ["/foods", "/foods/:random"]
        })
      } else {
        this.setState({
          leftViewIsExact: false,
          leftViewPath: "*"
        })
      }
    }
  }
}
export default MenusPage;