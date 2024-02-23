import { FIND_ONE_IMAGE } from '../../utils/queries.js'
import { ADD_TAG } from '../../utils/mutations.js'
import { useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'
import Header from '../components/Header.jsx'
import { Link, createSearchParams } from 'react-router-dom'
import current from '../../utils/environmentUrlResolver.js'

export default function SingleImage() {
    let tagKeyCount = 0
    let filenameRegex = /([a-z0-9-_.]+)$/gm
    let matched = window.location.href.match(filenameRegex)
    const [addedTag, setAddedTag] = useState('')
    const [disableButton, setDisableButton] = useState(true)


    const findOneImage = useQuery(FIND_ONE_IMAGE, {
        variables: {
            filename: `${matched}`
        }
    })
    const addTag = useMutation(ADD_TAG)

    const handleInput = function(e) {
        setAddedTag(e.target.value)
        let matched = addedTag.match(/\s/)
        console.log(matched)
        if(matched != null) {
            if(disableButton == false) {
                alert('Please only enter one tag!')
            }
            setDisableButton(true)
        } else {
            setAddedTag(e.target.value)
            setDisableButton(false)
        }
    }

    async function handleAddTag(event) {
        event.preventDefault()
        const { data } = await addTag[0]({
            variables: {
                imageFilename: `${matched}`,
                tagName: addedTag
            }
        })
    }

    if(findOneImage.loading) {
        return (
            <h1>Loading...</h1>
        )
    }
    if(findOneImage.error) {
        return (
            <h1>Sorry, an error has occurred</h1>
        )
    }

    return (
        <>
            <Header />
            <div className='content-container'>
                <div className='tag-list'>
                    <h4>Tags</h4>
                    {findOneImage.data.findOneImage.tags.map((tag) => {
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
                    <form className='addTagForm' onSubmit={handleAddTag} >
                            <input onChange={handleInput} name='tagName' placeholder='Add tag...'></input>
                            <button name='tagSubmit' disabled={disableButton} className='submit' value='tagSubmit'>Add tag</button>
                    </form>
                </div>
                <img src={`${current.imageServerUrl}/${matched}${findOneImage.data.findOneImage.mimetype}`}></img>
            </div>
        </>
    )
}
