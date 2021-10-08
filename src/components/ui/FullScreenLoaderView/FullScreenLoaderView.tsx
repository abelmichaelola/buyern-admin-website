import React, { Component } from 'react';
import { BiLoader } from 'react-icons/bi';
import styles from './FullScreenLoaderView.module.scss';

interface Props {
  history?: any;
  match?: any;
  location?: any;
}
interface State {
}
class FullScreenLoaderView extends Component<Props, State> {
  render() {
    return (
      <div className={styles.FullScreenLoaderView}>
        <div className={styles.backgroundExit} onClick={() => { this.props.history.goBack() }}></div>
        <div className={styles.mainView}>
          <div className={styles.main}>
            <div className={styles.icon}>
            <span>
              <BiLoader />
            </span>
            </div>
            <h1> Logging In ...</h1>
          </div>
          
        </div>
      </div>

    );
  }
}

export default FullScreenLoaderView;
