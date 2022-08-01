import axios from 'axios';
import useHttp from '../../../hooks/use-http'
import { useState, useEffect, useRef } from 'react';
import styles from './Shop.module.css'


const Shop = () => {



    const filterRef = useRef();

    const [productCounter, setProductCounter] = useState(20)
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    useEffect(() => {
        axios.post('https://retrobackend.herokuapp.com/latestProducts', { productCounter: productCounter })
            .then((res) => {
                setProducts(res.data)
                setFilteredProducts(res.data)
            })
    }, [productCounter])

    const handleFilter = () => {
        if (filterRef.current.value === 'all') { setFilteredProducts(products) }
        else {
            const filtered = products.filter(product => { return product.category === filterRef.current.value })
            setFilteredProducts(filtered)
        }
    }
    console.log(filteredProducts)
    return (
        <>
            <h1 className='text-center'>Shop</h1>
            <select className={styles.filter} onChange={handleFilter} ref={filterRef}>
                <option value="all">All</option>
                <option value="pants">Pants</option>
                <option value="accessories">Accessories</option>
                <option value="shirts">Shirts</option>
                <option value="shoes">Shoes</option>
                <option value="outerwear">Outerwear</option>
            </select>
            <div className={styles.products__container}>
                {filteredProducts.map((product, i) => (
                    <>
                        <div className={styles.product__container} key={i}>
                            <a href={`/product/${product._id}`}><img src={product.imageURL} alt="item preview"></img></a>
                            <div className={styles.product__name}>{product.name}</div>
                            <div className={styles.product__price}>${product.price}</div>
                            <div className={`${styles.tags__container} d-flex flex-row gap-2`}>
                                {product.tags.map((tag, i) => (
                                    <div key={i} className={`card ${styles.tag}`}>{tag}</div>
                                ))}
                            </div>
                        </div>

                    </>
                ))}

            </div>
            <div className='d-flex justify-content-center'>
                <button onClick={() => setProductCounter(productCounter + 5)} className='btn btn-outline-dark'>Load More</button>
            </div>
        </>
    )
}

export default Shop;