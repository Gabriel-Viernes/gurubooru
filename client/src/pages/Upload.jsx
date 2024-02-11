import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import decode from 'jwt-decode'
import Auth from '../../utils/auth.js'

export default function Upload() {
    let filename = uuid()
    let decoded;
    if(Auth.loggedIn() === false ) {
        window.location.assign('/login')
    } else {
        decoded = decode(localStorage.getItem('id_token'))
    }

    const [userFormData, setUserFormData] = useState({
        username:'',
        password:''
    })
    //const [uploadPicture, { error }] = useMutation(UPLOAD_PICTURE)
    //const [add]

    const handleInputChange = (e) => {
        const { name, value } = e.target
        if(name === 'usernameInput') {
        }
    }

    async function handleFileUpload() {
        console.log('hello')

    }

    return (
            <form className='uploadForm' action='http://localhost:3002' onSubmit={handleFileUpload} method='post' encType='multipart/form-data'>
                <input type='file' id='upload' name='upload'></input>
                <textarea name='tags' value="Enter tags here, with each tag separated by a space. Tags with two words should have an underline between each word (Ex: sunset tail steam_engine)"></textarea>
                <p style={{display: "none"}} value={decoded.data.username}></p>
                <p stype={{display: "none"}} value={filename}></p>
                <button className='submit' value="submit">Upload!</button>
            </form>
    )
}
