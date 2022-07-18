import axios from 'axios';

import { useParams } from 'react-router-dom'

const ShopQuery = () => {

    const { search } = useParams();

    axios.post('/filterProducts', { query: search })
        .then((res) => {
            console.log(res)
        })


    return (
        <div>Shop query</div>
    )
}
export default ShopQuery;