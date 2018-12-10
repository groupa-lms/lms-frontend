import axios from "axios";

export default (userId, newUser) => axios
  .patch(`http://localhost:3001/api/NewUsers/${userId}`,newUser);