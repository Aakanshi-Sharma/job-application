import { Fragment } from "react";
import { Link } from "react-router-dom";
import classes from "../components/descriptionBox/MainDescription.module.css";
import { BsArrowLeft } from "react-icons/bs";

const NotFound = () => {
  //   var ldld = new ldLoader({ root: ".ldld" });
  return (
    <Fragment>
      <div className={classes.errorPage}>
        <div className={classes.error}>404</div>
        <div className={classes.no_found}>Page not found</div>
        <Link className={classes.backLink} to="/">
          <div className={classes.back}>
            <BsArrowLeft /> Back to home
          </div>
        </Link>
      </div>
    </Fragment>
  );
};
export default NotFound;
