import { useState } from 'react'


export default function Upload() {

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
            <form className='uploadform' action='http://localhost:3002' onSubmit={handleFileUpload} method='post' encType='multipart/form-data'>
                <input type='file' id='upload' name='upload'></input>
                <button className='submit' value="submit">Upload!</button>
            </form>
    )
}
