import styles from './Home.module.css'
import Navbar from './Navbar/Navbar'
import React, { useContext, useState } from 'react';
import Typewriter from 'typewriter-effect';
import AuthContext from './store/auth-context';
const Home = () => {

    const authCtx = useContext(AuthContext);

    return (
        <>
            <div className={styles.hero__container}>
                <div className={styles.hero__left}>
                    <h1 className={`${styles.header} text-center`}>
                        <Typewriter onInit={(typewriter) => {
                            typewriter

                                .pauseFor(50)
                                .changeDelay(60)
                                .typeString('buy, sell, trade, repeat')
                                .start()
                        }}></Typewriter>
                    </h1>
                    <p>the only community-driven vintage fashion marketplace you'll need.</p>
                    <button className={`btn btn-dark btn-lg ${styles.shop__button}`}>Shop Now</button>
                </div>

                <div id="carouselExampleControls" class={`carousel slide ${styles.carousel} `} data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="https://cdn.sanity.io/images/c1chvb1i/production/f8e7ed92bba9461c9239c7ff89a6602f4f9348b5-1100x735.jpg" class={`d-block w-100 ${styles.carousel__image}`} alt="..."></img>
                        </div>
                        <div class="carousel-item">
                            <img src="https://i.ytimg.com/vi/OnUi6ka_7aw/maxresdefault.jpg" class={`d-block ${styles.carousel__image}`} alt="..."></img>
                        </div>
                        <div class="carousel-item">
                            <img src="https://www.highsnobiety.com/static-assets/thumbor/FFcnDq45W3RSlF2AneYKlY5-vTs=/1600x1067/www.highsnobiety.com/static-assets/wp-content/uploads/2020/08/04160927/stussy-birkenstock-boston-release-date-price-05.jpg" class={`d-block w-100 ${styles.carousel__image}`} alt="..."></img>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Home;