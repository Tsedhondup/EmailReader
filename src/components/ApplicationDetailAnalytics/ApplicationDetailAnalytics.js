import "./ApplicationDetailAnalytics.scss";
const ApplicationDetailAnalytics = (props) => {
  return (
    <article className="analytics">
      <section className="analytics__total-responds">
        <span className="analytics__total-responds--header">
          {props.emails.length > 1 ? "Total responds:" : "Total respond:"}
        </span>
        <span className="analytics__total-responds--value">
          {props.emails.length}
        </span>
      </section>
      <section className="analytics__interviews">
        <p className="analytics__interviews--value">
          {props.interviews.length === 0
            ? "Scheduled interviews: 0"
            : `Scheduled interviews ${props.interviews.length}`}
        </p>
      </section>
    </article>
  );
};
export default ApplicationDetailAnalytics;
