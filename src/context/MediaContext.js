import React,{createContext,useState,useEffect} from 'react'

export const MediaContext = createContext()

const MediaContextProvider = (props) => {

    const [videoUrl, setVideoUrl] = useState("")
    const[mediaId , setMediaId] = useState("")
    const[text , setText] = useState("")

    const [mediaType , setMediaType] = useState("")

    const changeVideoUrl=(url)=>{
        setVideoUrl(url)
    } 

    const changeMediaType =(media,id)=>{
        setMediaType(media)
        setMediaId(id)
    }

    const changeText=(text)=>{
       setText(text)
    }



    useEffect(()=>{
    console.log(mediaType)
  
    },[mediaType])

    
    return (
      <MediaContext.Provider value={{videoUrl , mediaType, changeVideoUrl, changeMediaType,mediaId , changeText , text}}>
      {props.children}
      </MediaContext.Provider>
    )
}

export default MediaContextProvider
