export default function SingleImage() {
    let filenameRegex = /([a-z0-9-_.]+)$/gm
    let matched = window.location.href.match(filenameRegex)
    return (
        <img src={`http://localhost:3002${matched}.png`}></img>
    )
}
