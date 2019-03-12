import React from 'react';
import Tool from '../components/Tool';
import { Link } from 'react-router-dom';

const ToolsContainer = (props) => {
    return (
        <>
            {props.tools.map(tool => 
            <Link to={`/tools/${tool.id}`} key={tool.id}><Tool
                key={tool.id}
                id={tool.id}
                name={tool.name}
                photo_url={tool.photo_url}
                price={tool.price}
                lender_id={tool.owner_id}
            /></Link>)}
        </>
    );
}

export default ToolsContainer;