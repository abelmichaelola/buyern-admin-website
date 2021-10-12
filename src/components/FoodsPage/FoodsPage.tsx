import { Switch, Route, Redirect } from 'react-router';
import SplitViewLeftSide, { LeftSideBody, LeftSideTop, SearchBarConstructor } from '../ui/SplitViewTemplateComponent/SplitViewLeftSide/SplitViewLeftSide';
import TabNavigation, { TabNavigationItem } from '../ui/TabNavigation/TabNavigation';
import styles from './FoodsPage.module.scss';
import { BiInfoCircle, BiCog, BiPlus, BiCheck } from 'react-icons/bi';
import SplitView from './../SplitView/SplitView';
import BashOrdersList from '../OrdersPage/BashOrdersList/BashOrdersList';
import Product from './../../Models/Product';
import ProductController from './../../Controllers/ProductController';
import { NavItemData } from '../NavigationMain/NavigationItem/NavigationItem';
import FoodPage from '../FoodPage/FoodPage';
import AddProductPage from './AddProductPage/AddProductPage';
import { ListDataManager } from '../ui/ListDataManager';

class FoodsPage extends SplitView {
  leftViewPathString: string = "*/products/:random";
  componentDidMount() {
    this.init();
  }
  init = () => {
    let tabNavItems: any[] = [<TabNavigationItem link={this.props.match.url + "/allProducts"} text={"All Products"} key={0} />];
    this.setState({
      tabNav: tabNavItems,
      SearchSwitch: (<Switch>
        <Route path={[this.props.match.url]} render={(props) => (<SearchBarConstructor {...props} searchType={"Products"} placeHolder={"Search Products"} callback={() => { }} />)} />
      </Switch>),
      LeftListSwitch: (
        <Switch>
          <Route path={"*/products/:any"} render={(props) => (<BashOrdersList {...props} listDataManager={new ListDataManager().setListGetter(this.getProducts)} />)} />,
          {/* <Route path={"/"} render={(props) => (<Redirect to={"/bash/etdlghrth"} />)} />, */}
        </Switch>
      )
    })

    // console.log(products);
  }
  getProducts?: any = (callback: Function) => {
    let products: Product[] = new ProductController().getProducts();
    // console.log(products);

    var navItems: NavItemData[] = products.map((value: Product, index: number) => {
      var navItem: NavItemData = {
        anchorText: (value.price?.currency ? value.price?.currency : "") + value.price?.main,
        title: value.name,
        subText: value.id,
        endIcon: <BiCheck fontSize={"1.5rem"} />,
        wrapTitle: true,
        link: value.id ? this.props.match.url + "/allProducts/" + value.id : "",
        isActive: true,
      };
      return navItem;
    })
    callback(navItems, products);
  }
  render() {
    return (
      <div className={styles.SplitViewTemplateComponent}>
        <Route exact path={"*/products"} render={(props) => (<Redirect to={props.match.url + "/allProducts"} />)} />,
        <Route exact={this.state.leftViewIsExact} path={this.state.leftViewPath} render={(props) => (
          <SplitViewLeftSide {...props}>
            <LeftSideTop toggleSideView={this.props.toggleSideView} tabNavigation={<TabNavigation>{this.state.tabNav}</TabNavigation >}>
              {this.state.SearchSwitch}

              <div className={"blockIconButtonHolder"} style={{ marginTop: "0.5rem" }}>
                <div className={"blockIconButton"} title={"Help"}><BiPlus /><span>Add Product</span></div>
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
              <Route exact path={"*/allProducts/:product"} render={(props) => (< Redirect to={props.match.url + "/home"} />)} />
              <Route path={this.props.match.url + "/newItem"} component={AddProductPage} />
              <Route path={"*/item/:foodId"} component={FoodPage} />
              <Route path={"/"} render={(props) => (<FoodPage {...props} toggleSideView={this.props.toggleSideView} />)} /> 
            </Switch>

          </div>
        </div>
      </div>
    )
  }
}
export default FoodsPage;