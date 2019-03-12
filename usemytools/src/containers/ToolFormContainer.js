import React from 'react';
import ToolForm from '../components/ToolForm';

export default (props) => {
    return (
        <>
            <ToolForm newTool={props.newTool} toolID={props.toolID} />
        </>
    );
}