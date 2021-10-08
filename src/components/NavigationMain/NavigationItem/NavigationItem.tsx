import styles from './NavigationItem.module.scss';
import React, { Component, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import NavigationSubItem, { NavSubItemData } from '../NavigationSubItem/NavigationSubItem';
import { BiCaretDown, BiCaretRight } from 'react-icons/bi';
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
  navigationSubItems?: NavSubItemData[];
  callback?: Function;
}
interface State {
  wrapTitle?: any;
  isSubMenuOpen?: boolean;
  subNavViews?: any;
  callback: Function;
}
export interface NavItemData {
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
  callback?: Function;
}
class NavigationItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      wrapTitle: props.wrapTitle ? "normal" : "nowrap",
      isSubMenuOpen: false,
      callback: this.props.callback ? this.props.callback : () => { }
    }
    if (!props.navigationSubItems) {
      return;
    }
    this.state = {
      wrapTitle: props.wrapTitle ? "normal" : "nowrap",
      isSubMenuOpen: false,
      callback: this.props.callback ? this.props.callback : () => { },
      subNavViews: props.navigationSubItems ? props.navigationSubItems.map((value: NavSubItemData, index: number) => {
        return <NavigationSubItem {...value} key={index} />
      }) : ""
    };
  }
  changeViewStatus = () => {
    this.setState({
      isSubMenuOpen: this.state.isSubMenuOpen ? false : true
    })
  }
  componentDidMount() {
    if (!this.props.navigationSubItems) {
      return;
    }
  }
  closeNav = () => {
    if (window.innerWidth < 992) {
      this.state.callback();
    }
  }
  render() {
    if (!this.props.navigationSubItems) {
      return (
        <NavLink to={this.props.link} activeClassName={styles.active} onClick={() => { this.closeNav() }}>
            <div className={styles.NavigationItem} title={this.props.title} style={{ padding: this.props.padding }}>
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
    } else {
      return (
        <div className={this.state.isSubMenuOpen ? styles.NavigationItemHolder + " " + styles.isActive : styles.NavigationItemHolder}>
          <div className={styles.NavigationItem} title={this.props.title} style={{ padding: this.props.padding }} onClick={() => { this.changeViewStatus() }}>
            {this.props.icon ? (<div className={styles.startIcon}>{this.props.icon}</div>) : ("")}

            <div className={styles.midView}>
              {this.props.anchorText ? (<div className={styles.subText}>{this.props.anchorText}</div>) : ("")}

              <div className={styles.text} style={{ whiteSpace: this.state.wrapTitle }}>{this.props.title}</div>
              <div className={styles.subText2}>{this.props.subText2}</div>
              <div className={styles.subText}>{this.props.subText}</div>
            </div>
            {
              this.state.isSubMenuOpen ?
                <div className={styles.endIcon}> {this.props.endIcon ? this.props.endIcon : <BiCaretDown />}</div>
                :
                <div className={styles.endIcon}> {this.props.endIcon ? this.props.endIcon : <BiCaretRight />}</div>
            }
          </div>
          {
            this.state.isSubMenuOpen ?
              this.state.subNavViews
              :
              ""
          }
        </div>
      );
    }

  }
}

export default NavigationItem;