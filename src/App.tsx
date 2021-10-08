import axios from 'axios';
import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import './App.scss';
import Dashboard from './components/Dashboard/Dashboard';
import NavigationMain from './components/NavigationMain/NavigationMain';
import UserContext from './Contexts/UserContext';
import FoodsPage from './components/FoodsPage/FoodsPage';
import PermissionsPage from './components/PermissionsPage/PermissionsPage';
import OrdersPage from './components/OrdersPage/OrdersPage';
import FinancePage from './components/FinancePage/FinancePage';
import DeliveriesPage from './components/DeliveriesPage/DeliveriesPage';
import MenusPage from './components/MenusPage/MenusPage';
import AnalyticsPage from './components/AnalyticsPage/AnalyticsPage';
import SettingsPage from './components/SettingsPage/SettingsPage';
import GiftCardsPage from './components/GiftCardsPage/GiftCardsPage';
import { Firestore } from 'firebase/firestore';
import UserDashboard from './components/UserDashboard/UserDashboard';
import UserFinancesPage from './components/UserFinancesPage/UserFinancesPage';

interface Props {
}

interface State {
  isDarkMode: boolean;
  sideBarState?: SIDEBAR_STATES;
  marginLeft?: string;
  backgroundDisplay?: Boolean
  redirect?: any;
  leftWidth?: any;
}
enum SIDEBAR_STATES {
  EXPANDED, COLLAPSED
}
class App extends Component<Props, State> {
  static contextType = UserContext;
  context!: React.ContextType<typeof UserContext>;
  NavRef: any = React.createRef();
  num: number = 0;
  constructor(props: Props) {
    super(props);
    axios.defaults.withCredentials = true;
    this.state = {
      isDarkMode: true,
      sideBarState: SIDEBAR_STATES.EXPANDED,
      backgroundDisplay: false,
    };
  }
  // Get a list of cities from your database
  getCities(db: Firestore) {                       
    // const citiesCol = collection(db, "users");
    // getDocs(citiesCol).then((value: QuerySnapshot<DocumentData>) => {
    //   value.docs.forEach((value: QueryDocumentSnapshot<DocumentData>, index: number, array: QueryDocumentSnapshot<DocumentData>[]) => {
    //     console.log('====================================');
    //     console.log(value.data());
    //     console.log('====================================');
    //   });
    // })
    //   .catch((reason) => {
    //     console.log('====================================');
    //     console.log(reason);
    //     console.log('====================================');
    //   });
  }

  darkModeSwitch = () => {
    this.getCities(this.context.firebaseConnect.firestore);
    if (this.context.getTheme(this) === "dark") {
      this.context.setTheme("light");
    } else {
      this.context.setTheme("dark");
    }

    this.setState({
      isDarkMode: (this.context.getTheme(this) === "dark" ? true : false),
    })
  }


