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
            </>}
            {props.singleTool && props.lender_id !== props.userID &&
            <>
                <button>BORROW</button>
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