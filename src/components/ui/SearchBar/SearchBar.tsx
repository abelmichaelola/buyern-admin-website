import React, { Component } from 'react';
import { BiRightArrowAlt, BiSearchAlt2 } from 'react-icons/bi';
import styles from './SearchBar.module.scss';
interface Props {
  placeHolder?: string;
  callback?: Function;
  searchType?:string;
}
interface State {

}
class SearchBar extends Component<Props, State> {
  onValueChange: Function = (event: React.ChangeEvent<HTMLInputElement>)=>{
    if (this.props.callback){
      this.props.callback(this.props.searchType, event.currentTarget.value);
    }
  }
  render() {
    return (

      <div className={styles.SearchBar}>
        <div className={styles.searchIcon}>
          <BiSearchAlt2 />
        </div>
        <input placeholder={this.props.placeHolder ? this.props.placeHolder : "Search"} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{this.onValueChange(event)}} />
        <div className={styles.arrowIcon}>
          <BiRightArrowAlt />
        </div>
      </div>

    );
  }
}

export default SearchBar;