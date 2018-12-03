import axios from "axios";

export default (teacherId, newTeacher) => axios
  .patch(`http://localhost:3001/api/teachers/${teacherId}`,newTeacher);