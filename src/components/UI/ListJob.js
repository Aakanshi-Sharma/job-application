import { Fragment } from "react";

import { BsClock } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";

import classes from "./ListJob.module.css";

const ListJob = (props) => {
  const current = new Date();
  const cd = current.getDate();
  const cm = current.getMonth() + 1;

  const days = (date) => {
    const rd = Number(date.slice(8, 10));
    const rm = Number(date.slice(5, 7));
    if (cm - rm > 0) {
      return `${cm - rm} month ago`;
    } else {
      return `${cd - rd} days ago`;
    }
  };
  return (
    <Fragment>
      <div className={classes.fragment}>
        <li className={classes.list}>
          <div className={classes.logo}>
            <img src={props.company_logo} />
          </div>
          <div className={classes.big_col}>
            <div className={classes.company_name}>{props.company_name}</div>
            <div className={classes.title}>{props.title}</div>
            <div className={classes.second_row}>
              <div
                className={props.job_type != "" ? classes.type : classes.none}
              >
                {props.job_type}
              </div>
              <div className={classes.last_row}>
                <div className={classes.location}>
                  <BiWorld /> {props.candidate_required_location}
                </div>

                <div className={classes.date}>
                  <BsClock /> {days(props.publication_date)}
                </div>
              </div>
            </div>
          </div>
        </li>
      </div>
    </Fragment>
  );
};
export default ListJob;
