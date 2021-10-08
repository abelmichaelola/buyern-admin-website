import React, { Component } from 'react';
import { BiErrorAlt, BiInfoCircle, BiLoader } from 'react-icons/bi';
import { setTimeout } from 'timers';
import styles from './QuickNotification.module.scss';
export enum TYPE {
  DANGER, WARNING, NORMAL, LOADING
}
interface Props {
  type?: TYPE;
  callback: Function;
  duration: number;
  title?:string;
  subtitle?:string;
}
interface State {
  style?: any;
  icon?:any;
}

class QuickNotification extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    var style = "";
    var ic = <BiErrorAlt />;

    switch (props.type) {
      case TYPE.DANGER:
        style = styles.danger;
        ic = <BiErrorAlt />;
        break;
      case TYPE.WARNING:
        style = styles.warning;
        ic = <BiInfoCircle />;
        break;
      case TYPE.LOADING:
        style = styles.loading;
        ic = <BiLoader />;
        break;

      default:
        style = styles.normal;
        break;
    }
    
    this.state = {
      style: style,
      icon: ic
    }
    
      setTimeout(() => {
        this.props.callback();
      }, props.duration)
  }

  render() {
    return (
      <div className={styles.QuickNotification} id={"QuickNotif"}>
        <div className={styles.card + " " + this.state.style}>
          <div className={styles.head}>
          </div>
          <div className={styles.body}>
            <div className={styles.image}>
              {/* <img src={"http://localhost/profileImage.jpg"} /> */}
            {this.state.icon}
            </div>
            <div className={styles.midSection}>
              <h3>{this.props.title}</h3>
              <span>{this.props.subtitle}</span>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default QuickNotification;