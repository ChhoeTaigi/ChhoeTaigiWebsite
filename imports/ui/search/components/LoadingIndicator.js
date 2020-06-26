import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

export const LoadingIndicator = (
    <div id='loading-indicator' className='loading-indicator' style={{width: "100%", height: "100", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Loader type="ThreeDots" color="#8bbe56" height="100" width="100" />
    </div>
);
