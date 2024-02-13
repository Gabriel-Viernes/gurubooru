import { FIND_ALL_IMAGES, FIND_ONE_TAG } from '../../utils/queries'
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import Header from '../components/Header.jsx'
import { Link } from 'react-router-dom'

export default function Results() {
    let tagKeyCount = 0
    let imageKeyCount = 0
    const [search, setSearch] = useState('')

    document.getElementById('root').style.margin = 0;



    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    urlParams.forEach((i) => {
        setSearch(i)
    })
    if(search != '') {
        var { loading, error, data } = useQuery(FIND_ONE_TAG)
    } else {
        
    }

    if(urlParams.size === 0) {
        <h1>test</h1>
    }

    if(loading) {
        console.log('loading...')
        return <h1>Fetching images...</h1>
    }

    
    const extractTagsFromImages = function(data) {
        let length;
        let tagList = new Map()
        let tagArray = []
        data.findAllImages.length > 50 ? length = 50 : length = data.findAllImages.length
        for(let i = 0; i < length; i++) {
            data.findAllImages[i].tags.forEach((tag) => {
                tagList.set(tag.name,tag.name)
            })
        }
        tagList.forEach((tag) => {
            tagArray.push(tag)
        })
        return tagArray
    }
    const extractedTags = extractTagsFromImages(data)
    //filename path is data.findAllImages[i].filename
    if(data) {
        return (
        <>
            <Header />
            <div className='content-container'>
                <div className='tag-list'>
                    <h4>Tags</h4>
                    {extractedTags.map((tag) => {
                        tagKeyCount++
                        return (
                            <Link key={tagKeyCount}>{tag}</Link>
                        )}
                    )}
                </div>
                <div className='image-section'>
                    {data.findAllImages.map((image) => {
                        imageKeyCount++
                        return (
                            <div key={imageKeyCount} className='image-container'>
                                <Link  to={`http://localhost:3002/${image.filename}`}><img src={`http://localhost:3002/${image.filename}`}></img></Link>
                                <p>{`Score: ${image.score}`}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )

    }
}
