import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../../utils/mutations'
import Auth from '../../utils/auth'
import { Link } from 'react-router-dom'

export default function Login() {
    const [userFormData, setUserFormData] = useState({
        username:'',
        password:''
    })
    const [loginUser, { error }] = useMutation(LOGIN_USER)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        if(name === 'usernameInput') {
            setUserFormData({username:value, password:userFormData.password})
        }
        if(name === 'passwordInput') {
            setUserFormData({username:userFormData.username, password:value})
        }
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
            const { data } = await loginUser ({
                variables: {
                    username: userFormData.username,
                    password: userFormData.password
                }
            })
            Auth.login(data.loginUser.token)
            alert('Login successful!')
            window.location.reload()
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
         <>
            <form onSubmit={handleFormSubmit} className="signup">
                <h1>Login here!</h1>
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
            <Link to="/signup">Don't have an account yet?</Link>
        </>

    )
}
