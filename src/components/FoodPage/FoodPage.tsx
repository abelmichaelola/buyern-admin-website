import Button from '../ui/Button/Button';
import TabNavigation, { TabNavigationItem } from '../ui/TabNavigation/TabNavigation';
import styles from './FoodPage.module.scss';
import { Route } from 'react-router';
import MainTag from '../ui/MainTag/MainTag';
import { BiCheck } from 'react-icons/bi';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import { Switch } from 'react-router-dom';
import MainBodyTemplate from '../MainBodyTemplate/MainBodyTemplate';
class FoodPage extends MainBodyTemplate {
  card = "card";
  render() {
    return (
      <div className={styles.FoodPage}>
        <div className={styles.topView} style={{ backgroundImage: `url("http://localhost/food2.jpg")` }}>
          <div className={styles.topViewMain}>
            <div className={styles.imageHolder}>
            {this.state.sideBarTogglerView}
              <img src={"http://localhost/food2.jpg"} alt={"food"} />
            </div>
            <div className={styles.body}>
              <div className={styles.view1}>

                <h3>Chinese Rice and marinated chicken</h3>
                <h4>Duration: <small>Instant</small></h4>
                <h4>Availability: <small>false</small></h4>
                <h4>Visibility: <small>false</small></h4>
                {/* <h4>Id: <small>{this.props.match.params.foodId}</small></h4> */}
                <h4>Price: <small className={styles.price}>$8,000.00</small></h4>
              </div>
              <div className={styles.view2}>
                <Button text={"Add To Listing"} />
              </div>
            </div>
          </div>
        </div>

        <TabNavigation>
          <TabNavigationItem link={this.props.match.url + "/about"} text={"About"} />
          <TabNavigationItem link={this.props.match.url + "/menu"} text={"Menu"} />
          <TabNavigationItem link={this.props.match.url + "/history"} text={"History"} />
          <TabNavigationItem link={this.props.match.url + "/sales"} text={"Sales"} />
          <TabNavigationItem link={this.props.match.url + "/edit"} text={"Edit"} />
        </TabNavigation>
     <Switch>
          <Route path={"*/about"} component={AboutPage} />
          <Route path={"*/edit"} component={EditPage} />
          <Route path={"/"} component={AboutPage} />
     </Switch>
        <MainTag />
        {/* <Redirect to={this.props.match.url + "/about"} /> */}
      </div>
    );
  }
}

export function EditPage() {
  return (
    <div className={styles.BodyView + " " + styles.editPage}>
      <form>
          <div className={"formItem"}>
            <label><span>*</span> Name: </label>
            <input type={"text"} id={"firstName"} name={"food"} placeholder={"Amala And Ewedu ....."} />
          </div>
          <div className={"formItemsH"}>
            <div className={"formItem " + styles.phoneCode}>
              <label><span>*</span> Currency: </label>
              <select id="phoneCode" name="phoneCode">
                <option value="AF">Dollars</option>
                <option value="AL">Naira</option>
                <option value="DZ">Pounds</option>
                <option value="AS">Cedis</option>
              </select>
            </div>
            <div className={"formItem"}>
              <label><span>*</span> Price: </label>
              <input type={'number'} id={"phone"} name={"phone"} placeholder={"20,000.00"} />
            </div>
        </div>

        <div className={"formItem"}>
          <label><span>*</span> About: </label>
          <textarea id={"dob"} name={"dob"} className={"scrollbarHandle"} placeholder={"Brief detail about meal..."} required={true} />
        </div>

        <div className={"formItem"}>
          <label><span>*</span> Content: </label>
          <textarea id={"dob"} name={"dob"} className={"scrollbarHandle"} placeholder={"Content / ingredents ..."} required={true} />
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
          <input title={"Sign In"} type={"submit"} className={styles.LoginBtn} />
          {/* <input title={"Sign In"} type={"submit"} className={styles.LoginBtn} disabled={this.state.isLoginDisabled} /> */}
        </div>
      </form>

    </div>
  );
}

function AboutPage() {
  var card:string = "card";
  return (
    <div className={styles.BodyView}>
      <div className={card + " " + styles.card}>

        <div className={styles.body}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, sit hic? Illum minima, placeat
          dolores dolorum quaerat aspernatur necessitatibus enim, rem eum accusantium quae recusandae et consectetur
          aperiam facilis ea? Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, sit hic? Illum minima,
          placeat dolores dolorum quaerat aspernatur necessitatibus enim, rem eum accusantium quae recusandae et consectetur
          aperiam facilis ea?
        </div>
      </div>
      <div className={card + " " + styles.card}>

        <h3 className={"title1"}>
          Content
        </h3>
        <div className={styles.body}>
          chicken, broccoli, peanut, oil, yam, Potato, green peas, bread, corn, epo pupa, osan wewe, orange, ireke
          chicken, broccoli, peanut, oil, yam, Potato, green peas, bread, corn, epo pupa, osan wewe, orange, ireke
        </div>
      </div>
      <div className={card + " " + styles.card}>
        <h3 className={"title1"}>
          Allergies
        </h3>
        <div className={styles.body}>
          Avoid if you're allergic to:  <br />
          <b>Onions, nuts</b>
        </div>
      </div>

      <div className={card + " " + styles.card}>
        <h3 className={"title1"}>
          Rating
        </h3>
        <div className={styles.body}>
          <div>
            <div>Lagos, Nigeria: &nbsp;<b>35</b>&nbsp;/ 100</div>
            <div>Ikoyi Lagos, Nigeria: &nbsp;<b>20</b>&nbsp;/ 100</div>
            <div>Ibadan, Oyo: &nbsp;<b>82</b>&nbsp;/ 100</div>
            <div>Alabata, Abeokuta, Ogun State: &nbsp;<b>99</b>&nbsp;/ 100</div>
          </div>
        </div>
      </div>



      <div className={card + " " + styles.card + " " + styles.review}>

        <h3 className={"title1"}>
          Reviews
        </h3>
        <div className={styles.body}>

          <div className={styles.item}>
            <div className={styles.profileImage}>AM</div>
            <div>
              <div className={styles.ratingStar}><FaStar /><FaStar /><FaStar /><FaStarHalf /></div>
              Enjoyed the Food. A little salty though,
              Enjoyed the Food. A little salty though,
              Enjoyed the Food. A little salty though,
              Enjoyed the Food. A little salty though,
              Enjoyed the Food. A little salty though,
              Enjoyed the Food. A little salty though,
            </div>
          </div>
          <hr />
          <div className={styles.item}>
            <div className={styles.profileImage}>AM</div>
            <div>
              <div className={styles.ratingStar}><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
              Enjoyed the Food. A little salty though,
              Enjoyed the Food. A little salty though,
              Enjoyed the Food. A little salty though,
              Enjoyed the Food. A little salty though,
              Enjoyed the Food. A little salty though,
              Enjoyed the Food. A little salty though,
            </div>
          </div>
        </div>
      </div>


    </div>

  );
}

export default FoodPage;