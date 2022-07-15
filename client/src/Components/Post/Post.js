import axios from 'axios';
import { useRef, useState, useContext } from 'react';
import styles from './Post.module.css'
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import AuthContext from '../store/auth-context';

const Post = () => {


    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const productRef = useRef();
    const priceRef = useRef();
    const imageRef = useRef();

    const submitHandler = (e) => {

        e.preventDefault();

        const product = productRef.current.value;
        const price = priceRef.current.value;
        const image = imageRef.current.files[0];
        const fbImageRef = ref(storage, `products/${v4()}`);
        uploadBytes(fbImageRef, image)
            .then((snapshot) => {
                return getDownloadURL(snapshot.ref)
            })
            .then(downloadURL => {
                console.log(downloadURL)
                if (isLoggedIn) {
                    axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FIREBASE_AUTH}`, {
                        idToken: authCtx.token
                    })
                        .then((res) => {
                            const localId = (res.data.users[0].localId)
                            axios.post('http://localhost:3001/userInfo', {
                                localId: localId
                            })
                                .then((res) => {

                                    axios.post('http://localhost:3001/uploadProduct', {
                                        username: res.data.username,
                                        product: product,
                                        imageURL: downloadURL,
                                        price: price
                                    })
                                })
                        })

                }
            })



    }



    return (
        <form>
            <label for="product">Product Name</label>
            <input type="text" id="product" ref={productRef}></input>
            <label for="price">Price</label>
            <input type="number" ref={priceRef}></input>
            <label for="image">Upload File Image</label>
            <input type="file" id="image" ref={imageRef}></input>
            <button type="submit" onClick={submitHandler}>Submit</button>
        </form>
    )
}





export default Post;