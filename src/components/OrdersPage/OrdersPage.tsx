import { Switch, Route, Redirect } from 'react-router';
import OrderPage from '../OrderPage/OrderPage';
import SplitViewLeftSide, { LeftSideBody, LeftSideTop, SearchBarConstructor } from '../ui/SplitViewTemplateComponent/SplitViewLeftSide/SplitViewLeftSide';
import TabNavigation, { TabNavigationItem } from '../ui/TabNavigation/TabNavigation';
import OrderBashController from './../../Controllers/OrderBashController';
import OrderBash from './../../Models/OrderBash';
import BashOrdersList from './BashOrdersList/BashOrdersList';
import styles from './OrdersPage.module.scss';
import { BiInfoCircle, BiCog, BiQuestionMark } from 'react-icons/bi';
import SplitView from './../SplitView/SplitView';

class OrdersPage extends SplitView {
  leftViewPathString: string = "*/bash/:random";
  componentDidMount() {
    this.getBashes();
  }
  getBashes = () => {
    let bashes: OrderBash[] = new OrderBashController().getBashes();
    bashes.unshift(new OrderBash("allOrders", "All"));
    let tabNavItems: any[];
    tabNavItems = bashes.map((bash: OrderBash, index: number) => {
      return <TabNavigationItem link={this.props.match.url + "/activeOrders/bash/" + bash.id} text={bash.bashName} key={index} />
    });
    this.setState({
      tabNav: tabNavItems,
      SearchSwitch: (<Switch>
        <Route path={this.props.match.url + "*/bash"} render={(props) => (<SearchBarConstructor {...props} searchType={"Orders"} placeHolder={"Search Orders"} callback={() => { }} />)} />
        <Route path={[this.props.match.url]} render={(props) => (<SearchBarConstructor {...props} searchType={"Orders"} placeHolder={"Search New Orders"} callback={() => { }} />)} />
      </Switch>),
      LeftListSwitch: (
        <Switch>
          <Route path={"*/bash/:bashId"} component={BashOrdersList} />,
          {/* <Route path={"/"} render={(props) => (<Redirect to={"/bash/etdlghrth"} />)} />, */}
        </Switch>
      )
    })

    // console.log(getBashes);
  }
  render() {
    return (
      <div className={styles.SplitViewTemplateComponent}>
        <Route exact path={"*/orders/activeOrders"} render={(props) => (<Redirect to={props.match.url + "/bash/allOrders"} />)} />
        <Route exact={this.state.leftViewIsExact} path={this.state.leftViewPath} render={(props) => (
          <SplitViewLeftSide {...props}>
            <LeftSideTop toggleSideView={this.props.toggleSideView} tabNavigation={<TabNavigation>{this.state.tabNav}</TabNavigation >}>
              {this.state.SearchSwitch}
              
              <div className={"blockIconButtonHolder"} style={{marginTop:"0.5rem"}}>
              <div className={"blockIconButton"} title={"Help"}><BiQuestionMark /><span>Help</span></div>
              |
                <div className={"blockIconButton"} title={"About"}><BiInfoCircle /><span>About</span></div>
              |
                <div className={"blockIconButton"} title={"Settings"}><BiCog /><span>Settings</span></div>
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
export default OrdersPage;