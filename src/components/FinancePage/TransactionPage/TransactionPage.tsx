import React, { Component } from 'react';
import styles from './TransactionPage.module.scss';
interface Props{
history?:any;
match?:any;
location?:any;
}
interface State{

}
class TransactionPage extends Component<Props, State> {
  render() {
    return (
      <div className={styles.TransactionPage}>
        <div className={styles.topViewHolder}>
          <img src={process.env.REACT_APP_ENDPOINT + "/profileImage.jpg"} alt={"Business Logo"} />
          <div className={styles.topView} >
            <div className={styles.storeLogoView}>
              <img src={process.env.REACT_APP_ENDPOINT + "/profileImage.jpg"} alt={"Abel Michael"} />
              {/* <h3>Shenis Apparel</h3> */}
            </div>
          </div>
        </div>

        TransactionPage Component
        {this.props.match.params.transactionId}
      </div>
    );
  }
}

export default TransactionPage;
