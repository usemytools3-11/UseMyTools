import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserData, fetchTools, borrowFetch, fetchUser, deleteUser } from '../actions';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Title = styled.h1`
    text-align: center;
`;

const StyledP = styled.p`
    text-align: center;
    font-weight: 700;
`;

const Label = styled.p`
    text-align: center;
`;

const SectionTitle = styled.h2`
    text-align: center;
`;

const WLink = styled(Link)`
    width: 33.33%;
`;

const CenterButtonDiv = styled.div`
    width: 18rem;
    max-width: 18rem;
    min-width: 8rem;
    margin: 2rem auto;
`;

const UserDataSection = styled.div`
    width: 18rem;
    max-width: 18rem;
    min-width: 8rem;
    margin: 2rem auto;
    border: 1px solid black;
    border-radius: 6px;
    padding: 1rem 2rem;
`;

const KeyLabel = styled.p`
    font-weight: 100;
`;

const KeyProperty = styled.p`
    font-weight: 700;
    border-bottom: 1px solid black;
`;


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
                {!this.props.match.params.id &&
                <>
                    <Title>Hey, {this.props.first_name}!</Title>
                    
                    <UserDataSection>
                        <KeyLabel>Name:</KeyLabel>
                        <KeyProperty>{this.props.first_name} {this.props.last_name}</KeyProperty>

                        <KeyLabel>ID:</KeyLabel>
                        <KeyProperty>{this.props.userID}</KeyProperty>

                        <KeyLabel>Email:</KeyLabel>
                        <KeyProperty>{this.props.email}</KeyProperty>
                    </UserDataSection>

                    <CenterButtonDiv>
                        <WLink to="/profile/edit" className="btn btn-primary">Edit profile</WLink>
                        <WLink to="/" onClick={() => this.props.deleteUser(this.props.userID)} className="btn btn-danger">Delete account</WLink>
                        <WLink to="/profile/tools" className="btn btn-primary">Your tools</WLink>
                    </CenterButtonDiv>

                    <SectionTitle>Items you borrowed:</SectionTitle>
                    {this.props.tools.filter(elem => elem.is_borrowed).filter(elem => toolIDs.indexOf(elem.id) > -1).length === 0 ? <Label>No items</Label> : 
                        this.props.tools.filter(elem => elem.is_borrowed).filter(elem => toolIDs.indexOf(elem.id) > -1).map(elem =><Link to={`/tools/${elem.id}`} key={elem.id}><p>{elem.name}</p></Link>)}
                </>
                }
                {this.props.match.params.id && this.props.user &&
                <>
                    <Title>{this.props.user.first_name} {this.props.user.last_name}</Title>
                    <StyledP>ID: {this.props.user.id}</StyledP>
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
    fetchUser,
    deleteUser
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);