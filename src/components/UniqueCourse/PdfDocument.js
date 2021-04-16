import React,{useContext} from 'react'
import { MediaContext } from '../../context/MediaContext'


const PdfDocument = () => {
    const{mediaUrl}= useContext(MediaContext)
 
    return (
        <div className='lesson-pdf-document'> 
        <iframe src={mediaUrl}
        title="pdf"
        width="100%"
        height="100%"
        allowFullScreen
        />
        </div>
    )
}

export default PdfDocument



