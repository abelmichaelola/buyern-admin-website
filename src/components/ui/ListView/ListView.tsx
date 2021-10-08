import styles from './ListView.module.scss';
import React, { Component, ReactElement } from 'react';
import NavigationItem, { NavItemData } from '../../NavigationMain/NavigationItem/NavigationItem';
import MainTag from '../MainTag/MainTag';

interface Props{
  navItems: NavItemData[];
  match?:any;
}
interface State{
NavViews:ReactElement | any;
}
class ListView extends Component<Props, State> {
  constructor(props:Props) {
    super(props);
    this.state = {
      NavViews:[]
    }
  }
  shouldComponentUpdate() {
    return true;
  }
  getSnapshotBeforeUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    if (this.props.match.path !== prevProps.match.path) {
    this.updateState();
    }
    return this.state;
  }
  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {

  }
  updateState = () => {
    this.setState({
      NavViews: this.props.navItems.map((value: NavItemData, index: number, array: NavItemData[]) => {
        return (<NavigationItem
          key={index}
          icon = {value.icon}
          endIcon={value.endIcon}
          title={value.title}
          subText={value.subText}
          subText2 = {value.subText2}
          wrapTitle={value.wrapTitle}
          link={value.link}
          anchorText={value.anchorText}
          // padding={"0.1rem 0.5rem"}
          isActive={true}
        />)
      })
    })
  }
  componentDidMount() {
    this.updateState();
  }
  render() {
    return (
      <div className={styles.ListView}>
        <div className={styles.MenuList}>
          <div className={styles.navItemsHolder}>
            {this.state.NavViews}
            <MainTag />
          </div>


        </div>
      </div>
    );
  }
}
export {ListView as ListViewParent}
export default ListView;