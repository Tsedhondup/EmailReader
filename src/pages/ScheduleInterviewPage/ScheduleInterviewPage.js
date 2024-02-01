import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const ScheduleInterviewPage = () => {
  // CSS Modules, react-datepicker-cssmodules.css
  // import 'react-datepicker/dist/react-datepicker-cssmodules.css';

  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  );
};
export default ScheduleInterviewPage;
