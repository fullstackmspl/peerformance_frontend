import React from 'react';
import ReactLoading from 'react-loading';

const AppLoading = ({color}) => (
    <div>
        <br/>
        <br/>
        <br/>
        <h1 style={{textAlign: "center"}}> APP IS LOADING </h1>
        <br/>
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center"
        }}>
            <ReactLoading type={"cylon"} color="#FB618D" height={'10%'} width={'20%'}/>
        </div>
    </div>
);

export default AppLoading;