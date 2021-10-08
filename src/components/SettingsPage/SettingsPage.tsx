import { BiBriefcaseAlt, BiCloud, BiLockAlt, BiUser } from 'react-icons/bi';
import { Switch, Route } from 'react-router';
import { NavItemData } from '../NavigationMain/NavigationItem/NavigationItem';
import OrderPage from '../OrderPage/OrderPage';
import ListView from '../ui/ListView/ListView';
import { SearchBarConstructor } from '../ui/SplitViewTemplateComponent/SplitViewLeftSide/SplitViewLeftSide';
import { SplitViewTemplateComponent } from '../ui/SplitViewTemplateComponent/SplitViewTemplateComponent';
import TabNavigation, { TabNavigationItem } from '../ui/TabNavigation/TabNavigation';
// import styles from '." + this.basePathMain + "Page.module.scss';

class SettingsPage extends SplitViewTemplateComponent {
  settingsList: NavItemData[] = [];
  basePathMain: string = "/settings";
  basePath: string = "/settings";
  constructor(props: any) {
    super(props);

    this.tabNav = (
      <TabNavigation>
        <TabNavigationItem link={this.props.match.url + "/home"} text={"Settings"} />
      </TabNavigation>
    );
    this.mainPageSwitch =
      (<Switch>
        <Route path={"*"} component={OrderPage} />
      </Switch>
      );
    this.LeftListSwitch = (
      <Route path={"*"} render={(props) => (<ListView {...props} navItems={this.settingsList} />)} />
    )
    this.SearchSwitch = (
      <Route path={["/", this.basePathMain + "/home"]} render={(props) => (<SearchBarConstructor {...props} searchType={"Settings"} placeHolder={"Search Settings"} callback={() => { }} />)} />)
    this.settingsList = [
      {
        title: "Restore Settings",
        wrapTitle: true,
        link: this.basePath + "/restoreSettings",
        isActive: true,
      },
      {
        title: "Profile",
        subText: "Name, DOB, History, ...",
        endIcon: <BiUser fontSize={"1.5rem"} />,
        wrapTitle: true,
        link: this.basePath + "/profile",
        isActive: true,
      },
      {
        title: "Privacy",
        subText: "...",
        endIcon: <BiLockAlt fontSize={"1.5rem"} />,
        wrapTitle: true,
        link: this.basePath + "/privacy",
        isActive: true,
      },
      {
        title: "Business",
        subText: "View, Edit, Save Data, ...",
        endIcon: <BiBriefcaseAlt fontSize={"1.5rem"} />,
        wrapTitle: true,
        link: this.basePath + "/theme",
        isActive: true,
      },
      {
        title: "Back Ups",
        subText: "Store Backup, Settings Backup, Theme Backup, Sales Backup, analytics backup ...",
        endIcon: <BiCloud fontSize={"1.5rem"} />,
        wrapTitle: true,
        link: this.basePath + "/backups",
        isActive: true,
      }
    ];
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
export default SettingsPage;