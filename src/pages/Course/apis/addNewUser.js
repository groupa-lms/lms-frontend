import axios from "axios";

export default (newUser) => axios
  .post('http://localhost:3001/api/NewUsers', newUser);