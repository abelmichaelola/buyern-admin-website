import { Switch, Route } from 'react-router';
import FoodPage from '../FoodPage/FoodPage';
import { NavItemData } from '../NavigationMain/NavigationItem/NavigationItem';
import ListView from '../ui/ListView/ListView';
import { SearchBarConstructor } from '../ui/SplitViewTemplateComponent/SplitViewLeftSide/SplitViewLeftSide';
import { SplitViewTemplateComponent } from '../ui/SplitViewTemplateComponent/SplitViewTemplateComponent';
import TabNavigation, { TabNavigationItem } from '../ui/TabNavigation/TabNavigation';
// import styles from '." + this.basePathMain + "Page.module.scss';

class PermissionsPage extends SplitViewTemplateComponent {
  linkedAccounts: NavItemData[] = [];
  permissions: NavItemData[] = [];
  basePathMain: string = "/admin_permissions";
  basePath: string = "/permissions";
  constructor(props: any) {
    super(props);
    this.permissions = [
      {
        title: "Create Permissions Group",
        wrapTitle: false,
        link: "/addAccount",
        isActive: true,
      },
      {
        title: "Finance Manager",
        wrapTitle: false,
        link: "/permission/financeManager",
        anchorText: "INACTIVE",
        isActive: true,
      }, {
        title: "Sales Manager",
        wrapTitle: false,
        link: "/permission/salesManager",
        anchorText: "ACTIVE",
        isActive: true,
      },
    ]
    this.linkedAccounts = [
      {
        title: "Link new Account",
        wrapTitle: false,
        link: "/addAccount",
        isActive: true,
      }, {
        title: "Abel Michael",
        subText: "abelmichaelola@gmail.com",
        wrapTitle: true,
        link: "/account/abelmichaelola@gmail.com",
        anchorText: "Admin",
        isActive: true,
      }, {
        title: "Abel Michael",
        subText: "abelmichaelola@gmail.com",
        wrapTitle: true,
        link: "/account/abell",
        anchorText: "Finance Manager",
        isActive: true,
      },
    ]
    this.tabNav = (
      <TabNavigation>
        <TabNavigationItem link={this.props.match.url + "/permissions"} text={"Permissions"} />
        <TabNavigationItem link={this.props.match.url + "/linkedAccounts"} text={"Linked Account"} />
      </TabNavigation>
    );
    this.mainPageSwitch =
      (<Switch>
        <Route path={"*/account/:accountId"} component={FoodPage} />
      </Switch>);
    this.LeftListSwitch = (
      <Switch>
        <Route path={this.basePathMain + "/linkedAccounts"} render={(props) => (<ListView {...props} navItems={this.linkedAccounts} />)} />
        <Route path={[this.basePathMain + "/permissions", this.basePathMain]} render={(props) => (<ListView {...props} navItems={this.permissions} />)} />,
      </Switch>
    )
    this.SearchSwitch = (<Switch>
      <Route path={this.basePathMain + "/linkedAccounts"} render={(props) => (<SearchBarConstructor {...props} searchType={"linkedAccounts"} placeHolder={"Search Accounts"} callback={() => { }} />)} />
      <Route path={[this.basePathMain, this.basePathMain + "/permissions"]} render={(props) => (<SearchBarConstructor {...props} searchType={"permissions"} placeHolder={"Search Permissions"} callback={() => { }} />)} />
   </Switch>)

    this.resizeCallback = (isSmallScreen: boolean) => {
      // console.log(isSmallScreen);
      if (isSmallScreen) {
        this.setState({
          leftViewIsExact: true,
          leftViewPath: ["" + this.basePathMain + "", "" + this.basePathMain + "/:random"]
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
export default PermissionsPage;