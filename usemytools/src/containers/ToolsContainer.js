import React from 'react';
import Tool from '../components/Tool';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    text-decoration: none !important;
`;

export default (props) => {
    return (
        <>
            {props.tools.map(tool => 
            <StyledLink to={`/tools/${tool.id}`} key={tool.id}>
                <Tool
                    key={tool.id}
                    id={tool.id}
                    name={tool.name}
                    photo_url={tool.photo_url}
                    price={Number(tool.price)}
                    lender_id={tool.lender_id}

                    editTool={props.editTool}
                    deleteTool={props.deleteTool}
                    borrowTool={props.borrowTool}
                    deleteToolBorrowing={props.deleteToolBorrowing}
                    is_borrowed={tool.is_borrowed}
                    userID={props.userID}
                    singleTool={false}

                    lender_data={
                        props.users.find(elem => elem.id === tool.lender_id) !== undefined
                        ? props.users.find(elem => elem.id === tool.lender_id)
                        : {first_name: '', last_name: ''}
                    }
                />
            </StyledLink>)}
        </>
    );
}