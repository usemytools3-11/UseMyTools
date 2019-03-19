import React, { Component } from 'react';
import Tools from '../containers/ToolsContainer';
import { connect } from 'react-redux';
import { fetchTools, getUserData, fetchUsers } from '../actions';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Title = styled.h1`
    text-align: center;
`;

const SearchBar = styled.div`
    width: 24rem;
    max-width: 24rem;
    min-width: 8rem;
    margin: 0 auto;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 0 2rem;

    &::placeholder {
        text-align: center;
    }
`;

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
        if(this.props.authenticated){
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
        return (
            <>
                <Title>Tools available</Title>
                <SearchBar>
                    <SearchInput type="text" name="search" placeholder="What would you like to borrow today?" onChange={this.handleChange} value={this.state.search} />
                </SearchBar>
                {this.props.authenticated && <Tools userID={this.props.userID} tools={objects.filter(elem => elem.lender_id !== this.props.userID).filter(elem => !elem.is_borrowed)} users={this.props.users} />}
            </>
        );
    }
}

ToolsPage.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    fetchTools: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    getUserData: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    tools: PropTypes.array.isRequired,
    userID: PropTypes.number.isRequired,
    users: PropTypes.array.isRequired
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