import { useState, useEffect } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'


export default function Signup() {
    const [userFormData, setUserFormData] = useState({ username: '', password: ''})
    const [validated] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = event.target
        if(name === 'usernameInput') {
            setUserFormData(userFormData.username + value)
        }
        if(name === 'passwordInput') {
            setUserFormData(userFormData.password + value)
        }
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        const form = event.currentTarget
        if(form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }

        setUserFormData({
            username: '',
            password: ''
        })
    }   
    return (
        <form >
            <h1>Sign up here!</h1>
            <input 
                name="usernameInput" 
                placeholder="username" 
                value={userFormData.username}
                onChange={handleInputChange}>
            </input>
            <input 
                name="passwordInput" 
                placeholder="password" 
                value={userFormData.password} 
                type="password"
                onChange={handleInputChange}>
            </input>
            <button type="submit">Submit</button>
        </form>
    )
}
