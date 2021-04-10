import React from 'react'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const Text = ({text}) => {
    return (
        <div className='lesson-text'>
            {ReactHtmlParser(text)}
        </div>
    )
}

export default Text
