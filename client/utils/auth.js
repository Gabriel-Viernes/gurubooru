import decode from 'jwt-decode'

class AuthService {
    login(idToken) {
        localStorage.setItem('id_token', idToken)
        window.location.assign('/')
    }
    
    logout() {
        localStorage.removeItem('id_token')
        window.location.assign('/')
    }

    loggedIn() {
        const token = localStorage.getItem('id_token')

        let isTokenExpired = false
        let tokenExistsFlag = false
        if(token) {
            tokenExistsFlag = true
            const decoded = decode(token)
            if(decoded.exp < Date.now() / 1000) {
                localStorage.removeItem('id_token')
                isTokenExpired = true
                console.log('Your token is expired')
            }
        } else {
            console.log('No token found!')
        }
        console.log(tokenExistsFlag, isTokenExpired)
        if ((tokenExistsFlag === true) && (isTokenExpired === false)) {
            return true
        }
        return false
    }
}

export default new AuthService()

