import React from 'react';
import "./loader.css";
import { FC } from 'react';



const Loader: FC = () => {
    return (
        <div className='loader-container'>
            <div className='loader' ></div>
        </div>
    );
};

export default Loader;