import styles from './OverlayPageView.module.scss';
import React, { Component } from 'react';

interface Props {
  history?:any;
}
interface State {

}
class OverlayPageView extends Component<Props, State> {

  render() {
    return (
      //  onClick={()=>{this.props.history.goBack()}}
      <div className={styles.OverlayPageView}>
        <div className={styles.backgroundExit} onClick={() => { /*this.props.history.goBack() */}}></div>
        <div className={styles.mainView}>
          {this.props.children}

        </div>

        {/* <FullScreenLoaderView /> */}
      </div>
    );
  }
}

export default OverlayPageView;