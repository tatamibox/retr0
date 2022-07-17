import axios from "axios";
import { useState, useEffect, useContext } from 'react'
import AuthContext from "../Components/store/auth-context";

const useHttp = (url, data) => {

    const authCtx = useContext(AuthContext);
    const [loaded, setLoaded] = useState(false)
    const [response, setResponse] = useState('')

    useEffect(() => {
        if (authCtx.isLoggedIn) {
            axios.post(url, data)
                .then((res) => {
                    setResponse(res)
                })
                .finally(setLoaded(true))
        }
    }, [])
    return { response, loaded }

}


export default useHttp;