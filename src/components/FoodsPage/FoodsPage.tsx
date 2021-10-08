import { BiInfoCircle, BiCog, BiPlus } from 'react-icons/bi';
import { Switch, Route } from 'react-router';
import { Redirect, NavLink } from 'react-router-dom';
import OrderBashController from '../../Controllers/OrderBashController';
import OrderBash from '../../Models/OrderBash';
import Product from '../../Models/Product';
import OrderPage from '../OrderPage/OrderPage';
import BashOrdersList from '../OrdersPage/BashOrdersList/BashOrdersList';
import SplitView from '../SplitView/SplitView';
import SplitViewLeftSide, { LeftSideBody, LeftSideTop, SearchBarConstructor } from '../ui/SplitViewTemplateComponent/SplitViewLeftSide/SplitViewLeftSide';
import TabNavigation, { TabNavigationItem } from '../ui/TabNavigation/TabNavigation';
import ProductController from './../../Controllers/ProductController';

class FoodsPage extends SplitView {
  componentDidMount() {
    this.getProducts();
  }
  getProducts = () => {
    let Products: Product[] = new ProductController().getProducts();
    let tabNavItems: any[];
    tabNavItems = [<TabNavigationItem link={this.props.match.url + "/all"} text={"All Items"} key={0} />,
    <TabNavigationItem link={this.props.match.url + "/publicListing"} text={"Public Listing"} key={1} />,
    <TabNavigationItem link={this.props.match.url + "/unavailable"} text={"Out Of Stock"} key={2} />,
    <TabNavigationItem link={this.props.match.url + "/drafts"} text={"Drafts"} key={3} />
    ];
    this.setState({
      tabNav: tabNavItems,
      SearchSwitch: (<Switch>
        <Route path={[this.props.match.url]} render={(props) => (<SearchBarConstructor {...props} searchType={"Products"} placeHolder={"Search All Products"} callback={() => { }} />)} />
      </Switch>),
      LeftListSwitch: (
        <Switch>
          <Route path={"*/all"} component={BashOrdersList} />,
          <Route exact path={"*/products"} render={(props) => (<Redirect to={props.match.url + "/all"} />)} />,
        </Switch>
      )
    })
  }
  render() {
    return (
      <div className={this.splitViewStyles.SplitViewTemplateComponent}>
        <Route exact path={"*/orders/activeOrders"} render={(props) => (<Redirect to={props.match.url + "/bash/allOrders"} />)} />,
        <Route exact={this.state.leftViewIsExact} path={this.state.leftViewPath} render={(props) => (
          <SplitViewLeftSide {...props}>
            <LeftSideTop toggleSideView={this.props.toggleSideView} tabNavigation={<TabNavigation>{this.state.tabNav}</TabNavigation >}>
              {this.state.SearchSwitch}
              <Route path={"*"} render={(props) => (<div className={"blockIconButtonHolder"} style={{ marginTop: "0.5rem" }}>
                <NavLink to={"/newItem"}>
                  <div className={"blockIconButton"} title={"New Item"}><BiPlus /><span>New Item</span></div>
                </NavLink>
                |
                <div className={"blockIconButton"} title={"About"}><BiInfoCircle /><span>About</span></div>
                |
                <div className={"blockIconButton"} title={"Settings"}><BiCog /><span>Settings</span></div>
              </div>)} />

              
            </LeftSideTop>
            <LeftSideBody>
              {this.state.LeftListSwitch}
            </LeftSideBody>
          </SplitViewLeftSide>
        )} />
        <div className={this.splitViewStyles.SplitViewMainBody}>
          <div className={this.scrollStyle + " " + this.splitViewStyles.scrollView} style={{ height: "100vh" }}>
            <Switch>
              <Route exact path={["*/all/:productId", "*/bash/:productId/*"]} render={(props) => (<OrderPage {...props} toggleSideView={this.props.toggleSideView} />)} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}
export default FoodsPage;