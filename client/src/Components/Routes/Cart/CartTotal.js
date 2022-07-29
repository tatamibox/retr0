import { React, useEffect, useState } from 'react'
import styles from './CartTotal.module.css'
function CartTotal(props) {

    useEffect(() => {
        setTotalItems(props.products.length)
    }, [])
    const [totalItems, setTotalItems] = useState()
    console.log(totalItems)
    return (
        <>
            <section className={styles.total__container}>
                <div className={styles.order__summary}><h4>Order summary</h4><div>{totalItems} item(s)</div></div>
                <div className={styles.order__line}><h5>Item(s) subtotal</h5><span>$ {props.total}</span></div>
                <div className={styles.order__line}><h5>Shipping</h5><span>TBD</span></div>
                <div className={styles.order__line}><h5>Subtotal</h5><span>$ {props.total}</span></div>
                <div className={styles.order__line}><h5>Estimated tax</h5><span>TBD</span></div>
                <div className={styles.order__total}><h4>Order total</h4><span>$ {props.total}</span></div>
                {/* with shipping and tax in a real site, there will be a ^^^^^
                calculation here to actually determine the real subtotal. */}
            </section>
        </>

    )
}

export default CartTotal