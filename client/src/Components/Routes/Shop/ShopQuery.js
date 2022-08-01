import axios from 'axios';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './Shop.module.css'

const ShopQuery = () => {
    // holds the products from search results 
    const [filteredProducts, setFilteredProducts] = useState()

    const { search } = useParams();
    useEffect(() => {
        axios.post('https://retrobackend.herokuapp.com/filterProducts', { query: search })
            .then((res) => {
                setFilteredProducts(res.data)
            })
    }, [])

    console.log(filteredProducts)


    return (
        <>
            <div className={styles.products__container}>
                {filteredProducts && filteredProducts.map((product, i) => (
                    <div className={styles.product__container} key={i}>
                        <a href={`/product/${product._id}`}><img src={product.imageURL} alt="item preview"></img></a>
                        <div className={styles.product__name}>{product.name}</div>
                        <div className={styles.product__price}>${product.price}</div>
                        <div className={`${styles.tags__container} d-flex flex-row gap-2`}>
                            {product.tags.length < 1 && <button disabled className={`card ${styles.tag}`}>N / A</button>}
                            {product.tags.map((tag, i) => (
                                <a className={styles.tag__links} href={`/shop/${tag}?`}><button key={i} className={`card ${styles.tag}`}>{tag}</button></a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
export default ShopQuery;