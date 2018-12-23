import axios from "axios";

export default (userId, newUser) => axios
  .patch(`http://lms-backend-new.herokuapp.com/api/NewUsers/${userId}`,newUser);