import { ChangeEvent, useState } from 'react'

function FileUploadSingle() {
    

}

export default function Upload() {
    return (
            <form className='uploadform' action='http://localhost:3002' method='post' encType='multipart/form-data'>
                <input type='file' id='upload' name='upload'></input>
                <button className='submit' value="submit">Upload!</button>
            </form>
    )
}
