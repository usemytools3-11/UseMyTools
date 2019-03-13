import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserData, fetchTools, borrowFetch } from '../actions';
import { Link } from 'react-router-dom';

class ProfilePage extends Component {
    componentDidMount() {
        this.props.getUserData();
        this.props.fetchTools();

        this.props.borrowFetch();
    }

    render() {
        const toolIDs = this.props.borrowed.filter(elem => elem.borrower_id === this.props.userID).map(elem => elem.tool_id);
        return (
            <>
                <h1>Profile page</h1>
                <h2>{this.props.first_name} {this.props.last_name}</h2>
                <p>{this.props.email}</p>
                <Link to="/profile/edit">Edit profile</Link>
                <Link to="/profile/tools">Your tools</Link>

                <h1>Your items:</h1>
                {this.props.tools.filter(elem => elem.lender_id === this.props.userID).map(elem =><Link to={`/tools/${elem.id}`} key={elem.id}><p>{elem.name}</p></Link>)}

                <h1>Items you borrowed:</h1>
                {this.props.tools.filter(elem => elem.is_borrowed).filter(elem => toolIDs.indexOf(elem.id) > -1).map(elem =><Link to={`/tools/${elem.id}`} key={elem.id}><p>{elem.name}</p></Link>)}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        first_name: state.auth.user ? state.auth.user.first_name : '',
        last_name: state.auth.user ? state.auth.user.last_name : '',
        email: state.auth.user ? state.auth.user.email : '',
        userID: state.auth.user ? state.auth.user.id : -1,
        tools: state.items.tools || [],
        borrowed: state.items.borrowed || []
    }
}

const mapDispatchToProps = {
    getUserData,
    fetchTools,
    borrowFetch
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);