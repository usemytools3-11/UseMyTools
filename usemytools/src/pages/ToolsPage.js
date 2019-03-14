import React, { Component } from 'react';
import Tools from '../containers/ToolsContainer';
import { connect } from 'react-redux';
import { fetchTools, getUserData, fetchUsers } from '../actions';

class ToolsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.returnFilteredObjects = this.returnFilteredObjects.bind(this);
    }
    componentDidMount() {
        if(this.props.tools.length === 0){
            this.props.fetchTools();
        }

        if(this.props.users.length === 0){
            this.props.fetchUsers();
        }

        if(this.props.userID === -1){
            this.props.getUserData();
        }
    }

    handleChange(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    returnFilteredObjects() {
        return this.state.search.trim().length > 0 ? this.props.tools.filter(elem => elem.name.toLowerCase().includes(this.state.search.toLowerCase())) : this.props.tools;
    }

    render() {
        const objects = this.returnFilteredObjects();
        console.log(objects);
        return (
            <>
                <h1>Tools available</h1>
                <input type="text" name="search" placeholder="What would you like to borrow today?" onChange={this.handleChange} value={this.state.search} />
                {this.props.authenticated && <Tools userID={this.props.userID} tools={objects.filter(elem => elem.lender_id !== this.props.userID).filter(elem => !elem.is_borrowed)} users={this.props.users} />}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated || false,
        userID: state.auth.user ? state.auth.user.id : -1,
        tools: state.items.tools || [],
        users: state.users.users || []
    }
}

const mapDispatchToProps = {
    fetchTools,
    getUserData,
    fetchUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolsPage);