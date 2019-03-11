import React from 'react';

const Tool = (props) => {
    return (
        <>
            <h1>{props.name} by {props.lender_id}</h1>
            <img src={props.photo_url} alt={props.name} />
            <p>{props.price}</p>
        </>
    );
}
export default Tool;