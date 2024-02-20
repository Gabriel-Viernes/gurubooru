import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { v4 as uuid } from 'uuid'
import decode from 'jwt-decode'
import Auth from '../../utils/auth.js'
import { CREATE_IMAGE } from '../../utils/mutations.js'
import current from '../../utils/environmentUrlResolver.js'




export default function Upload() {

    
    document.getElementById('root').style.margin = 'auto';


    let decoded;
    if(Auth.loggedIn() === false ) {
        window.location.assign('/login')
    } else {
        decoded = decode(localStorage.getItem('id_token'))
    }

    const [tags, setTags] = useState('')
    const [mimetype, setMimetype] = useState('')
    const [disableButton, setDisableButton] = useState(true)
    const [filename, setFilename] = useState(uuid())

    const [createImage, { error }] = useMutation(CREATE_IMAGE)
    //const [add]

    let mimetypeRegex = /(.png|.jpg|.gif|.webm)/

    const handleInputChange = (e) => {
        const { name, value } = e.target
        if(name === "tagsInput") {
            setTags(value)
        }
        if(name === "upload") {
            let matchArray = value.match(mimetypeRegex)
            if(matchArray === null) {
                setDisableButton(true)
                alert('Invalid filetype detected, please upload only png, jpg, or gif')
            } else {
                setMimetype(matchArray[0])
                setDisableButton(false)
            }

        }
    }

    async function handleFileUpload() {
        const { data } = await createImage({
            variables: {
                filename: `${filename}`,
                uploader: decoded.data._id,
                tags: `* ${tags}`,
                mimetype: `${mimetype}`
            }
        })

    }

    //it is abosulutely necessary that the file upload input remains at the bottom of the form. Do not change it!

    return (
        <>
            <h1>Upload Images here!</h1>
            <form className='uploadForm' onSubmit={handleFileUpload}  action={current.imageServerUrl} method='post' encType='multipart/form-data'>
                <textarea onChange={handleInputChange} name='tagsInput' value={tags} placeholder="Enter tags here, with each tag separated by a space. Tags with two words should have an underline between each word (Ex: sunset tail steam_engine)"></textarea>
                <input name='filename' style={{display: "none"}} value={filename} readOnly></input>
                <input onChange={handleInputChange} type='file' id='upload' name='upload'></input>
                <button disabled={disableButton} className='submit' value="submit">Upload!</button>
            </form>
        </>
    )
}
