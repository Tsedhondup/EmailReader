const FollowUpEmailPage = () => {
  return (
    <>
      <h2>New Message</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <input type="text" placeholder="Recipient" />
        <input type="text" placeholder="Subject" />
        <textarea type="text" placeholder="Write your message" />
        <button>Send</button>
      </form>
    </>
  );
};
export default FollowUpEmailPage;
