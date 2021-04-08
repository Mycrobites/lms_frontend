import React,{createContext,useState} from 'react'

export const MediaContext = createContext()

const MediaContextProvider = (props) => {

    const [videoUrl, setVideoUrl] = useState("")

    const [mediaType , setMediaType] = useState("")

    const changeVideoUrl=(url)=>{
        setVideoUrl(url)
    } 

    const changeMediaType =(media)=>{
        setMediaType(media)
    }

    return (
      <MediaContext.Provider value={{videoUrl , mediaType, changeVideoUrl, changeMediaType}}>
      {props.children}
      </MediaContext.Provider>
    )
}

export default MediaContextProvider
