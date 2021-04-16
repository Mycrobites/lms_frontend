import React,{useContext} from 'react'
import { MediaContext } from '../../context/MediaContext'


const PdfDocument = () => {
    const{videoUrl}= useContext(MediaContext)
 
    return (
        <div className='lesson-pdf-document'> 
        <iframe src={"https://www.escaux.com/rsrc/EscauxCustomerDocs/DRD_T38Support_AdminGuide/T38_TEST_PAGES.pdf"}
        title="pdf"
        width="100%"
        height="100%"
        allowFullScreen
        />
        </div>
    )
}

export default PdfDocument



