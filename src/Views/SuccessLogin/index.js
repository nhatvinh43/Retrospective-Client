import React, {useEffect} from 'react';
import './index.css'

const SuccessLogin = (props) => {
    useEffect(() => {
        const fetchUserData = async () => {
            const result = await fetch(process.env.REACT_APP_HOST + "/auth/success", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                  },
            });

            const msg = await result.json();

            if(result.status===200 || result.status===304)
            {
                console.log(msg);
                props.setIsLogin(true);
                localStorage.setItem('token', msg.token);
                props.setToken(msg.token);
                props.history.push('/dashboard');
            }

            else{
                props.history.push('/');
            }
        }

        fetchUserData();
    }, []);

    return (
        <div></div>
    )
}

export default SuccessLogin;