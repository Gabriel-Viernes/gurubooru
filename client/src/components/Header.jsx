import Auth from '../../utils/auth'
import { Link, createSearchParams } from "react-router-dom"

export default function Header() {
    return (
        <div className="component-header">
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
        </div>

    )
}
