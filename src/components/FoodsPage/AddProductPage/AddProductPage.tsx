import React, { Component } from 'react';
import { BiCheck } from 'react-icons/bi';
import styles from './AddProductPage.module.scss';

class AddProductPage extends Component {
  title1 = "title1";
  render() {
    return (
      <div className={styles.AddProductPage}>
        <div className={styles.BodyView + " " + styles.editPage}>
          <div className={this.title1 + " " + styles.title}>
            Add Product
          </div>
          <form>
            <div className={this.title1 + " " + styles.title2}>
              Details
            </div>
            <div className={"formItem"}>
              <label><span>*</span> Name: </label>
              <input type={"text"} id={"firstName"} name={"food"} placeholder={"Amala And Ewedu ....."} />
            </div>

            <div className={"formItem"}>
              <label><span>*</span> About: </label>
              <textarea id={"dob"} name={"dob"} className={"scrollbarHandle"} placeholder={"Brief detail about meal..."} required={true} />
            </div>

            <div className={"formItem"}>
              <label><span>*</span> Content: </label>
              <textarea id={"dob"} name={"dob"} className={"scrollbarHandle"} placeholder={"Content / ingredents ..."} required={true} />
            </div>

            <div className={this.title1 + " " + styles.title2}>
              Price
            </div>
            <div className={"formItem " + styles.phoneCode}>
              {/* <label><span>*</span> Price: </label> */}
              <input type={'number'} id={"phone"} name={"phone"} placeholder={"20,000.00"} />
            </div>


            <div className={"formItem"}>
              <div className={"checkmarkContainer"}>
                <input type={"checkbox"} id={"email"} defaultChecked={false} name={"email"} />
                <div className={"checkmark"}><BiCheck /></div>
                <span>Is Available</span>
              </div>
            </div>

            <div className={"formItem"}>
              <div className={"checkmarkContainer"}>
                <input type={"checkbox"} id={"email"} defaultChecked={false} name={"email"} />
                <div className={"checkmark"}><BiCheck /></div>
                <span>Add To Public Listing</span>
              </div>
            </div>

            <div className={"formItem"}>
              <input title={"Add To Draft"} value={"Add To Draft"} type={"submit"} className={styles.LoginBtn} />
              {/* <input title={"Sign In"} type={"submit"} className={styles.LoginBtn} disabled={this.state.isLoginDisabled} /> */}
            </div>
          </form>

        </div>
      </div>
    );
  }
}

export default AddProductPage;
