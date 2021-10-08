import React, { Component } from 'react';
import styles from './Button.module.scss';
interface Props {
  text?: string;
  startIcon?: any;
  endIcon?: any;
  type?: BUTTON_TYPES;
  onClick?: Function;
  inActive?: boolean;
}
interface State {
  buttonClass?: any;
}
export enum BUTTON_TYPES {
  PRIMARY, SECONDARY, PRIMARY_BORDERED, SECONDARY_BORDERED
}
class Button extends Component<Props, State> {
  buttonClass: any = styles.Button;
  buttonCallback?: any = () => {
    if (this.props.onClick) {
      if (!this.props.inActive) {
        this.props.onClick();
      }
    }
  }
  constructor(props: Props) {
    super(props);
    switch (this.props.type) {
      case BUTTON_TYPES.PRIMARY:
        this.buttonClass += " " + styles.primary;
        break;
      case BUTTON_TYPES.SECONDARY:
        this.buttonClass += " " + styles.secondary;
        break;
      case BUTTON_TYPES.PRIMARY_BORDERED:
        this.buttonClass += " " + styles.primary_bordered;
        break;
      case BUTTON_TYPES.SECONDARY_BORDERED:
        this.buttonClass += " " + styles.secondary_bordered;
        break;
      default:
        this.buttonClass += " " + styles.primary;
        break;

    }

    if (this.props.inActive) {
      this.buttonClass += " " + styles.inactive;
    } else {
      this.buttonClass += " " + styles.active;
    }

    this.state = {
      buttonClass: this.buttonClass
    }
  }

  render() {
    return (
      <div className={this.state.buttonClass} onClick={this.buttonCallback} tabIndex={0}>
        {this.props.startIcon ? (<div className={styles.startIcon}>{this.props.startIcon}</div>) : ("")}
        <div className={styles.text}>{this.props.text}
        </div>
        {this.props.endIcon ? (<div className={styles.endIcon}>{this.props.endIcon}</div>) : ("")}

      </div>
    );
  }
}

export default Button;
