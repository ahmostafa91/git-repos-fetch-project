import React from 'react';
import './infoBoxStyle.scss';

const InfoBox = ({children}) => {
    return (
        <div className="main-info">
            {children}
        </div>
    );
};

export default InfoBox;