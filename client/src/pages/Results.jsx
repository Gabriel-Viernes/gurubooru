import { SEARCH_IMAGES, FIND_ALL_IMAGES, FIND_ONE_TAG } from '../../utils/queries'
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import Header from '../components/Header.jsx'
import { Link, createSearchParams } from 'react-router-dom'
import current from '../../utils/environmentUrlResolver.js'

export default function Results() {
    let tagKeyCount = 0
    let imageKeyCount = 0
    let search = []

    document.getElementById('root').style.margin = 0;
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    urlParams.forEach((i) => {
        search.push(i)
    })
    if(search.length === 0) {
        search.push('*')
    }
    const { loading, error, data } = useQuery(SEARCH_IMAGES, {
        variables: { 
            searchTag: search
        }
    })

    if(loading) {
        return <h1>Fetching images...</h1>
    }
    if(error) {
        return <h1>Error!</h1>
    }
    
    const extractTagsFromImages = function(data) {
        let length;
        let tagList = new Map()
        let tagArray = []
        data.searchImages.length > 50 ? length = 50 : length = data.searchImages.length
        for(let i = 0; i < length; i++) {
            data.searchImages[i].tags.forEach((tag) => {
                tagList.set(tag.name,tag.name)
            })
        }
        tagList.forEach((tag) => {
            tagArray.push(tag)
        })
        return tagArray
    }
    const extractedTags = extractTagsFromImages(data)
    if(data && data.searchImages.length != 0) {
        return (
        <>
            <Header />
            <div className='content-container'>
                <div className='tag-list'>
                    <h4>Tags</h4>
                    {extractedTags.map((tag) => {
                        tagKeyCount++
                        return (
                            <Link reloadDocument to={{
                                    pathname:"",
                                    search:`?${createSearchParams({
                                        tags: tag
                                    })}`
                                }}  key={tagKeyCount}>{tag}</Link>
                        )}
                    )}
                </div>
                <div className='image-section'>
                    {data.searchImages.map((image) => {
                        imageKeyCount++
                        return (
                            <div key={imageKeyCount} className='image-container'>
                                <Link  to={`/results/${image.filename}`}><img src={`${current.imageServerUrl}/${image.filename}${image.mimetype}`}></img></Link>
                                <p>{`Score: ${image.score}`}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
    } else {
        return (
            <>
                <Header />
                <h1>No images found with that tag :(</h1>
            </>
        )
    }
}
