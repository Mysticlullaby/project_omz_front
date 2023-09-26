import { useEffect } from 'react';

const Logout = () => {
    useEffect(() => {
        localStorage.clear();
        console.log('localStorage cleared')
        window.location.replace('/');
    });
};

export default Logout;