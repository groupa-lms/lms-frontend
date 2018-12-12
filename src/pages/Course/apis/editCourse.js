import axios from "axios";

export default (courseId, newCourse) => axios
  .patch(`http://localhost:3001/api/courses/${courseId}`,newCourse);