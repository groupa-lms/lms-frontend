import axios from "axios";

export default newStudent =>
  axios
    .post("https://lms-backend-new.herokuapp.com/api/students", newStudent)
    .then(({ data }) => {
      return data;
    });
