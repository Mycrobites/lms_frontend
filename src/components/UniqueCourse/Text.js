import React from "react";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

const Text = ({ text }) => {
  return <div className="lesson-text">
  <div className='lesson-text-div'>
  {ReactHtmlParser(text)}
  
  </div>
 
  
  </div>;
};

export default Text;
