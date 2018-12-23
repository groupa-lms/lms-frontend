import axios from "axios";

export default newUser =>
  axios.post("https://lms-backend-new.herokuapp.com/api/NewUsers", newUser);
