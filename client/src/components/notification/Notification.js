import React from 'react';
import Close from '../../resources/close_white.svg';

function Notification(props) {
    return (
        <div className={props.message.status === "Success" ? "notification success" : "notification error"}>
            <h3 className="boldText">{props.message.message}</h3>
            <img src={Close} alt="" onClick={props.close} /> 
        </div>
    )
}

export default Notification
