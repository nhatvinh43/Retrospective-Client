import React, {useEffect} from 'react';
import './index.css'

const SuccessLogin = (props) => {
    useEffect(() => {
    
        const token = props.match.params.token;
        if(!token)
        {
            props.history.push('/');
        }
        props.setIsLogin(true);
        localStorage.setItem('token', token);
        props.setToken(token);
        props.history.push('/dashboard');
        
    }, []);

    return (
        <div></div>
    )
}

export default SuccessLogin;