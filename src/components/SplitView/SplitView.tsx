import { Component } from 'react';
import splitViewStyles from './SplitView.module.scss';

interface Props {
  toggleSideView?: any;
  match?: any;
}
interface State {
  leftViewIsExact: boolean;
  leftViewPath: string | string[];
  tabNav?: JSX.Element[];
  SearchSwitch?: JSX.Element;
  LeftListSwitch?: JSX.Element;
}
class SplitView extends Component<Props, State> {
  scrollStyle: string = "scrollbarHandle";
  leftViewPathString: string = "";
  splitViewStyles: { readonly [key: string]: string } = splitViewStyles;
  constructor(props: Props) {
    super(props);
    if (window.innerWidth < 769) {
      this.state = {
        leftViewIsExact: true,
        leftViewPath: [this.leftViewPathString]
      }
    } else {
      this.state = {
        leftViewIsExact: false,
        leftViewPath: "*"
      }
    }
  }
  resizeCallback = (isSmall: boolean) => {
    console.log(isSmall);
    if (isSmall) {
      this.setState({
        leftViewIsExact: true,
        leftViewPath: [this.leftViewPathString]
      })
    } else {
      this.setState({
        leftViewIsExact: false,
        leftViewPath: "*"
      })
    }
  }
  handleResize = () => {
    console.log(window.innerWidth);

    if (window.innerWidth > 768) {
      this.resizeCallback(false);
    } else {
      this.resizeCallback(true);
    }
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

}
export default SplitView;
