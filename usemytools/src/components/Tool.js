import React from 'react';
import { connect } from 'react-redux';
import { getUserData } from '../actions';
import { Link } from 'react-router-dom';

const Tool = (props) => {
    return (
        <>
            <h1>{props.name} by {props.lender_data.first_name} {props.lender_data.last_name}</h1>
            {props.singleTool &&
                <>
                    Owner:
                    <Link to={`/profile/${props.lender_id}`}>{props.lender_data.first_name} {props.lender_data.last_name}</Link>
                </>
            }
            <img src={props.photo_url} alt={props.name} style={{width: 150+'px', height: 150+'px'}} />
            <p>{props.price}</p>
            {props.singleTool && props.lender_id === props.userID && 
            <>
                <button onClick={props.editTool}>EDIT</button>
                <button onClick={props.deleteTool}>DELETE</button>
            </>}
            {props.singleTool && props.lender_id !== props.userID &&
            <>
                {!props.is_borrowed &&
                    <button onClick={props.borrowTool}>BORROW</button>
                }
                {props.is_borrowed && props.borrowerID === props.userID && <button onClick={props.deleteToolBorrowing}>DELETE BORROWING</button>}
            </>}
        </>
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