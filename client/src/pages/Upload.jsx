import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { v4 as uuid } from 'uuid'
import decode from 'jwt-decode'
import Auth from '../../utils/auth.js'
import { CREATE_IMAGE } from '../../utils/mutations.js'

export default function Upload() {
    let filename = uuid()
    let decoded;
    if(Auth.loggedIn() === false ) {
        window.location.assign('/login')
    } else {
        decoded = decode(localStorage.getItem('id_token'))
    }

    const [createImage, { error }] = useMutation(CREATE_IMAGE)
    //const [add]

    const handleInputChange = (e) => {
        const { name, value } = e.target
        if(name === 'usernameInput') {
        }
    }

    async function handleFileUpload() {
        const { data } = await createImage({
            variables: {
                filename: filename,
                uploader: decoded.data._id
            }
        })

    }

    return (
            <form className='uploadForm' onSubmit={handleFileUpload}  action='http://localhost:3002' method='post' encType='multipart/form-data'>
                <textarea name='tags' value="Enter tags here, with each tag separated by a space. Tags with two words should have an underline between each word (Ex: sunset tail steam_engine)"></textarea>
                <input name='filename' style={{display: "none"}} value={filename}></input>
                <input type='file' id='upload' name='upload'></input>
                <button className='submit' value="submit">Upload!</button>
            </form>
    )
}
