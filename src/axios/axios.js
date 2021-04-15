import axios from "axios";

export default axios.create({
  baseURL: "https://lms-seg.herokuapp.com",
});

// new base url : https://lab.progressiveminds.in
// old base url : https://lms-seg.herokuapp.com