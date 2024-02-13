import { FIND_ONE_IMAGE } from '../../utils/queries.js'
import { useQuery } from '@apollo/client'
import Header from '../components/Header.jsx'
import { Link, createSearchParams } from 'react-router-dom'

export default function SingleImage() {
    let tagKeyCount = 0
    let filenameRegex = /([a-z0-9-_.]+)$/gm
    let matched = window.location.href.match(filenameRegex)
    console.log(matched)
    const { loading, error, data } = useQuery(FIND_ONE_IMAGE, {
        variables: {
            filename: `${matched}`
        }
    })


    if(loading) {
        return (
            <h1>Loading...</h1>
        )
    }
    if(error) {
        return (
            <h1>Sorry, an error has occurred</h1>
        )
    }

    console.log(data)
    return (
        <>
            <Header />
            <div className='content-container'>
                <div className='tag-list'>
                    <h4>Tags</h4>
                    {data.findOneImage.tags.map((tag) => {
                        tagKeyCount++
                        return (
                            <Link reloadDocument to={{
                                    pathname:"/results",
                                    search:`?${createSearchParams({
                                        tags: tag.name
                                    })}`
                                }}  key={tagKeyCount}>{tag.name}</Link>
                        )}
                    )}
                </div>
                <img src={`https://gurubooru-image-server-5f422bc852c2.herokuapp.com/${matched}.png`}></img>
            </div>
        </>
    )
}
