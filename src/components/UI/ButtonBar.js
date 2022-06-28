import { Fragment, useState } from "react";

import classes from "./ButtonBar.module.css";

const ButtonBar = (props) => {
  const [number, setNumber] = useState(1);

  let rightNumber = ~~(props.number / 5);
  const leftButtonHandler = () => {
    {
      number > 1 && setNumber(number - 1);
    }
  };

  const rightButtonHandler = () => {
    {
      rightNumber - number > 3 && setNumber(number + 1);
    }
  };

  const numberPassingHandler = (event) => {
    var a = event.target.textContent;
    props.onValueChange(a);
  };

  return (
    <Fragment>
      <section className={classes.row3}>
        <button onClick={leftButtonHandler} className={classes.btn1}>
          {"<"}
        </button>
        {rightNumber > number && (
          <button onClick={numberPassingHandler} className={classes.btn}>
            {number}
          </button>
        )}
        {rightNumber > number && (
          <button
            onClick={numberPassingHandler}
            value={number + 1}
            className={classes.btn}
          >
            {number + 1}
          </button>
        )}
        {rightNumber > number && (
          <button onClick={numberPassingHandler} className={classes.btn}>
            {number + 2}
          </button>
        )}

        {rightNumber - number > 3 && (
          <span className={classes.span}>. . . .</span>
        )}
        {rightNumber - number >= 3 && (
          <button onClick={numberPassingHandler} className={classes.btn}>
            {rightNumber}
          </button>
        )}

        <button onClick={rightButtonHandler} className={classes.btn1}>
          {">"}
        </button>
      </section>
    </Fragment>
  );
};
export default ButtonBar;
