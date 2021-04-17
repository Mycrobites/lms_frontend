import React, { createContext, useState, useEffect } from "react";

export const MediaContext = createContext();

const MediaContextProvider = (props) => {
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaId, setMediaId] = useState("");
  const [text, setText] = useState("");
  const [mediaName , setMediaName] = useState("");
  const [mediaDescription, setMediaDescription] = useState("");
  const [currentCourseId , setCurrentCourseId]= useState(null)

  const [mediaType, setMediaType] = useState("");

  const changeCurrentCourse = (id)=>{
    setCurrentCourseId(id)
  }

  const changeMediaUrl = (url) => {
    setMediaUrl(url);
  };

  const changeMediaType = (media, id) => {
    setMediaType(media);
    setMediaId(id);
  };

  const changeMediaContent = (name , des)=>{
    setMediaName(name)
    setMediaDescription(des)
  }

  const changeText = (text) => {
    setText(text);
  };

  useEffect(() => {
    console.log(mediaType);
  }, [mediaType]);

  return (
    <MediaContext.Provider
      value={{
        mediaUrl,
        mediaType,
        changeMediaUrl,
        changeMediaType,
        mediaId,
        changeText,
        changeMediaContent,
        mediaName,
        mediaDescription,
        currentCourseId,
        changeCurrentCourse,
        text,
      }}
    >
      {props.children}
    </MediaContext.Provider>
  );
};

export default MediaContextProvider;
