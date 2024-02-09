import { useState, useEffect } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../../utils/mutations'
import Auth from '../../utils/auth'

export default function Signup() {
    const [userFormData, setUserFormData] = useState({ username: '', password: ''})
    const [createUser, {error}] = useMutation(CREATE_USER)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        if(name === 'usernameInput') {
            setUserFormData({username:value, password:userFormData.password})
            console.log(userFormData.username)
        }
        if(name === 'passwordInput') {
            setUserFormData({username:userFormData.username, password:value})
        }
        console.log(userFormData.username, userFormData.password)
    }

    async function handleFormSubmit (event) {
        if(userFormData.username === '' || userFormData.password === '') {

            event.preventDefault()
            event.stopPropagation()
            alert('Please enter a username or password')
            return
        }
        event.preventDefault()
        try {
            console.log(userFormData)
            console.log(userFormData.password)
            const { data } = await createUser ({
                variables: {
                    username: userFormData.username,
                    password: userFormData.password
                }
            })
            console.log(data)
            Auth.login(data.createUser.token)
            window.location.reload()
            alert('Signup successful!')
        } catch (err) {
            alert('There was an error processing your request')
            console.error(err)
        }
        

        setUserFormData({
            username: '',
            password: ''
        })
    }   
    return (
        <form onSubmit={handleFormSubmit}>
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
            <button type='submit'>Submit</button>
        </form>
    )
}
