import styles from './MainBodyTemplate.module.scss';
import React, { Component } from 'react';
import { BiMenu } from 'react-icons/bi';
interface Props {
  match?: any;
  toggleSideView?: any;
}
interface State {
  sideBarTogglerView?: any;
}
class MainBodyTemplate extends Component<Props, State> {
  blockIconButton = "blockIconButton";
  sideBarTogglerView = <div className={styles.aligner + " " + this.blockIconButton} onClick={() => { this.props.toggleSideView() }}><BiMenu /></div>
  constructor(props: Props) {
    super(props);
    if (this.props.match.bashId && !this.props.match.orderId) {
      // getParamsFirstItemId
    }
    if (window.innerWidth < 992) {
      this.state = {
        sideBarTogglerView: this.sideBarTogglerView
      }
    } else {
      this.state = {
        sideBarTogglerView: null
      }
    }
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        this.setState({
          sideBarTogglerView: this.sideBarTogglerView
        })
      } else {
        this.setState({
          sideBarTogglerView: undefined
        })
      }
    });
  }
 
}

export default MainBodyTemplate;