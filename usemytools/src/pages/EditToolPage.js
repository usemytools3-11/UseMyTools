import React from 'react';
import ToolFormContainer from '../containers/ToolFormContainer';

export default (props) => {
    return (
        <>
            <ToolFormContainer newTool={false} toolID={props.match.params.id} />
        </>
    );
}