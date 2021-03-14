import axios from "axios";

export default axios.create({
  baseURL: "https://lms-seg.herokuapp.com",
});
