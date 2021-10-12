import React, { Component } from 'react';
import styles from './UserDashboard.module.scss';
import CardProcess, { CardProcessItem, CARD_STATUS } from './../ui/CardProcess/CardProcess';
import { BiMenu, BiRightArrowAlt, BiUser } from 'react-icons/bi';
import UserContext from '../../Contexts/UserContext';
import User from '../../Models/User';
import logo from '../../assets/logo192.png';
interface Props {
  toggleSideView: Function;
  match?: any;
}
interface State {
  user?: User;
}
class UserDashboard extends Component<Props, State> {
  static contextType = UserContext;
  context!: React.ContextType<typeof UserContext>;
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
      title: "Register A Business"
    },
    {
      link: "/notification/emailVerification",
      status: CARD_STATUS.PROCESSING,
      title: "add a Payout Method"
    },
    {
      link: "/myAccount/Finances",
      status: CARD_STATUS.NORMAL,
      title: "Checkout The Finances Page"
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
      title: "Full Control over"
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
      anchorText: "2Hrs Ago"
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
      subTitle: "...",
      anchorText: "2Hrs Ago"
    },
    {
      link: "/notification/emailVerification",
      status: CARD_STATUS.NORMAL,
      mainTitle: "+ 20 more",
    },
  ];
  constructor(props: Props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    this.setState({
      user: this.context.getUser()
    })
  }
  render() {
    return (
      <div className={styles.UserDashboard + " scrollbarHandle"}>
        <div className={styles.topViewHolder}>
          {
            this.state.user?.coverImage ?
              <img src={this.state.user?.coverImage} alt={this.state.user?.firstName + " " + this.state.user?.lastName + " cover Image"} />
              :
              (
                this.state.user?.coverImage ?
                  <img src={this.state.user?.image} alt={this.state.user?.firstName + " " + this.state.user?.lastName} />
                  : <img src={logo} alt={"Buyern"} style={{ scale: "3" }} />
              )
          }
          <div className={styles.topView} >
            <div className={this.navSwitcher + " " + styles.navSwitcher} onClick={() => { this.props.toggleSideView() }}><BiMenu /></div>
            <div className={styles.storeLogoView}>
              {
                this.state.user?.image ?
                  <img src={"http://localhost/profileImage.jpg"} alt={"Abel Michael"} />
                  :
                  <BiUser />
              }
              {/* <h3>Shenis Apparel</h3> */}
            </div>
          </div>
        </div>
        {/* <div className={styles.TitleHolder}><BiBullseye /></div> */}
        <div className={styles.CardHolder + " " + styles.col3}>
          <div className={this.cardStyle + " " + styles.cashCard}>
            <div className={styles.cashCardTitle}><BiRightArrowAlt /> ₦20,000.00</div>

            <div className={styles.cardBody}>
              <div className={styles.cardBodyListItemHolder}>

                <div className={styles.cardBodyListItem}>
                  <div className={styles.icon}>DR</div>
                  <div className={styles.body}>
                    <div className={styles.anchorText}></div>
                    <div className={styles.mainTitle}>Abel Michael Sent you ₦5,000.00</div>
                    <div className={styles.title}></div>
                    <div className={styles.subtitle}>5th June 2021</div>
                  </div>
                  <BiRightArrowAlt />
                </div>

              </div>
            </div>

          </div>
          <CardProcess title={"Status"} cardStatus={CARD_STATUS.COMPLETED} items={this.currentStatItems} />
          <CardProcess title={"Start Here"} cardStatus={CARD_STATUS.NORMAL} items={this.cardItems} />
          <CardProcess title={"New Features"} cardStatus={CARD_STATUS.COMPLETED} items={this.cardItems2} />
          <CardProcess title={"New Orders"} cardStatus={CARD_STATUS.NORMAL} items={this.newOrdersItems} />
          <div className={this.cardStyle}>
            Orders
          </div>
          <div className={this.cardStyle}>Dashboard Component</div>
          <div className={this.cardStyle}>Dashboard Component</div>
        </div>
        <div className={styles.TitleHolder}>Shoperde Eateries</div>
        <div className={styles.CardHolder + " " + styles.col3}>
          <div className={this.cardStyle}>Dashboard Component</div>
          <div className={this.cardStyle}>Dashboard Component</div>
          <div className={this.cardStyle}>Dashboard Component</div>
          <div className={this.cardStyle}>Dashboard Component</div>
          <div className={this.cardStyle}>Dashboard Component</div>
          <div className={this.cardStyle}>Dashboard Component</div>
        </div>
      </div>

    );
  }
}
export default UserDashboard;