import React from 'react';

function Price(props) {
    return (
        <div style={{
            fontSize:props.fontSize ? props.fontSize:"14px",
            fontWeight:'bold',
            margin:'5px 0'
        }}>
            UZS  {props.value}
        </div>
    );
}

export default Price;
