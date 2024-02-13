import { Link, createSearchParams } from "react-router-dom"
import { useState } from 'react'
import Auth from '../../utils/auth'

export default function Homepage() {

    document.getElementById('root').style.margin = 'auto'

    const [query, setQuery] = useState('')

    const handleInput = function(event) {
        const { name, value } = event.target
        if(name === 'queryInput') {
            setQuery(value)
        }
    }

    return (
        <>
            <div className="home-container">
                <div className="home">
                    <h1>Gurubooru</h1>
                    <ul>
                        {
                            Auth.loggedIn() ? (
                                <>
                                    <li><Link onClick={Auth.logout}>Logout</Link></li>
                                    <li><Link to='/upload'>Upload</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to='/login'>Login</Link></li>
                                    <li><Link to='/signup'>Signup</Link></li>
                                </>
                            )
                        }
                    </ul>
                    <input onChange={handleInput} name='queryInput' placeholder='Search tags here!' value= {query}></input>
                </div>
                <button><Link to={{
                    pathname:"results",
                    search:`?${createSearchParams({
                        tags: query
                    })}`
                }}>Search</Link></button>
                <p className="notice">Unfortunately, this website does not support Firefox at the moment. Please use a Chromium based browser (Google Chrome, Brave) instead</p>
            </div>
        </>
    )
}
