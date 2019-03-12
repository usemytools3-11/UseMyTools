import React from 'react';
import ToolFormContainer from '../containers/ToolFormContainer';

export default (props) => {
    return (
        <>
            <h1>Edit Tool</h1>
            <ToolFormContainer newTool={false} toolID={props.match.params.id} />
        </>
    );
}