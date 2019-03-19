import React, { Component } from 'react';
import Tools from '../containers/ToolsContainer';
import { connect } from 'react-redux';
import { fetchTools, getUserData, fetchUsers } from '../actions';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Title = styled.h1`
    text-align: center;
`;

const Label = styled.p`
    text-align: center;
`;

const SectionTitle = styled.h2`
    text-align: center;
`;

const FWLink = styled(Link)`
    width: 100%;
`;

const CenterButtonDiv = styled.div`
    width: 16rem;
    max-width: 16rem;
    min-width: 8rem;
    margin: 0 auto;
`;

const ALink = styled(FWLink)`
    background-color: #D1BD88 !important;
    border: none !important;

    &:hover {
        background-color: white !important;
        color: #D1BD88 !important;
        border: 1px #D1BD88 solid !important;
    }
`;
class ToolsPage extends Component {
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

    render() {
        return (
            <>
                <Title>Your tools</Title>
                <CenterButtonDiv>
                    <ALink to="/profile/tools/new" className="btn btn-primary">Add new tool</ALink>
                </CenterButtonDiv>

                <br/>
                <SectionTitle>Available:</SectionTitle>
                {this.props.tools.filter(elem => elem.lender_id === this.props.userID).filter(elem => !elem.is_borrowed).length === 0 ? <Label>No items</Label> : 
                    this.props.authenticated && <Tools tools={this.props.tools.filter(elem => elem.lender_id === this.props.userID).filter(elem => !elem.is_borrowed)} users={this.props.users} />}

                <SectionTitle>Unavailable:</SectionTitle>
                {this.props.tools.filter(elem => elem.lender_id === this.props.userID).filter(elem => elem.is_borrowed).length === 0 ? <Label>No items</Label> : 
                    this.props.authenticated && <Tools tools={this.props.tools.filter(elem => elem.lender_id === this.props.userID).filter(elem => elem.is_borrowed)} users={this.props.users} />}
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