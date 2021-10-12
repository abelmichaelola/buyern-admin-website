import { Switch, Route, Redirect } from 'react-router';
import OrderPage from '../OrderPage/OrderPage';
import SplitViewLeftSide, { LeftSideBody, LeftSideTop, SearchBarConstructor } from '../ui/SplitViewTemplateComponent/SplitViewLeftSide/SplitViewLeftSide';
import TabNavigation, { TabNavigationItem } from '../ui/TabNavigation/TabNavigation';
import OrderBashController from './../../Controllers/OrderBashController';
import OrderBash from './../../Models/OrderBash';
import BashOrdersList from './../OrdersPage/BashOrdersList/BashOrdersList';
import styles from './UserFinancesPage.module.scss';
import { BiInfoCircle, BiCog, BiQuestionMark, BiCheck } from 'react-icons/bi';
import SplitView from './../SplitView/SplitView';
import { NavLink } from 'react-router-dom';
import { ListDataManager } from '../ui/ListDataManager';
import Transaction from './../../Models/Transaction';
import TransactionController from '../../Controllers/TransactionController';
import { NavItemData } from '../NavigationMain/NavigationItem/NavigationItem';

class UserFinancesPage extends SplitView {
  leftViewPathString: string = "*/finances/:random";
  baseLink = "/myAccount/finances/transactions";
  componentDidMount() {
    this.getBashes();
  }
  getBashes = () => {
    let bashes: OrderBash[] = new OrderBashController().getBashes();
    bashes.unshift(new OrderBash("allOrders", "All"));
    this.setState({
      tabNav: ([
        <TabNavigationItem link={this.props.match.url + "/transactions"} text={"Transactions"} key={0} />,
        <TabNavigationItem link={this.props.match.url + "/payouts"} text={"Payouts"} key={1} />,
        <TabNavigationItem link={this.props.match.url + "/autoPayout"} text={"Auto Payouts"} key={2} />
      ]),
      SearchSwitch: (<Switch>
        <Route path={"*/autoPayout"} render={(props) => (<SearchBarConstructor {...props} searchType={"Orders"} placeHolder={"Search Auto Payouts"} callback={() => { }} />)} />
        <Route path={"*/payouts"} render={(props) => (<SearchBarConstructor {...props} searchType={"Orders"} placeHolder={"Search Payouts"} callback={() => { }} />)} />
        <Route path={[this.props.match.url]} render={(props) => (<SearchBarConstructor {...props} searchType={"Transactions"} placeHolder={"Search Transactions"} callback={() => { }} />)} />
      </Switch>),
      LeftListSwitch: (
        <Switch>
          <Route path={"*/transactions"} render={(props) => (<BashOrdersList {...props} matchPath listDataManager={new ListDataManager().setListGetter(this.getDataSetter(props.match.url))} />)} />,
          <Route path={"*/payouts"} render={(props) => {
            return <BashOrdersList {...props} matchPath listDataManager={new ListDataManager().setListGetter(this.getDataSetter2(props.match.url))} />
          }} />,
          <Route exact path={"*/finances"} render={(props) => (<Redirect to={props.match.url + "/transactions"} />)} />,
        </Switch>
      )
    })
  }
  getDataSetter = (path: String) => {
    var getData: any = (callback: Function) => {
      let transactions: Transaction[] = new TransactionController().getTransactions();
      console.log(path);

      var navItems: NavItemData[] = transactions.map((value: Transaction, index: number) => {
        var navItem: NavItemData = {
          anchorText: value.dateCompleted + " --- " + value.type?.toString(),
          title: value.title,
          subText: value.status?.toString(),
          endIcon: <BiCheck fontSize={"1.5rem"} />,
          wrapTitle: true,
          link: value.id ? value.id : "",
          isActive: true,
        };
        return navItem;
      })
      callback(navItems, transactions);
    }
    return getData;
  }
  getDataSetter2 = (path: String) => {
    var getData: any = (callback: Function) => {
      let transactions: Transaction[] = new TransactionController().getTransactions();
      console.log(path);

      var navItems: NavItemData[] = transactions.map((value: Transaction, index: number) => {
        var navItem: NavItemData = {
          anchorText: value.dateCompleted + " --- " + value.type?.toString(),
          title: value.title,
          subText: value.status?.toString(),
          endIcon: <BiCheck fontSize={"1.5rem"} />,
          wrapTitle: true,
          link: value.id ? value.id : "",
          isActive: true,
        };
        return navItem;
      })
      callback(navItems, transactions);
    }
    return getData;
  }
  

  render() {
    return (
      <div className={styles.SplitViewTemplateComponent}>
        <Route exact path={"*/orders/activeOrders"} render={(props) => (<Redirect to={props.match.url + "/bash/allOrders"} />)} />
        <Route exact={this.state.leftViewIsExact} path={this.state.leftViewPath} render={(props) => (
          <SplitViewLeftSide {...props}>
            <LeftSideTop toggleSideView={this.props.toggleSideView} tabNavigation={<TabNavigation>{this.state.tabNav}</TabNavigation >}>
              {this.state.SearchSwitch}

              <div className={"blockIconButtonHolder"} style={{ marginTop: "0.5rem" }}>
                <NavLink to={this.props.match.url + "/help"} activeClassName={"active"}>
                  <div className={"blockIconButton"} title={"Help"}><BiQuestionMark /><span>Help</span></div>
                </NavLink>
                |
                <NavLink to={this.props.match.url + "/about"} activeClassName={"active"}>
                  <div className={"blockIconButton"} title={"About"}><BiInfoCircle /><span>About</span></div>
                </NavLink>
                |
                <NavLink to={this.props.match.url + "/settings"} activeClassName={"active"}>
                  <div className={"blockIconButton"} title={"Settings"}><BiCog /><span>Settings</span></div>
                </NavLink>
              </div>
            </LeftSideTop>
            <LeftSideBody>
              {this.state.LeftListSwitch}
            </LeftSideBody>
          </SplitViewLeftSide>
        )} />
        <div className={styles.SplitViewMainBody}>
          <div className={this.scrollStyle + " " + styles.scrollView} style={{ height: "100vh" }}>
            <Switch>
              <Route exact path={["*/bash/:bashId/:orderId", "*/bash/:bashId/:orderId/*"]} render={(props) => (<OrderPage {...props} orderId={props.match.params.orderId} toggleSideView={this.props.toggleSideView} />)} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}
export default UserFinancesPage;