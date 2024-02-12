import { FIND_ALL_IMAGES } from '../../utils/queries'
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import Header from '../components/Header.jsx'
import { Link } from 'react-router-dom'

export default function Results() {


    const { loading, error, data } = useQuery(FIND_ALL_IMAGES)
    console.log(data)

    if(loading) {
        return <h1>Fetching images...</h1>
    }

    
    const extractTagsFromImages = function(data) {
        let length;
        let tagList = new Map()
        data.findAllImages.length > 50 ? length = 50 : length = data.findAllImages.length
        for(let i = 0; i < length; i++) {
            data.findAllImages[i].tags.forEach((tag) => {
                tagList.set('tag','tag')
            })
        }
        console.log(tagList)
    }
    extractTagsFromImages(data)

    //filename path is data.findAllImages[i].filename
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    console.log(urlParams.get('tags'))

    return (
        <>
            <Header />
            <div>
                <div className='tagList'>
                </div>
                <div className='image-section'>
                    {data.findAllImages.map((image) => {
                        return (
                            <div className='image-container'>
                                <Link to={`http://localhost:3002/${image.filename}`}><img src={`http://localhost:3002/${image.filename}`}></img></Link>
                                <p>{`Score: ${image.score}`}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
