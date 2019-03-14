import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserData, fetchTools, borrowFetch, fetchUser } from '../actions';
import { Link } from 'react-router-dom';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetched: false
        }
    }

    componentDidMount() {
        this.props.getUserData();
        this.props.fetchTools();
        this.props.borrowFetch();
        if(!this.state.fetched && this.props.match.params.id){
            this.props.fetchUser(this.props.match.params.id);
            this.setState({
                fetched: true
            });
        }
    }

    render() {
        const toolIDs = this.props.borrowed.filter(elem => elem.borrower_id === this.props.userID).map(elem => elem.tool_id);
        return (
            <>
                <h1>Profile page</h1>
                {!this.props.match.params.id &&
                <>
                    <h2>{this.props.first_name} {this.props.last_name}</h2>
                    <p>ID: {this.props.userID}</p>
                    <p>{this.props.email}</p>
                    <Link to="/profile/edit">Edit profile</Link>
                    <Link to="/profile/tools">Your tools</Link>

                    <h1>Your items:</h1>
                    {this.props.tools.filter(elem => elem.lender_id === this.props.userID).map(elem =><Link to={`/tools/${elem.id}`} key={elem.id}><p>{elem.name}</p></Link>)}

                    <h1>Items you borrowed:</h1>
                    {this.props.tools.filter(elem => elem.is_borrowed).filter(elem => toolIDs.indexOf(elem.id) > -1).map(elem =><Link to={`/tools/${elem.id}`} key={elem.id}><p>{elem.name}</p></Link>)}
                </>
                }
                {this.props.match.params.id && this.props.user &&
                <>
                    <h2>{this.props.user.first_name} {this.props.user.last_name}</h2>
                    <p>ID: {this.props.user.id}</p>
                </>
                }
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
        borrowed: state.items.borrowed || [],
        user: state.users.user || null
    }
}

const mapDispatchToProps = {
    getUserData,
    fetchTools,
    borrowFetch,
    fetchUser
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);