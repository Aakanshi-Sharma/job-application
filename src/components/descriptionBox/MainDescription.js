import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import classes from "./MainDescription.module.css";

import { BsArrowLeft, BsClock } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";
import Loading from "../UI/Loading";

const MainDescription = () => {
  const params = useParams();
  const [jobsObject, setJobsObject] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const current = new Date();
  const cd = current.getDate();
  const cm = current.getMonth() + 1;

  const productId = params.productId;
  useEffect(() => {
    const fetchData = async (category) => {
      const response = await fetch(
        `https://remotive.com/api/remote-jobs?search=${category}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong! ");
      }
      const data = await response.json();

      let detailObject = {};

      for (const key in data.jobs) {
        if (data.jobs[key].id == productId) {
          console.log(productId);
          detailObject["company_logo"] = data.jobs[key].company_logo;
          detailObject["company_name"] = data.jobs[key].company_name;
          detailObject["title"] = data.jobs[key].title;
          detailObject["description"] = data.jobs[key].description;
          detailObject["job_type"] = data.jobs[key].job_type;
          detailObject["candidate_required_location"] =
            data.jobs[key].candidate_required_location;
          detailObject["publication_date"] = data.jobs[key].publication_date;
          detailObject["url"] = data.jobs[key].url;
        }
      }
      setJobsObject(detailObject);
      setIsLoading(false);
    };
    fetchData("engineer").catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);
  let descript = jobsObject.description;

  const removeUnderScore = (type) => {
    if (type == "full_time") {
      let a = type[0].toUpperCase();
      let b = type.slice(1, type.length).split("_");
      var j = a + b[0];
      b.shift();
      b.unshift(j);
      var v = b.join(" ");
      return v;
    }
    return type;
  };
  //   console.log(current);
  const days = (date = "01-01-2022-") => {
    const rd = Number(date.slice(8, 10));
    const rm = Number(date.slice(5, 7));
    if (cm - rm > 0) {
      return ` ${cm - rm} month ago`;
    } else {
      return ` ${cd - rd} days ago`;
    }
  };

  let vs;
  const urlHandler = (ab = "www.remotive.com") => {
    vs = ab.slice(0, ab.indexOf(".com") + 4);
    return vs;
  };
  return (
    <Fragment>
      {isLoading && (
        <div className={classes.loading}>
          <Loading />
        </div>
      )}
      {!isLoading && (
        <div className={classes.mainBox}>
          <div className={classes.column1}>
            <Link className={classes.backLink} to="/">
              <div className={classes.back}>
                <BsArrowLeft /> Back to search
              </div>
            </Link>
            <div>
              <div className={classes.greyText}>HOW TO APPLY</div>
              <div className={classes.para}>
                Please email a copy of your resume and visit our website
                <a href="*" className={classes.emailLink}>
                  {" "}
                  {urlHandler(jobsObject.url)}
                </a>
              </div>
            </div>
          </div>
          <div className={classes.column2}>
            <div className={classes.first}>
              <span className={classes.job_title}>{jobsObject.title} </span>
              <span
                className={
                  jobsObject.job_type != "" ? classes.timing : classes.none
                }
              >
                {" "}
                {removeUnderScore(jobsObject.job_type)}
              </span>
            </div>
            <div className={classes.second}>
              <BsClock />
              {days(jobsObject.publication_date)}
            </div>
            <div className={classes.third}>
              <div>
                <img className={classes.logo} src={jobsObject.company_logo} />
              </div>
              <div className={classes.name_place}>
                <div className={classes.company_name}>
                  {jobsObject.company_name}
                </div>
                {jobsObject.candidate_required_location != "" && (
                  <div className={classes.place}>
                    <BiWorld className={classes.biWorld} />{" "}
                    {jobsObject.candidate_required_location}
                  </div>
                )}
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: descript }}
              className={classes.fourth}
            ></div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default MainDescription;
