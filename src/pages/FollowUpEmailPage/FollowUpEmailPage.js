const FollowUpEmailPage = () => {
  return (
    <>
      <h2>New Message</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <input>Recipient</input>
        <subject>SubjectF</subject>
        <textarea>Write your messages</textarea>
        <button>Send</button>
      </form>
    </>
  );
};
export default FollowUpEmailPage;
