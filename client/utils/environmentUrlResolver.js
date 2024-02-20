export default function environmentUrlResolver() {
    let current = {
        url: '',
        imageServerUrl:''
    }
    if(process.env.current_environment === 'dev') {
        current.url = 'http://localhost:3001'
        current.imageServerUrl = 'http://localhost:3002'
        return current
    } else if(process.env.current_environment === 'prod') {
        current.url = 'https://gurubooru-275b322c18f4.herokuapp.com/'
        current.imageServerUrl = 'https://gurubooru-image-server-5f422bc852c2.herokuapp.com/'
        return current
    }
}
