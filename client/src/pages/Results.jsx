export default function Results() {
    console.log(window.location)
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    console.log(urlParams.get('tags'))
    return (
        <p>hello</p>
        
    )
}
