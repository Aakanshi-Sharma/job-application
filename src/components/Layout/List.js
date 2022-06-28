import { Fragment, useState, useEffect, useRef } from "react";
import classes from "./List.module.css";

const List = (props) => {
  const inputRef = useRef(null);
  const radioRef = useRef("");
  const [inputValue, setInputvalue] = useState(false);
  const [radioButton, setRadioButton] = useState(false);

  const locationHandler = (e) => {
    var b = e.target.value;
    setInputvalue(b);
    if (radioButton) {
    }

    console.log(b);
    props.onLocation(b);
  };

  const radioLocationHandler = (e) => {
    inputRef.current.value = "";

    radioRef.value = e.target.id;
    setRadioButton(true);
    console.log(e.target.id);
    props.onLocation(radioRef.value);
  };
  const checkboxHandler = () => {
    var checkedBox = document.getElementById("full_time");
    props.onChecked(checkedBox.checked);
  };
  return (
    <Fragment>
      <div className={classes.column1}>
        <div className={classes.checkbox}>
          <input
            type="checkbox"
            className={classes.check}
            id="full_time"
            onClick={checkboxHandler}
          />
          <label for="full_time"> Full Time</label>
        </div>
        <div className={classes.row2}>
          <div className={classes.locaHead}>
            LOCATION
            <br />
            <input
              ref={inputRef}
              onChange={locationHandler}
              id="search_bar"
              type="text"
              name="location"
              placeholder="City, state, zip code or country"
            />
          </div>
          <div className={classes.radio}>
            <input
              type="radio"
              name="location"
              id="USA Only"
              onClick={radioLocationHandler}
            />
            <label for="USA Only"> USA Only</label>
          </div>
          <div className={classes.radio}>
            <input
              type="radio"
              name="location"
              id="Poland"
              onClick={radioLocationHandler}
            />
            <label for="Poland"> Poland</label>
          </div>

          <div className={classes.radio}>
            <input
              type="radio"
              name="location"
              id="New York"
              onClick={radioLocationHandler}
            />
            <label for="New York"> New York</label>
          </div>

          <div className={classes.radio}>
            <input
              type="radio"
              name="location"
              id="Berlin"
              onClick={radioLocationHandler}
            />
            <label for="Berlin"> Berlin</label>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default List;
