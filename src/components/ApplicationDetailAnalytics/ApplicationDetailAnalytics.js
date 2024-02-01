const ApplicationDetailAnalytics = (props) => {
  return (
    <article>
      <section className="total-responds">
        <p className="total-responds__header">
          {props.emails.length > 1 ? "Total responds:" : "Total respond:"}
        </p>
        <p className="total-responds__value">{props.emails.length}</p>
      </section>
      <section className="interwievs">
        <p>
          {props.interviews.length === 0
            ? "Scheduled interviews: 0"
            : `Scheduled interviews ${props.interviews.length}`}
        </p>
      </section>
    </article>
  );
};
export default ApplicationDetailAnalytics;
