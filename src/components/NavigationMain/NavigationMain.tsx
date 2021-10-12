import React, { Component } from 'react';
import styles from './NavigationMain.module.scss';
import { BiUser, BiBulb, BiStoreAlt, BiHomeAlt, BiListUl, BiMoney, BiLockAlt, BiBus, BiCake, BiListOl, BiChart, BiCog, BiFoodTag, BiPlus, BiMinus, BiRefresh } from 'react-icons/bi';
import { Link, Route, Switch } from 'react-router-dom';
import MainTag from '../ui/MainTag/MainTag';
import User from '../../Models/User';
import BusinessRegisterationPage from '../BusinessRegisterationPage/BusinessRegisterationPage';
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';
import NavigationItem from './NavigationItem/NavigationItem';
import UserContext from '../../Contexts/UserContext';
interface Props {
  DarkModeChanger: Function;
  sideMenuSwitcher: Function;
  match?: any;
  history?: any;
}
interface State {
  isDarkMode?: boolean;
  user?: User;
  isSignedIn?: boolean;
}
class NavigationMain extends Component<Props, State> {
  static contextType = UserContext;
  context!: React.ContextType<typeof UserContext>;
  constructor(props: Props) {
    super(props);
    this.state = {
      user: {},
      isSignedIn: false
    };
  }
  componentDidMount() {
    this.setState({
      user: (this.context.getUser()),
    })
    // this.context.cookies.addChangeListener(() => {
    //   this.setState({
    //     user: this.context.getUser(DataSource.LOCAL),
    //     // isSignedIn: this.context.isLoggedIn(this)
    //   })
    // });
  }
  componentWillUnmount() {
    this.context.cookies.removeChangeListener(() => { });
  }
  logout = (event: any) => {
    event.preventDefault();
    this.context.SignOut();
  }

  handleOnClick: Function | undefined = () => {
  };
  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any) {
    return true;
  }

  switchMode = () => {

  }

  render() {
    return (
      <div className={styles.NavigationMain + " scrollbarHandle"}>
        <div className={styles.blockIconButtonHolder}>
          |
          <div className={styles.blockIconButton} title={"Change Account"}><BiRefresh />{/*<span>Help</span>*/}</div>
          |
          <div className={styles.blockIconButton} title={"Theme"} onClick={() => { this.props.DarkModeChanger() }}><BiBulb /> </div>
          |
          {/* {this.context.isLoggedIn(this) ?
            (
              <div className={styles.blockIconButton} title={"Sign Out"} onClick={this.logout}><FaSignOutAlt /></div>
            )
            :
            (
              <NavLink to={"signin"} >
                <div className={styles.blockIconButton} title={"Sign In"}><FaSignInAlt /><span>Sign In</span></div>
              </NavLink>
            )} */}

        </div>
        <hr />
        <Switch>
          {this.state.user?
          <Route path={"/myAccount"} render={props => (<NavigationUserTopView {...props} user={this.state.user} />)} />
          :
          ""
          }
          <Route path={"/business"} render={props => (<NavigationBusinessTopView {...props} />)} />
        </Switch>

        {this.state.user ? <hr /> : "" }
       
        <Switch>
          <Route path={"/myAccount"} render={props => (<UserNavigations {...props} />)} />
          <Route path={["/business", "/"]} render={props => (<BusinessNavigations {...props} sideMenuSwitcher={this.props.sideMenuSwitcher} />)} />
        </Switch>


        <Switch>
          <Route path={"*/signin"} component={LoginPage} exact />
          <Route path={"/registerAdmin"} component={SignupPage} exact />
          <Route path={"*/registerBusiness"} component={BusinessRegisterationPage} exact />
        </Switch>
      </div>
    );
  }
}

const NavigationBusinessTopView = (props: any) => {
  return (
    <Link to={'/business'} about={"business button"} >

      <div className={styles.topView}>
        {/* <div className={styles.logoHolder}> <img src={logo} alt={"store logo"} /></div> */}

        {/* <div className={styles.midView}>
          <div className={styles.text}>{"Register Business"}</div>
          <div className={styles.subText}>{"click Here"}</div>
        </div> */}
        {/* <div className={styles.text}></div> */}
        <div className={styles.midView}>
          <div className={styles.text}>{"Shoperde Eateries"}</div>
          <div className={styles.subText}>{"Account Manager"}</div>
        </div>
        <div className={styles.endIcon}> <BiFoodTag /></div>
      </div>

    </Link>
  );
};
const NavigationUserTopView = (props: { user?: User },) => {
  return (
    <div className={styles.topView}>
      {/* <div className={styles.logoHolder}> <img src={"http://localhost/profileImage.jpg"} alt={"store logo"} /></div> */}
      <div className={styles.logoHolder}>
        {
          props.user?.image ?
            <img src={props.user?.image} alt={"store logo"} />
            :
            <BiUser />
        }
      </div>


      <div className={styles.midView}>
        <div className={styles.text}>
          {
            props.user?.firstName ? props.user?.firstName : ""
          }&nbsp;
          {props.user?.lastName ? props.user?.lastName : ""
          }
        </div>
      </div>
    </div>
  );
};

