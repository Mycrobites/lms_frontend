import React, { createContext, useState, useEffect } from "react";

export const MediaContext = createContext();

const MediaContextProvider = (props) => {
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaId, setMediaId] = useState("");
  const [text, setText] = useState("");

  const [mediaType, setMediaType] = useState("");

  const changeMediaUrl = (url) => {
    setMediaUrl(url);
  };

  const changeMediaType = (media, id) => {
    setMediaType(media);
    setMediaId(id);
  };

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
        text,
      }}
    >
      {props.children}
    </MediaContext.Provider>
  );
};

export default MediaContextProvider;
