import { useState, useEffect, Fragment } from "react";
import ListJob from "./ListJob";
import ButtonBar from "./ButtonBar";
import List from "../Layout/List";
import classes from "./JobList.module.css";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const JobList = (props) => {
  let searchcategory = props.category;
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [totalElement, setTotalElement] = useState(0);
  const [isNum, setIsNum] = useState(1);
  const [isLocation, setIsLocation] = useState("");
  const [checkedLocation, setCheckedLocation] = useState(false);

  let locationJobs = [];
  let checkedJobs = [];
  let limit = 0;
  let value = 0;

  useEffect(() => {
    const fetchData = async (category) => {
      const response = await fetch(
        `https://remotive.com/api/remote-jobs?search=${category}`
      );
      limit = 5 * isNum;
      value = 5 * (isNum - 1);

      if (!response.ok) {
        throw new Error("Something went wrong! ");
      }

      const data = await response.json();
      console.log(data);

      let loadedJobs = [];

      if (checkedLocation == false) {
        if (isLocation == "") {
          for (const key in data.jobs) {
            if (limit > value) {
              loadedJobs.push({
                company_logo: data.jobs[value].company_logo,
                company_name: data.jobs[value].company_name,
                title: data.jobs[value].title,
                job_type: data.jobs[value].job_type,
                id: data.jobs[value].id,
                candidate_required_location:
                  data.jobs[value].candidate_required_location,
                publication_date: data.jobs[value].publication_date,
              });
              value = value + 1;
            }
          }
          setJobs(loadedJobs);
          setTotalElement(data.jobs.length);
        } else {
          for (const key in data.jobs) {
            if (isLocation === data.jobs[key].candidate_required_location) {
              locationJobs.push({
                company_logo: data.jobs[key].company_logo,

                company_name: data.jobs[key].company_name,
                title: data.jobs[key].title,
                job_type: data.jobs[key].job_type,
                id: data.jobs[key].id,
                candidate_required_location:
                  data.jobs[key].candidate_required_location,
                publication_date: data.jobs[key].publication_date,
              });
            }
          }
          const jobsLoc = locationJobs.slice(value, limit);

          setJobs(jobsLoc);
          setTotalElement(locationJobs.length);
        }
      } else {
        if (isLocation == "") {
          for (const key in data.jobs) {
            if ("full_time" === data.jobs[key].job_type) {
              checkedJobs.push({
                company_logo: data.jobs[key].company_logo,
                company_name: data.jobs[key].company_name,
                title: data.jobs[key].title,
                job_type: data.jobs[key].job_type,
                id: data.jobs[key].id,
                candidate_required_location:
                  data.jobs[key].candidate_required_location,
                publication_date: data.jobs[key].publication_date,
              });
            }
          }
          const checked_jobs = checkedJobs.slice(value, limit);
          setJobs(checked_jobs);
          setTotalElement(checkedJobs.length);
        } else {
          for (const key in data.jobs) {
            if (isLocation === data.jobs[key].candidate_required_location) {
              locationJobs.push({
                company_logo: data.jobs[key].company_logo,

                company_name: data.jobs[key].company_name,
                title: data.jobs[key].title,
                job_type: data.jobs[key].job_type,
                id: data.jobs[key].id,
                candidate_required_location:
                  data.jobs[key].candidate_required_location,
                publication_date: data.jobs[key].publication_date,
              });
            }
          }
          const jobsLoc = locationJobs.slice(value, limit);

          setJobs(jobsLoc);
          setTotalElement(locationJobs.length);
        }
      }

      setIsLoading(false);
    };

    fetchData(searchcategory).catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [isNum, searchcategory, isLocation, checkedLocation]);

  console.log(totalElement);
  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }
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

  const joblist = jobs.map((job) => (
    <Link className={classes.link} to={`/description/${job.id}`}>
      <ListJob
        company_logo={job.company_logo}
        company_name={job.company_name}
        title={job.title}
        job_type={removeUnderScore(job.job_type)}
        id={job.id}
        candidate_required_location={job.candidate_required_location}
        publication_date={job.publication_date}
      />
    </Link>
  ));

  return (
    <Fragment>
      <div className={classes.main_box}>
        <List onChecked={setCheckedLocation} onLocation={setIsLocation} />
        {isLoading && <Loading />}
        {!isLoading && (
          <section className={classes.column2}>
            <ul>{joblist}</ul>
          </section>
        )}
      </div>
      <ButtonBar onValueChange={setIsNum} number={totalElement} />
    </Fragment>
  );
};
export default JobList;
