import React, { Component } from 'react';
import SplitViewLeftSide, { LeftSideBody, LeftSideTop } from './SplitViewLeftSide/SplitViewLeftSide';
import styles from './SplitViewTemplateComponent.module.scss';
import { Route } from 'react-router-dom';
interface Props {
  match?: any;
  redirect?: any;
  toggleSideView: Function;
}
interface State {
  leftViewIsExact: boolean;
  leftViewPath:string | string[];

}
class SplitViewTemplateComponent extends Component<Props, State> {
  scrollStyle: string = "scrollbarHandle";
  fun = () => {
    console.log("aaaaaaaaaaaaaaaaaa");
  }
  tabNav: any;
  mainPageSwitch: any;
  LeftListSwitch: any;
  SearchSwitch: any;
  resizeCallback:Function;
  constructor(props: Props) {
    super(props);
    this.resizeCallback = (isSmallScreen: boolean) => {
      // console.log(isSmallScreen);
      if (isSmallScreen) {
        this.setState({
          leftViewIsExact: true,
          leftViewPath: [this.props.match.path, this.props.match.path + "/:random"]
        })
      } else {
        this.setState({
          leftViewIsExact: false,
          leftViewPath: "*"
        })
      }
    }
    this.state = {
      leftViewIsExact:false,
      leftViewPath: ["*"]
    }
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
  handleResize = () => {
    if (window.innerWidth > 768) {
      this.resizeCallback(false);
    } else {
      this.resizeCallback(true);
      }
    }
    renderLeft = () =>(
      <Route exact={this.state.leftViewIsExact} path={this.state.leftViewPath} render={(props)=>(
        <SplitViewLeftSide {...props}>
          <LeftSideTop toggleSideView={this.props.toggleSideView} tabNavigation={this.tabNav} >
            {this.SearchSwitch}
          </LeftSideTop>
          <LeftSideBody>
            {this.LeftListSwitch}
          </LeftSideBody>

        </SplitViewLeftSide>
      )} />
    )
  render() {
    return (
      <div className={styles.SplitViewTemplateComponent}>
        
        {this.renderLeft()}
        <div className={styles.SplitViewMainBody}>

          <div className={this.scrollStyle + " " + styles.scrollView} style={{ height: "100vh" }}>
            {this.mainPageSwitch}
          </div>
        </div>
      </div>
    );
  }
}
// mainBody
export { SplitViewTemplateComponent };