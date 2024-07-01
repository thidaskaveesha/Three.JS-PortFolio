import React from 'react';
import style from './NotFound.module.css';
import NotFoundImage from '../assets/NotFound.png';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate('/');
    };
    return (
        <>
            <div className={style.Container}>
                <h2>404</h2>
                <img src={NotFoundImage} alt="Not Found Image" />
                <div className={style.GroupDesc}>
                    <p>The page you're looking for does not exist.</p>
                    <button className={style.GoBackBtn} onClick={goBack}> Go Back </button>
                </div>
            </div>
        </>
    );
};

export default NotFound;
