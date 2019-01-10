import axios from "axios";
import env_path from "../../Env_path";

export default (teacherId) => axios
  .get(`${env_path}/teachers/${teacherId}?filter=%7B%22include%22%3A%5B%22newUsers%22%5D%7D`)
  .then(({ data })=>{
    return data;
});