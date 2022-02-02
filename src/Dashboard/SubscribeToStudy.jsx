import React from 'react';


const SubscribeToStudy = ({studyAbout, onSubscribe}) => {

    return (
        <div className='container col-sm'>
            <h6 style={{ color: '#A5ACCB' }}> ABOUT</h6>
            <br />
            <p style={{ color: '#A5ACCB' }}>
                {studyAbout}
            </p>
            
            <button className="subscribe-button" onClick={onSubscribe}>Subscribe to Study</button>
            

        </div>
    );
};

export default SubscribeToStudy;