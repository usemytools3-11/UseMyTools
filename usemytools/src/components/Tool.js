import React from 'react';
import { connect } from 'react-redux';
import { getUserData } from '../actions';

const Tool = (props) => {
    return (
        <>
            <h1>{props.name} by {props.lender_id}</h1>
            <img src={props.photo_url} alt={props.name} />
            <p>{props.price}</p>
            {props.singleTool && props.lender_id === props.userID && 
            <>
                <button onClick={props.editTool}>EDIT</button>
                <button onClick={props.deleteTool}>DELETE</button>
                {props.is_borrowed && <button onClick={props.deleteToolBorrowing}>DELETE BORROWING</button>}
            </>}
            {props.singleTool && props.lender_id !== props.userID && !props.is_borrowed &&
            <>
                <button onClick={props.borrowTool}>BORROW</button>
            </>}
        </>
    );
}

const mapStateToProps = state => {
    return {
        userID: 1
    }
}

const mapDispatchToProps = {
    getUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(Tool);