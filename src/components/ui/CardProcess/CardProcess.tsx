import styles from './CardProcess.module.scss';
import React, { Component } from 'react';
import { BiLoader, BiCheck, BiRightArrowAlt, BiQuestionMark, BiMinus } from 'react-icons/bi';
export enum CARD_STATUS {
  NORMAL, UNATTENDED, PROCESSING, COMPLETED
}
export interface CardProcessItem {
  status?: CARD_STATUS;
  mainTitle?:string;
  title?: string;
  subTitle?: string;
  link?: string;
  anchorText?:string;
}
interface Props {
  title?: String;
  cardStatus?: CARD_STATUS;
  items?: CardProcessItem[];
  chidren?: any;
}
interface State {
  itemViews?: any[];
  titleView?: any;
}
class CardProcess extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    if (this.props.items) {
      this.state = {
        itemViews: this.props.items?.map((value: CardProcessItem, index: number, array: CardProcessItem[]) => {
          return this.setColorAndIcon((style: string, icon: any): any => {
            return <div className={styles.cardBodyListItem + " " + style} key={index}>
              <div className={styles.icon}>{icon}</div>
              <div className={styles.body}>

                {value.anchorText ? (<div className={styles.anchorText}>
                  {value.anchorText}
                </div>) : ""}
                {value.mainTitle ? (<div className={styles.mainTitle}>
                  {value.mainTitle}
                </div>) : ""}

                {value.title ? (<div className={styles.title}>
                  {value.title}
                </div>) : ""}

                {value.subTitle ? (<div className={styles.subtitle}>
                  {value.subTitle}
                </div>):""}
                
              </div>
            </div>;
          }, value.status)

        }),
        titleView: (
          this.setColorAndIcon((style: string, icon: any): any => {
            return <h2 className={style}><span className={styles.icon}>{icon}</span> {this.props.title}</h2>;
          }, this.props.cardStatus)
        )
      }
    } else {
      this.state = {
        itemViews: []
      }
    }
  }
  setColorAndIcon = (callback: any, status?: CARD_STATUS) => {
    var icon = <BiQuestionMark />;
    var style: string = styles.normal;
    switch (status) {
      case CARD_STATUS.UNATTENDED:
        icon = <BiRightArrowAlt />;
        style = styles.unattended;
        break;
      case CARD_STATUS.PROCESSING:
        icon = <BiLoader />;
        style = styles.processing;
        break;
      case CARD_STATUS.COMPLETED:
        icon = <BiCheck />;
        style = styles.completed;
        break;
      case CARD_STATUS.NORMAL:
        icon = <BiMinus />;
        style = styles.normal;
        break;
      default:
        icon = <BiQuestionMark />;
        style = styles.normal;
        break;
    }
    return callback(style, icon);
  }

  getSnapshotBeforeUpdate() {
    return true;
  }
  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
  }
  render() {
    return (
      <div className={styles.CardProcess}>
        <div className={styles.cardhead}>
          {this.state.titleView}
        </div>
        <div className={styles.cardBody}>
          <div className={styles.cardBodyListItemHolder}>
            {this.state.itemViews !== null ? this.state.itemViews : ""}
          </div>
        </div>
      </div>
    );
  }

  CardProcessConstructor() {

  }
}

export default CardProcess;
