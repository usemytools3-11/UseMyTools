import React from 'react';
import { connect } from 'react-redux';
import { getUserData } from '../actions';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Card = styled.div`
    width: 45%;
    margin: 20px auto;

    &:hover {
        text-decoration: none;
    }
`;

const CardSingle = styled.div`
    width: 45%;
    margin: 20px auto;

    &:hover {
        text-decoration: none;
        box-shadow: 0 0 50px 20px #D1BD88 !important;
    }
`

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

const BtnBorrowTool = styled.button`
    background: #D1bD88 !important;
    border: none !important;
    text-shadow: 0 1px 2px rgba(0,0,0,.6);

    &:hover {
        background-color: white !important;
        color: #D1BD88 !important;
        border: 1px #D1BD88 solid !important;
    }
`;

const Tool = (props) => {
    return (
        <>
        {props.singleTool && <Card className="card" style={cardBorder}>
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
                    <BtnBorrowTool onClick={props.borrowTool} className="btn btn-success">BORROW TOOL</BtnBorrowTool>
                }
                {props.is_borrowed && props.borrowerID === props.userID && <button onClick={props.deleteToolBorrowing} className="btn btn-danger">RETURN TOOL</button>}
            </>}
        </Card>}

        {!props.singleTool && <CardSingle className="card" style={cardBorder}>
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
                    <BtnBorrowTool onClick={props.borrowTool} className="btn btn-success">BORROW TOOL</BtnBorrowTool>
                }
                {props.is_borrowed && props.borrowerID === props.userID && <button onClick={props.deleteToolBorrowing} className="btn btn-danger">RETURN TOOL</button>}
            </>}
        </CardSingle>}

        </>
    );
}


Tool.propTypes = {
    getUserData: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    lender_data: PropTypes.shape({
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired
    }),
    lender_id: PropTypes.number.isRequired,
    singleTool: PropTypes.bool.isRequired,
    userID: PropTypes.number,
    name: PropTypes.string,
    is_borrowed: PropTypes.bool,
    photo_url: PropTypes.string,
    price: PropTypes.number,
    borrowTool: PropTypes.func,
    borrowerID: PropTypes.number,
    deleteTool: PropTypes.func,
    deleteToolBorrowing: PropTypes.func,
    editTool: PropTypes.func,
}

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = {
    getUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(Tool);