import { Link } from "react-router-dom"
import Auth from '../../utils/auth'

export default function Homepage() {
    return (
        <>
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
                <input placeholder='Search tags here!'></input>
            </div>
            <button>Search</button>
            <p className="notice">Unfortunately, this website does not support Firefox at the moment. Please use a Chromium based browser (Google Chrome, Brave) instead</p>
        </>
    )
}
