import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserData, fetchTools } from '../actions';
import { Link } from 'react-router-dom';

class ToolsPage extends Component {
    componentDidMount() {
        if(this.props.first_name.length === 0 || this.props.last_name.length === 0 || this.props.email.length === 0){
            this.props.getUserData();
        }
        if(this.props.tools.length === 0){
            this.props.fetchTools();
        }
    }

    render() {
        return (
            <>
                <h1>Profile page</h1>
                <h2>{this.props.first_name} {this.props.last_name}</h2>
                <p>{this.props.email}</p>

                <Link to="/profile/tools">Your tools</Link>

                <h1>Your items:</h1>
                {this.props.tools.filter(elem => elem.lender_id === this.props.userID).map(elem =><Link to={`/tools/${elem.id}`} key={elem.id}><p>{elem.name}</p></Link>)}

                <h1>Items you borrowed:</h1>
                {this.props.tools.filter(elem => elem.is_borrowed).map(elem =><Link to={`/tools/${elem.id}`} key={elem.id}><p>{elem.name}</p></Link>)}
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
        tools: state.items.tools || []
    }
}

const mapDispatchToProps = {
    getUserData,
    fetchTools
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolsPage);