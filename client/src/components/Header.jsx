import Auth from '../../utils/auth'
import { Link, createSearchParams } from "react-router-dom"
import { useState } from 'react'

export default function Header() {
    let regex = /(?<!\S)([a-z0-9]+)_([a-z0-9]+)(?!\S)|(?<!\S)([a-z0-9*]+)(?!\S)/gm
    const [query, setQuery] = useState('')
    let search = []
    const [submit, setSubmit] = useState([])

    const handleInput = function(event) {
        const { name, value } = event.target
        if(name === 'queryInput') {
            setSubmit([])
            search = []
            setQuery(value)
            let temp = [...value.matchAll(regex)]
            for (const match of temp) {
                search.push(match[0])
            }
            setSubmit(search)
        }
    }
    return (
        <div className="component-header">
            <Link to="/"><h1>Gurubooru</h1></Link>
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
                <li><input onChange={handleInput} name='queryInput' placeholder='Search tags here!' value= {query}></input></li>
                <li>
                    <button>
                        <Link reloadDocument name="submit" to={
                            {
                                pathname:"",
                                search:`?${createSearchParams({
                                    tags: submit
                                })}`
                            }}>
                            Search
                        </Link>
                    </button>
                </li>
            </ul>
        </div>

    )
}
