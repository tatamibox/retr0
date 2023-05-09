import axios from 'axios';
import { useRef, useState, useContext } from 'react';
import useHttp from '../../hooks/use-http';
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
    const categoryRef = useRef();
    const sizeRef = useRef();
    const tagsRef = useRef();

    const submitHandler = (e) => {

        e.preventDefault();

        const tags = tagsRef.current.value;
        const size = sizeRef.current.value;
        const category = categoryRef.current.value;
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
                            axios.post('https://retr0-server.vercel.app/userInfo', {
                                localId: localId
                            })
                                .then((res) => {

                                    axios.post('https://retr0-server.vercel.app/uploadProduct', {
                                        username: res.data.username,
                                        product: product,
                                        imageURL: downloadURL,
                                        price: price,
                                        category: category,
                                        size: size,
                                        tags: tags
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
            <label for="tags">Tags(separated by a space)</label>
            <input type="text" id="tags" ref={tagsRef}></input>
            <label for="size">Category</label>
            <select id="category" ref={categoryRef}>
                <option value="outerwear">Outerwear</option>
                <option value="accessories">Accessories</option>
                <option value="pants">Pants</option>
                <option value="shoes">Shoes</option>
                <option value="shirts">Shirts</option>
                <option value="other">Other</option>
            </select>
            <label for="size">Size</label>
            <select id="size" ref={sizeRef}>
                <option value="xxs">XXS</option>
                <option value="xs">XS</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
                <option value="os">OS</option>
            </select>
            <button type="submit" onClick={submitHandler}>Submit</button>
        </form>
    )
}





export default Post;