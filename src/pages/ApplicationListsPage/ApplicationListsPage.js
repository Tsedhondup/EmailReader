import { useState } from "react";
import { Link } from "react-router-dom";
import "./ApplicationListsPage.scss";
const ApplicationListPage = () => {
  const { hasApplication, setHasApplication } = useState(false);

  if (hasApplication) {
    return (
      <article>
        <h1>Job Application Lists</h1>
        <h3>You don't have any job active job application </h3>

        <Link to="addApplication">
          <button>Add application</button>
        </Link>
      </article>
    );
  }
};
export default ApplicationListPage;
