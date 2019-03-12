import React from 'react';
import Tool from '../components/Tool';

const ToolsContainer = (props) => {
    return (
        <>
            {props.tools.map(tool => <Tool
                key={tool.id}
                id={tool.id}
                name={tool.name}
                photo_url={tool.photo_url}
                price={tool.price}
                lender_id={tool.owner_id}
            />)}
        </>
    );
}

export default ToolsContainer;