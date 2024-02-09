import { Link } from "react-router-dom"

export default function Homepage() {
    return (
        <>
            <div className="home">
                <h1>Gurubooru</h1>
                <ul>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/signup'>Signup</Link></li>
                </ul>
                <input placeholder='Search tags here!'></input>
            </div>
            <button>Search</button>
        </>
    )
}
