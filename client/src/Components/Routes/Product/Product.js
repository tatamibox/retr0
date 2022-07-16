import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from './Product.module.css'
import axios from "axios";
const Product = () => {

    const [currentProduct, setCurrentProduct] = useState('')

    const { id } = useParams();
    useEffect(() => {
        axios.post('http://localhost:3001/getProduct', { id: id })
            .then((res) => {
                setCurrentProduct(res.data)
            })
    }, [])

    console.log(currentProduct)
    return <>
        <div className={styles.item__container}>
            <img src={currentProduct.imageURL}></img>
            <div className={styles.item__description}>
                <h1>{currentProduct.name}</h1>
                <p>${currentProduct.price}</p>
                <div className={styles.buttons}><button className={`${styles.buy__button} btn btn-dark`}>Buy Now</button><button className='btn btn-outline-dark'>Offer</button></div>
            </div>
        </div>

        <div className="comments__container">
            <h2 className="text-center">Comments</h2>
        </div>
    </>
}

export default Product;