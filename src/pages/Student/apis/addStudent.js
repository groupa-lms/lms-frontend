import axios from "axios";

export default (newStudent) => axios
  .post('http://localhost:3001/api/students', newStudent);


// export default (newStudent) => {
//   return axios.post('http://localhost:3001/api/students', newStudent);
// };
