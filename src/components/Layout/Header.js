import classes from "./Header.module.css";
const Header = () => {
  return (
    <div className={classes.header}>
      <h1>
        <span className={classes.bold}>Github </span>
        <span className={classes.normal}>Jobs</span>
      </h1>
    </div>
  );
};
export default Header;
