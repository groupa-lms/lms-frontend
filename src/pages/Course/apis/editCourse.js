import axios from "axios";

export default (courseId, newCourse) => axios
  .patch(`http://lms-backend-new.herokuapp.com/api/courses/${courseId}`,newCourse);