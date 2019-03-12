import React from 'react';
import Tool from '../components/Tool';

const ToolContainer = (props) => {
    return (
        <>
            <Tool
                key={props.tool.id}
                id={props.tool.id}
                name={props.tool.name}
                photo_url={props.tool.photo_url}
                price={props.tool.price}
                lender_id={props.tool.owner_id}
            />
        </>
    );
}

export default ToolContainer;