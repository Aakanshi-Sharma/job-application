import { Fragment, useState } from "react";
import Header from "./Header";

import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  const [input, setInput] = useState("");

  const inputValueHandler = (e) => {
    setInput(e.target.value);
  };

  const searchJobHandler = (event) => {
    event.preventDefault();
    props.onGetValue(input);
  };

  return (
    <Fragment>
      <Header />
      <div className={classes.image_section}>
        <form className={classes.form}>
          <div className={classes.sub_form}>
            <input
              onChange={inputValueHandler}
              className={classes.input}
              type="name"
              placeholder="Title, companies, expertise or benefits"
            />
            <div className={classes.button_container}>
              {" "}
              <button onClick={searchJobHandler} className={classes.btn}>
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default MainHeader;
