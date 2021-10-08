import styles from './Dashboard.module.scss';
import React, { Component } from 'react';
import CardProcess, { CardProcessItem, CARD_STATUS } from './../ui/CardProcess/CardProcess';
import { BiMenu } from 'react-icons/bi';
interface Props{
  toggleSideView:Function;
  match?:any;
}
interface State{

}
class Dashboard extends Component<Props, State> {
  cardStyle: string = "card";
 navSwitcher: string = "blockIconButton";
  cardItems: CardProcessItem[] = [
    {
      link: "/notification/emailVerification",
      status: CARD_STATUS.COMPLETED,
      title: "verify Email"
    },
    {
      link: "/notification/emailVerification",
      status: CARD_STATUS.COMPLETED,
      title: "add Items to your inventory"
    },
    {
      link: "/notification/emailVerification",
      status: CARD_STATUS.PROCESSING,
      title: "add a Payout Method"
    },
    {
      link: "/notification/emailVerification",
      status: CARD_STATUS.NORMAL,
      title: "wait for the Review Process"
    },
    {
      link: "/notification/emailVerification",
      status: CARD_STATUS.NORMAL,
      title: "add all or some items to public Listing"
    },
  ];
  cardItems2: CardProcessItem[] = [
    {
      link: "/notification/emailVerification",
      status: CARD_STATUS.NORMAL,
      title: "can now control multiple accounts at once "
    },
    {
      link: "/notification/emailVerification",
      status: CARD_STATUS.NORMAL,
      title: "View All features at a glance in the Dashboard "
    },
    {
      link: "/notification/emailVerification",
      status: CARD_STATUS.NORMAL,
      title: "Full Control over  "
    },
  ]; 
  currentStatItems: CardProcessItem[] = [
    {
      link: "/notification/emailVerification",
      status: CARD_STATUS.COMPLETED,
      title: "Active"
    }, {
      link: "/notification/emailVerification",
      status: CARD_STATUS.NORMAL,
      title: "20 Items Available in public listing "
    },
    {
      link: "/notification/emailVerification",
      status: CARD_STATUS.NORMAL,
      title: "52 Linked Accounts "
    },
    {
      link: "/notification/emailVerification",
      status: CARD_STATUS.NORMAL,
      title: "Full Control over  "
    },
  ];
  newOrdersItems: CardProcessItem[] = [
    {
      link: "/notification/emailVerification",
      status: CARD_STATUS.COMPLETED,
      mainTitle: "Amala and Ewedu with Coke 150ml",
      subTitle: "completed",
      anchorText:"2Hrs Ago"
    }, {
      link: "/notification/emailVerification",
      status: CARD_STATUS.NORMAL,
      mainTitle: "Amala and Ewedu with Coke 150ml",
      subTitle: "processing",
      anchorText: "2Hrs Ago"
    },
    {
      link: "/notification/emailVerification",
      status: CARD_STATUS.NORMAL,
      mainTitle: "Amala and Ewedu with Coke 150ml",
      subTitle:"...",
      anchorText: "2Hrs Ago"
    },
    {
      link: "/notification/emailVerification",
      status: CARD_STATUS.NORMAL,
      mainTitle: "+ 20 more",
    },
  ];
  render() {
    return (
      <div className={styles.Dashboard + " scrollbarHandle"}>
        <div className={styles.topViewHolder}>
          <img src={process.env.REACT_APP_ENDPOINT + "/food3.jpg"} alt={"Business Logo"} />
          <div className={styles.topView} >
            <div className={this.navSwitcher + " " + styles.navSwitcher} onClick={() => { this.props.toggleSideView() }}><BiMenu /></div>
            <div className={styles.storeLogoView}>
              <img src={process.env.REACT_APP_ENDPOINT + "/profileImage.jpg"} alt={"Business Logo"} />
              <h3>Shenis Apparel</h3>
            </div>
          </div>
        </div>
        {/* <div className={styles.TitleHolder}><BiBullseye /></div> */}
        <div className={styles.CardHolder + " " + styles.col3}>
          <CardProcess title={"Status"} cardStatus={CARD_STATUS.COMPLETED} items={this.currentStatItems} />
          <CardProcess title={"Start Here"} cardStatus={CARD_STATUS.NORMAL} items={this.cardItems} />
          <CardProcess title={"New Features"} cardStatus={CARD_STATUS.COMPLETED} items={this.cardItems2} />
          <CardProcess title={"New Orders"} cardStatus={CARD_STATUS.NORMAL} items={this.newOrdersItems} />
          <div className={this.cardStyle}>
            Orders
          </div>
          <div className={this.cardStyle}>Dashboard Component</div>
          <div className={this.cardStyle}>Dashboard Component</div>
          <div className={this.cardStyle}>Dashboard Component</div>
          <div className={this.cardStyle}>Dashboard Component</div>
        </div>
        <div className={styles.TitleHolder}>Analytics</div>
        <div className={styles.CardHolder + " " + styles.col3}>
          <div className={this.cardStyle}>Dashboard Component</div>
          <div className={this.cardStyle}>Dashboard Component</div>
          <div className={this.cardStyle}>Dashboard Component</div>
          <div className={this.cardStyle}>Dashboard Component</div>
          <div className={this.cardStyle}>Dashboard Component</div>
          <div className={this.cardStyle}>Dashboard Component</div>
        </div>

        <div className={styles.TitleHolder}>Orders</div>
        <div className={styles.CardHolder + " " + styles.col3}>
          <div className={this.cardStyle}>Dashboard Component</div>
          <div className={this.cardStyle}>Dashboard Component</div>
          <div className={this.cardStyle}>Dashboard Component</div>
        </div>

        <div className={styles.TitleHolder}>Finances</div>
        <div className={styles.CardHolder + " " + styles.col1}>
          <div className={this.cardStyle}>Dashboard Component</div>
        </div>

        <div className={styles.TitleHolder}>Admin / Permission</div>
        <div className={styles.CardHolder + " " + styles.col3}>
          <div className={this.cardStyle}>Dashboard Component</div>
          <div className={this.cardStyle}>Dashboard Component</div>
          <div className={this.cardStyle}>Dashboard Component</div>
        </div>

        <div className={styles.TitleHolder}>Gift Cards</div>
        <div className={styles.CardHolder + " " + styles.col3}>
          <div className={this.cardStyle}>Dashboard Component</div>
          <div className={this.cardStyle}>Dashboard Component</div>
          <div className={this.cardStyle}>Dashboard Component</div>
        </div>

        <div className={styles.TitleHolder}>Delivery</div>
        <div className={styles.CardHolder + " " + styles.col2}>
          <div className={this.cardStyle}>Dashboard Component</div>
          <div className={this.cardStyle}>Dashboard Component</div>
        </div>

        <div className={styles.TitleHolder}>Menu / Foods</div>
        <div className={styles.CardHolder + " " + styles.col1}>
          <div className={this.cardStyle}>Dashboard Component</div>
        </div>
      </div>

    );
  }
}
export default Dashboard;
