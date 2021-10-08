import React, { Component } from 'react';
import { BiCheck, BiMenu } from 'react-icons/bi';
import { Redirect, Route, Switch } from 'react-router';
import Button, { BUTTON_TYPES } from '../ui/Button/Button';
import MainTag from '../ui/MainTag/MainTag';
import TabNavigation, { TabNavigationItem } from '../ui/TabNavigation/TabNavigation';
import styles from './OrderPage.module.scss';
interface Props {
  orderId?: string;
  match?: any;
  toggleSideView?:any;
}
interface State {
  sidebarTogglershown?:boolean
}
class OrderPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    if (this.props.match.bashId && !this.props.match.orderId) {
      // getParamsFirstItemId
    }
    if (window.innerWidth < 992) {
      this.state = {
        sidebarTogglershown: true
      }
    } else {
      this.state = {
        sidebarTogglershown: false
      }
    }

  }
  componentDidMount(){
    window.addEventListener('resize', ()=>{
      if(window.innerWidth < 768) {
      this.setState({
        sidebarTogglershown: true
      })
    } else {
      this.setState({
        sidebarTogglershown: false
      })
    }
    });
  }
  cardStyle = "card";
  render() {
    return (
      <div className={styles.OrderPage}>
        <div className={styles.topView}>
          {
            this.state.sidebarTogglershown ?
              <div className={"blockIconButton"} onClick={() => { this.props.toggleSideView() }}><BiMenu /></div>
              : ""
          }
          <div className={styles.view1}>
            <div title={"How long ago was the order made"}>Time Ordered: <div className={styles.valueView}> 20 Mins Ago</div></div>
            <div title={"time left before order is cancelled or transferred to another Seller"}>Time Left:  <div className={styles.valueView}> 30 Mins</div></div>
            <div title={"customer Id"}>Customer Id:  <div className={styles.valueView}> fhaw98q3h4438gth809t54</div></div>
            <div title={"customer rating based on activities on your store"}>Customer Rating:  <div className={styles.valueView}> 96 / 100</div></div>
            <div title={"YOU"}>Attender:  <div className={styles.valueView}> Abel Michael ({this.props.match.params.orderId})</div></div>
            <div title={"YOU"}>Transaction Status:  <div className={styles.valueView}> SUCCESSFUL</div></div>
          </div>
          <div className={styles.priceView}>
            <h3 title={"total cost of order"}>$20,000.00</h3>
          </div>
        </div>
        <div className={"card"} style={{ padding: "0px", margin:"0.5rem 0px 0px 0px"}}>
          <TabNavigation>
            <TabNavigationItem text={"Home"} link={"home"} />
            <TabNavigationItem text={"Delivery"} link={"delivery"} />
            <TabNavigationItem text={"Transaction"} link={"transaction"} />
          </TabNavigation>
        </div>
        <Switch >
          <Route path={"*/home"} component={OrderHomeView} />
          <Route path={"*/delivery"} component={OrderHomeView} />
          <Route path={"*/transaction"} component={OrderHomeView} />
          <Route path={""} render={(props) => (<Redirect to={props.match.url + "/home"} />)} />
        </Switch>
      </div>
    );
  }
}

const OrderItem = (props: { name?: string; price?: { main?: string; currency?: string; }; ischecked?: boolean }) => {
  return (
    <div className={styles.cardHolder}>
      <div className={styles.card1}>
        <div className={styles.itemName}>{props.name ? props.name : "loading"}</div>
        {!props.price?.main ?
          <div className={styles.itemPrice}>????</div>
          :
          <div className={styles.itemPrice}>{props.price?.currency ? props.price?.currency : ""}&nbsp;{props.price?.main}</div>
        }
      </div>
      <div className={styles.card2}>
        <div className={"formItem"}>
          <div className={"checkmarkContainer"}>
            <input type={"checkbox"} id={"email"} defaultChecked={props.ischecked} name={"email"} />
            <div className={"checkmark"}><BiCheck /></div>
            {/* <span>Is Available</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};
const OrderHomeView = () => {
  let cardStyle = "card";
  return (
    <div>
      <div className={cardStyle + " " + styles.bodyMain}>
        <div className={styles.main}>
          <div className={styles.titleMain}>
            <div>*20 Belleful Plates Belleful Plates Belleful Plates</div>
            <div><h3>₦2,000.00</h3></div>
          </div>
          <OrderItem name={"Chinese Rice"} price={{ main: "600.00", currency: "₦" }} />
          <OrderItem name={"Marinated Chicken (2 Laps) (₦250:00)"} price={{ main: "500.00", currency: "₦" }} />
          <OrderItem name={"Ponmo"} price={{ main: "300.00", currency: "₦" }} />
          <OrderItem name={"Pepsi (2 pcs) (₦150.00)"} price={{ main: "300.00", currency: "₦" }} ischecked={true} />
        </div>

        <div className={styles.overall}>
          <div> 20 X</div>
          <div> <Button text={"COMPLETED"} /></div>
        </div>
        <hr />
      </div>
      
      <div className={styles.buttonHolder}>
        <Button text={"Continue"} type={BUTTON_TYPES.PRIMARY} />
        <Button text={"Skip"} />
        <Button text={"CANCEL"} />
      </div>

      <MainTag />
    </div>
  );
};

export default OrderPage;