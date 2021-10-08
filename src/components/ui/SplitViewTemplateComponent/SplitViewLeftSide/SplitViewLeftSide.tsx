import React, { Component } from 'react';
import { BiMenu } from 'react-icons/bi';
import MainTag from '../../MainTag/MainTag';
import SearchBar from '../../SearchBar/SearchBar';
import styles from './SplitViewLeftSide.module.scss';

interface Props {
  children?: any;
}
interface State {
}
class SplitViewLeftSide extends Component<Props, State> {
  scrollStyle: string = "scrollbarHandle";

  render() {
    return (
      <div className={styles.SplitViewLeftSide + " " + this.scrollStyle}>
        {this.props.children}
      </div>
    );
  }
}
interface TopProps {
  toggleSideView: Function;
  tabNavigation?: any;
  children:any;
}
interface TopState {
  sidebarTogglerView?: any;
}
class LeftSideTop extends Component<TopProps, TopState> {
  constructor(props: TopProps) {
    super(props);
    if (props.toggleSideView) {
      this.state = {
        sidebarTogglerView: (<div className={"blockIconButton"} onClick={() => { this.props.toggleSideView() }}><BiMenu /></div>)
      }
    }
  }

  render() {
    return (
      <div className={styles.topView}>
        <div className={styles.navHolder}>
          {this.state.sidebarTogglerView}
          {this.props.tabNavigation}
        </div>
        {this.props.children}
      </div>
    );
  }
}
const SearchBarConstructor = (props: { placeHolder: string; callback: Function; searchType?: string; }) => {
  return (
    <SearchBar placeHolder={props.placeHolder ? props.placeHolder : "SEARCH"} searchType={props.searchType} callback={props.callback} />
  );
};

class LeftSideBody extends Component {
  scrollStyle: string = "scrollbarHandle";
  render() {
    return (
    <div className={styles.body1Holder + " " + this.scrollStyle}>
      <div className={styles.body1}>
        {this.props.children}
      <MainTag />
      </div>
    </div>
    );
  }
}
export { LeftSideTop, SearchBarConstructor, LeftSideBody }
export default SplitViewLeftSide;