import { FIND_ALL_IMAGES } from '../../utils/queries'
import { useQuery } from '@apollo/client'

export default function Results() {

    const { loading, error, data } = useQuery(FIND_ALL_IMAGES)
    //filename path is data.findAllImages[i].filename
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    console.log(urlParams.get('tags'))
    return (
        <p>hello</p>
    )
}
