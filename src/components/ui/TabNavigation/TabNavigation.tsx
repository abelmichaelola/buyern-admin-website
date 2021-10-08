import styles from './TabNavigation.module.scss';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
interface Props {
  children?: any;
}
interface State { }

class TabNavigation extends Component<Props, State> {
  scrollClass:string = "scrollbarHandle";
  render() {
    return (
      <div className={styles.TabNavigation + " " + this.scrollClass}>
        {this.props.children}
      </div>
    );
  }
}
const TabNavigationItem = (props: { link: string, text?: string, }) => {
  return (<NavLink
    to={props.link ? props.link : ""}
    className={styles.Item}
    activeClassName={styles.active}
  >
    {props.text}
  </NavLink>)
}

export default TabNavigation;
export { TabNavigationItem }