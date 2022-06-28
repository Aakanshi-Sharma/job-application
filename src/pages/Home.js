import { Fragment, useState } from "react";
import MainHeader from "../components/Layout/MainHeader";
import JobList from "../components/UI/JobList";

const Home = () => {
  const [input, setInput] = useState("engineer");
  return (
    <Fragment>
      <MainHeader onGetValue={setInput} />
      <JobList category={input} />
    </Fragment>
  );
};
export default Home;