  toggleSideView: Function = () => {
    var a = false;
    if (window.innerWidth < 992) {
      a = true;
    } else {
      a = false;
    }
    if (this.state.sideBarState === SIDEBAR_STATES.EXPANDED) {
      this.setState({
        sideBarState: SIDEBAR_STATES.COLLAPSED,
        marginLeft: this.NavRef.current.clientWidth ? ("-" + (this.NavRef.current.clientWidth) + "px") : "0px",
        backgroundDisplay: false,
      });
    } else {
      this.setState({
        sideBarState: SIDEBAR_STATES.EXPANDED,
        marginLeft: "0px",
        backgroundDisplay: a
      });
    }
  }

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>) {
    // console.log("next state: " + nextState.isDarkMode);
    if (nextState.isDarkMode !== this.state.isDarkMode) {
      return true;
    }
    return true;
  }

  componentDidMount() {
    this.setState({
      isDarkMode: this.context.getTheme(this) === "dark" ? true : false,
      sideBarState: SIDEBAR_STATES.EXPANDED,
      marginLeft: this.resizeSetter(),
      backgroundDisplay: false,
    });
    this.resizeHandler();
    this.context.cookies.addChangeListener(() => {
      if (this.context.cookies.get("theme")) {
        this.setState({
          isDarkMode: (this.context.cookies.get("theme") === "dark" ? true : false)
        });
      }
    });

    // this.context.isLoggedIn(this);

    window.addEventListener('resize', this.resizeHandler);
  }
  componentWillUnmount() {
    // this.context.cookies.removeChangeListener(()=>{});
    this.context.cookies.removeChangeListener(() => { })
  }
  resizeSetter = (): string => {
    if (this.state.sideBarState === SIDEBAR_STATES.EXPANDED) {
      return "0px";
    } else {
      return "-" + (this.NavRef.current.clientWidth + this.num) + "px";
    }
  }
  resizeHandler = () => {
    var a = false;
    if (window.innerWidth < 992) {
      a = true;
    } else {
      a = false;
    }
    if (this.state.sideBarState === SIDEBAR_STATES.EXPANDED) {
      this.setState({
        sideBarState: SIDEBAR_STATES.EXPANDED,
        marginLeft: "0px",
        backgroundDisplay: a
      });
    } else {
      this.setState({
        sideBarState: SIDEBAR_STATES.COLLAPSED,
        marginLeft: (this.NavRef.current.clientWidth !== null) ? ("-" + (this.NavRef.current.clientWidth + this.num) + "px") : "0px",
        backgroundDisplay: false
      });
    }
  }
  darkMode: boolean = true;
  businessPageBaseUrl: string = "/business/:businessId";
  render() {
    return (
      <div className="App" data-theme={this.state.isDarkMode ? "dark" : "light"}>

        <div className="bodyHolderMain" style={{ width: (this.state.sideBarState === SIDEBAR_STATES.COLLAPSED) ? "100vw" : "auto" }}>
          <Switch>
            {/* <Route exact path={[this.businessPageBaseUrl + "/dashboard"]} render={(props: any) => ( <Redirect {...props} to={props.match.url} /> )} /> */}
            {/* <Redirect to={"/myAccount/dashboard"} /> */}
            <Route path={this.businessPageBaseUrl + "/dashboard"} render={(props) => <Dashboard toggleSideView={this.toggleSideView} {...props} />} />
            <Route path={this.businessPageBaseUrl + "/orders"} render={(props) => <OrdersPage toggleSideView={this.toggleSideView} {...props} />} />
            <Route path={this.businessPageBaseUrl + "/finances"} render={(props) => <FinancePage toggleSideView={this.toggleSideView} {...props} />} />
            <Route path={this.businessPageBaseUrl + "/deliveries"} render={(props) => <DeliveriesPage toggleSideView={this.toggleSideView} {...props} />} />
            <Route path={this.businessPageBaseUrl + "/menus"} render={(props) => <MenusPage toggleSideView={this.toggleSideView} {...props} />} />
            <Route path={this.businessPageBaseUrl + "/analytics"} render={(props) => <AnalyticsPage toggleSideView={this.toggleSideView} {...props} />} />
            <Route path={this.businessPageBaseUrl + "/settings"} render={(props) => <SettingsPage toggleSideView={this.toggleSideView} {...props} />} />
            <Route path={this.businessPageBaseUrl + "/giftCards"} render={(props) => <GiftCardsPage toggleSideView={this.toggleSideView} {...props} />} />
            <Route path={this.businessPageBaseUrl + "/products"} render={(props) => <FoodsPage toggleSideView={this.toggleSideView} {...props} />} />
            <Route path={this.businessPageBaseUrl + "/admin_permissions"} render={(props) => <PermissionsPage toggleSideView={this.toggleSideView} {...props} />} />
            <Route path={["/myAccount/dashboard"]} render={(props) => <UserDashboard toggleSideView={this.toggleSideView} {...props} />} />
            <Route path={["/myAccount/finances"]} render={(props) => <UserFinancesPage toggleSideView={this.toggleSideView} {...props} />} />
            <Route exact path={["/myAccount", "/"]} render={(props) => <Redirect {...props} to={"/myAccount/dashboard"} />} />
            <Route exact path={["/business", this.businessPageBaseUrl]}
            render={(props: any) => 
              <Redirect {...props} to={props.match.params.businessId
                ? "/business/" + props.match.params.businessId + "/dashboard" 
              : ():string=>{
              return "/business/getdefaultId/dashboard";
            }} />
            } />
            <Route exact path={"/"} render={(props) => <Redirect {...props} to={"/myAccount/dashboard"} />} />
            {/* <Route path={"/"} render={(props) => <PermissionsPage toggleSideView={this.toggleSideView} {...props} />} /> */}
          </Switch>
        </div>
        <div className={"backgroundExit"} onClick={() => { this.toggleSideView() }} style={{ display: this.state.backgroundDisplay ? "block" : "none", opacity: this.state.backgroundDisplay ? "1" : "0" }}></div>
        <div className="leftMenu" ref={this.NavRef} style={{ maxWidth: "100%", marginLeft: this.state.marginLeft, width: (this.state.sideBarState === SIDEBAR_STATES.COLLAPSED) ? this.NavRef.current.clientWidth + 10 : '' }}>

          <Route path={"/"} render={props => (<NavigationMain DarkModeChanger={this.darkModeSwitch} sideMenuSwitcher={this.toggleSideView}{...props} />)} />


        </div>
        {this.state.redirect ? (<Redirect to={this.state.redirect} />) : ""}
      </div>

    );
  }
}

export default App;
