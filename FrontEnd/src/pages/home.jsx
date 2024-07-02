import React from 'react';
import style from './home.module.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const navigateToPortfolio = () => {
        navigate('/Portfolio');
    };

    return (
        <div>
            <h2>Home</h2>
            <p>This is home page</p>
            <button className={style.Button} onClick={navigateToPortfolio}>Go to Portfolio</button>
        </div>
    );
};

export default Home;