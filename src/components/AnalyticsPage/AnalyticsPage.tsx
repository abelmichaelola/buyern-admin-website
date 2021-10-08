import { Switch, Route } from 'react-router';
import { NavItemData } from '../NavigationMain/NavigationItem/NavigationItem';
import OrderPage from '../OrderPage/OrderPage';
import ListView from '../ui/ListView/ListView';
import { SearchBarConstructor } from '../ui/SplitViewTemplateComponent/SplitViewLeftSide/SplitViewLeftSide';
import { SplitViewTemplateComponent } from '../ui/SplitViewTemplateComponent/SplitViewTemplateComponent';
import TabNavigation, { TabNavigationItem } from '../ui/TabNavigation/TabNavigation';
// import styles from '." + this.basePathMain + "Page.module.scss';

class AnalyticsPage extends SplitViewTemplateComponent {
  list1: NavItemData[] = [];
  basePathMain: string = "/analytics";
  basePath: string = "/analytic";
  constructor(props: any) {
    super(props);

    this.tabNav = (
      <TabNavigation>
        <TabNavigationItem link={this.props.match.url + "/Home"} text={"Analytics"} />
      </TabNavigation>
    );
    this.mainPageSwitch =
      (<Switch>
        <Route path={this.props.match.path + "*" + this.basePath + "/:analyicsId"} component={OrderPage} />
      </Switch>
      );
    this.LeftListSwitch = (
        <Route path={[this.basePathMain + "/home", this.basePathMain]} render={(props) => (<ListView {...props} navItems={this.list1} />)} />
    )
    this.SearchSwitch = (<Switch>
      <Route path={[this.basePathMain, this.basePathMain + "/transactions"]} render={(props) => (<SearchBarConstructor {...props} searchType={"Transactions"} placeHolder={"Search Transactions"} callback={() => { }} />)} />
      <Route path={this.basePathMain + "/payouts"} render={(props) => (<SearchBarConstructor {...props} searchType={"Transactions"} placeHolder={"Search Payouts"} callback={() => { }} />)} />
      <Route path={this.basePathMain + "/history"} render={(props) => (<SearchBarConstructor {...props} searchType={"Transactions"} placeHolder={"Search History"} callback={() => { }} />)} />
    </Switch>)
    this.list1 = [
      {
        title: "Orders",
        subText: "View, Edit, Save Data, ...",
        wrapTitle: true,
        link: "" + this.basePath + "/groupId1",
        isActive: true,
      },
      {
        title: "Finances",
        subText: "View, Edit, Save Data, ...",
        wrapTitle: true,
        link: "" + this.basePath + "/groupId2",
        isActive: true,
      },
      {
        title: "Admin/Permissions",
        subText: "Create, Delete, , Edit Permissions, Set Admin, ...",
        wrapTitle: true,
        link: "" + this.basePath + "/grouihouhupId2",
        isActive: true,
      },
      {
        title: "Delivery",
        subText: "Select Delivery Vehicle, Schedule Vehicle, ...",
        wrapTitle: true,
        link: "" + this.basePath + "/grouuhioguhopId2",
        isActive: true,
      },
      {
        title: "Food",
        subText: "View, Edit, Delete, Respond, Edit, Respond, Reject, ...",
        wrapTitle: true,
        link: "" + this.basePath + "/grouuihouhpId2",
        isActive: true,
      },
      {
        title: "Menus",
        subText: "View, Edit, Delete, Reject, Edit, Delete, Respond, ...",
        wrapTitle: true,
        link: "" + this.basePath + "/grhuiohuoupId2",
        isActive: true,
      },
      {
        title: "Analysis",
        subText: "View, Export Data, ...",
        wrapTitle: true,
        link: "" + this.basePath + "/grouihouihupId2",
        isActive: true,
      },
      {
        title: "Settings",
        subText: "Change Settings",
        wrapTitle: true,
        link: "" + this.basePath + "/grogyioupId2",
        isActive: true,
      },
      {
        title: "Gift Cards",
        subText: "Generate GCs, Activate GCs, Deactivate GCs, ...",
        wrapTitle: true,
        link: "" + this.basePath + "/groupgkyuId2",
        isActive: true,
      }
    ]
         
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
export default AnalyticsPage;