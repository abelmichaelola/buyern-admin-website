import styles from './NavigationSubItem.module.scss';
import React, { Component, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { BiCaretRight } from 'react-icons/bi';

export interface NavSubItemData {
  title?: string;
  subText?: string;
  subText2?: string;
  wrapTitle?: boolean;
  link: string;
  icon?: any;
  endIcon?: ReactElement;
  anchorText?: string;
  padding?: string;
  isActive?: boolean;
  callback?:Function;
}
interface Props {
  icon?: ReactElement<any, any>;
  title?: string;
  subText?: string;
  subText2?: string;
  anchorText?: string;
  link: string;
  isActive?: boolean;
  endIcon?: ReactElement;
  padding?: string;
  wrapTitle?: boolean;
  navigationSubItems?: NavigationSubItem[];
  callback?: Function;
}
interface State {
  wrapTitle?: any;
  callback: Function;
}
class NavigationSubItem extends Component<Props, State> {
  constructor(props:Props) {
    super(props);
    
    this.state = {
      wrapTitle: props.wrapTitle ? "normal" : "nowrap",
      callback: this.props.callback ? this.props.callback: ()=>{}
    }
  }
  closeNav = ()=>{
    if (window.innerWidth < 992){
      this.state.callback();
    }
  }
  
  render() {
    return (
      <NavLink to={this.props.link} activeClassName={styles.active} onClick={() => { this.closeNav()}}>
        <div className={styles.NavigationSubItem} title={this.props.title} style={{ padding: this.props.padding }}>
              {this.props.icon ? (<div className={styles.startIcon}>{this.props.icon}</div>) : ("")}

              <div className={styles.midView}>
                {this.props.anchorText ? (<div className={styles.subText}>{this.props.anchorText}</div>) : ("")}

                <div className={styles.text} style={{ whiteSpace: this.state.wrapTitle }}>{this.props.title}</div>
                <div className={styles.subText2}>{this.props.subText2}</div>
                <div className={styles.subText}>{this.props.subText}</div>
              </div>
          <div className={styles.endIcon}> {this.props.endIcon ? this.props.endIcon : <BiCaretRight />}</div>
            </div>
          </NavLink>
    );
  }
}

export default NavigationSubItem;