const UserNavigations = (props: any) => {
  return (
    <div className={styles.navItemsHolder}>
      <NavigationItem
        icon={<BiHomeAlt size={"1.8rem"} />}
        title={"Dashboard"}
        subText={"Overview"}
        link={props.match.path + "/dashboard"}
        isActive={true}
      />
      <NavigationItem
        icon={<BiMoney size={"1.8rem"} />}
        title={"Finance"}
        subText={"..."}
        link={props.match.path + "/finances"}
        isActive={true}
      />
      <div>
        <h3>Businesses</h3>
      </div>
      <NavigationItem
        icon={<BiStoreAlt size={"1.8rem"} />}
        title={"Shoperde Eateries"}
        link={"/business/shoperdeEatriesId"}
        isActive={true}
      />
      <NavigationItem
        icon={<BiFoodTag size={"1.8rem"} />}
        title={"PizzaHut"}
        link={"/business"}
        isActive={true}
      />
      <NavigationItem
        endIcon={<BiPlus size={"1.8rem"} />}
        title={"Register Business"}
        link={"registerBusiness"}
        isActive={true}
      />
      {/* <NavigationItem
            icon={<BiGift size={"1.8rem"} />}
            title={"Gift Cards"}
            subText={"3,764 Cards"}
            link={"/giftCards"}
            isActive={true}
          /> */}
      <MainTag />
    </div>

  );
};
const BusinessNavigations = (props: any) => {
  return (
    <div className={styles.navItemsHolder}>
      <NavigationItem
        icon={<BiHomeAlt size={"1.8rem"} />}
        title={"Dashboard"}
        subText={"Overview"}
        link={props.match.path + "/dgnjtiob/dashboard"}
        isActive={true}
      />
      <NavigationItem
        icon={<BiListUl size={"1.8rem"} />}
        title={"Orders"}
        subText={"2 New Orders"}
        link={props.match.path + "/dgnjtiob/orders"}
        isActive={true}
        navigationSubItems={
          [
            {
              title: "Active Orders",
              link: props.match.path + "/dgnjtiob/orders/activeOrders",
              icon: <BiMinus />,
              callback: props.sideMenuSwitcher,
            },
            {
              title: "All Orders",
              link: props.match.path + "/dgnjtiob/orders/orders",
              icon: <BiMinus />
            },
            {
              title: "History",
              link: props.match.path + "/dgnjtiob/orders/history",
              icon: <BiMinus />
            },
          ]
        }
      />
      <NavigationItem
        icon={<BiCake size={"1.8rem"} />}
        title={"foods"}
        subText={"30 Items"}
        link={props.match.path + "/dgnjtiob/products"}
        isActive={true}
        navigationSubItems={
          [
            {
              title: "All Items",
              link: props.match.path + "/dgnjtiob/products/all",
              icon: <BiMinus />
            },
            {
              title: "Public Listing",
              link: props.match.path + "/dgnjtiob/products/publicListing",
              icon: <BiMinus />
            },
            {
              title: "Out Of Stock",
              link: props.match.path + "/dgnjtiob/products/unavailable",
              icon: <BiMinus />
            },
            {
              title: "Drafts",
              link: props.match.path + "/dgnjtiob/products/drafts",
              icon: <BiMinus />
            },
            {
              title: "Add New",
              link: props.match.path + "/dgnjtiob/products/newItem",
              icon: <BiMinus />
            },
          ]
        }
      />
      <NavigationItem
        icon={<BiListOl size={"1.8rem"} />}
        title={"Menus"}
        subText={"13 Menu"}
        link={props.match.path + "/dgnjtiob/foods/menus"}
        isActive={true}
      />
      <NavigationItem
        icon={<BiMoney size={"1.8rem"} />}
        title={"Finances"}
        subText={"$2,634.84"}
        link={props.match.path + "/dgnjtiob/foods/finances"}
        isActive={true}
        navigationSubItems={
          [
            {
              title: "Transactions",
              link: props.match.path + "/dgnjtiob/finances/transactions",
              icon: <BiMinus />
            },
            {
              title: "Payouts",
              link: props.match.path + "/dgnjtiob/finances/payouts",
              icon: <BiMinus />
            },
            {
              title: "Auto Payouts",
              link: props.match.path + "/dgnjtiob/finances/autoPayout",
              icon: <BiMinus />
            },
            {
              title: "Payout Methods",
              link: props.match.path + "/dgnjtiob/finances/PayoutMethods",
              icon: <BiMinus />
            },
          ]
        }
      />
      <NavigationItem
        icon={<BiLockAlt size={"1.8rem"} />}
        title={"Admin / Permissions"}
        subText={"20 Linked Accounts"}
        link={props.match.path + "/dgnjtiob/admin_permissions"}
        isActive={true}
      />
      <NavigationItem
        icon={<BiBus size={"1.8rem"} />}
        title={"Delivery"}
        subText={"2 Active"}
        link={props.match.path + "/dgnjtiob/delivery"}
        isActive={true}
      />
      <NavigationItem
        icon={<BiChart size={"1.8rem"} />}
        title={"Analytics"}
        subText={"..."}
        link={props.match.path + "/dgnjtiob/analytics"}
        isActive={true}
      />
      {/* <NavigationItem
            icon={<BiPhoneCall size={"1.8rem"} />}
            title={"Contact Us"}
            link={"/contactUs"}
            isActive={true}
          /> */}
      <NavigationItem
        icon={<BiCog size={"1.8rem"} />}
        title={"Settings"}
        link={props.match.path + "/dgnjtiob/settings"}
        isActive={true}
      />
      {/* <NavigationItem
            icon={<BiGift size={"1.8rem"} />}
            title={"Gift Cards"}
            subText={"3,764 Cards"}
            link={"/giftCards"}
            isActive={true}
          /> */}
      <MainTag />
    </div>

  );
};

export default NavigationMain;