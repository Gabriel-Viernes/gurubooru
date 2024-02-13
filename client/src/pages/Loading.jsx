export default function Loading() {
    let temp = window.location.replace("/loading", "")
    console.log(temp)


    return (
        <h1>If you're seeing this page, the website is either loading or there is an error 404</h1>
    )
}
