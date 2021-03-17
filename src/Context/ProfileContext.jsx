import React,{useState,createContext} from 'react'

export const ProfileContext = createContext()


const ProfileContextProvider = (props) => {
const [showProfile ,setShowProfile] = useState(false)

const showProfileCard =()=>{
    setShowProfile(true)
}

const hideProfileCard =()=>{
    setShowProfile(false)
}


    return (
        <ProfileContext.Provider value={{showProfile, showProfileCard , hideProfileCard}}>
        {props.childern}    
        </ProfileContext.Provider>
            
        
    )
}

export default ProfileContextProvider
