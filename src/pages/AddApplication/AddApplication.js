const AddApplication = () => {
  return (
    <>
      <h1>Add job application</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label>Company Name</label>
        <input name="company-name" placeholder="company name"></input>
        <label>Company Name</label>
        <input name="position" placeholder="position"></input>
        <label>Company email</label>
        <input name="contact-email" placeholder="company email"></input>
        <label>Contact Number</label>
        <input name="contact-phone" placeholder=" contact number"></input>
        <section>
          <button>Add</button>
          <button>Cancel</button>
        </section>
      </form>
    </>
  );
};
export default AddApplication;
