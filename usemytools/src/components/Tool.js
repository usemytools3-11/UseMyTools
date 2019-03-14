import React from 'react';
import { connect } from 'react-redux';
import { getUserData } from '../actions';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
    width: 45%;
    margin: 20px auto;

    &:hover {
        text-decoration: none;
    }
`;

const Title = styled.h1`
    text-align: center;
    color: black;
    text-decoration: none;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
`;

const Price = styled.h3`
    color: black;
    text-decoration: none;
    text-align: center;
`;

const Owner = styled.p`
    text-align: center;
    color: black;
`;

const cardBorder = {
    border: '1px solid black',
    borderRadius: '6px'
};

const ButtonHalf = styled.button`
    width: 50%;
    display: inline-block;
`;

const Buttons = styled.div`
    width: 100%;
`;

const Tool = (props) => {
    return (
        <Card className="card" style={cardBorder}>
            <Title>{props.name}</Title>
            {props.singleTool &&
                <Owner>
                    by <Link to={`/profile/${props.lender_id}`}>{props.lender_data.first_name} {props.lender_data.last_name}</Link>
                </Owner>
            }
            <Image src={props.photo_url} alt={props.name} />
            <Price>${props.price}</Price>
            {props.singleTool && props.lender_id === props.userID && 
            <Buttons>
                <ButtonHalf onClick={props.editTool} className="btn btn-primary">EDIT</ButtonHalf>
                <ButtonHalf onClick={props.deleteTool} className="btn btn-danger">DELETE</ButtonHalf>
            </Buttons>}
            {props.singleTool && props.lender_id !== props.userID &&
            <>
                {!props.is_borrowed &&
                    <button onClick={props.borrowTool} className="btn btn-success">BORROW</button>
                }
                {props.is_borrowed && props.borrowerID === props.userID && <button onClick={props.deleteToolBorrowing} className="btn btn-danger">DELETE BORROWING</button>}
            </>}
        </Card>
    );
}

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = {
    getUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(Tool);