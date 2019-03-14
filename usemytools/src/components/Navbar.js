import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import { Link } from 'react-router-dom';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';

import styled from 'styled-components';

const NavbarBrandStyled = styled(NavbarBrand)`
    font-size: 24px !important;
`;

const NavbarStyled = styled(Navbar)`
    margin-bottom: 5rem;
    border-bottom: 1px solid lightgray;
`;


// const NavbarInput = styled.input`
//     width: 200px;
//     text-align: center;
//     box-sizing: border-box;
//     background: url(https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_search_48px-128.png);
//     background-color: rgb(250, 250, 250);
//     background-size: 16px;
//     background-repeat: no-repeat;
//     background-position: 54px 50%;
//     &:focus {
//         background-position: 0;
//     }
// `;

class NavbarComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        }

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            ...this.state,
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const navlinksPublic = [
            {
                linkTo: '/login',
                text: 'Log in'
            },
            {
                linkTo: '/register',
                text: 'Register'
            }
        ];

        const navlinksPrivate = [
            {
                linkTo: '/tools',
                text: 'Tools to rent'
            },
            {
                linkTo: '/profile',
                text: 'Your profile'
            },
            {
                linkTo: '/profile/tools',
                text: 'Your tools'
            },
            {
                linkTo: '/profile/tools/new',
                text: 'Add new tool'
            }
        ];

        return (
            <NavbarStyled color="white" light expand="md">
                <NavbarBrandStyled href="/">
                    UseMyTools
                </NavbarBrandStyled>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {!this.props.authenticated && navlinksPublic.map((elem, i) =>
                            <NavItem key={i}>
                                <Link to={elem.linkTo} className='nav-link'>
                                    {elem.text}
                                </Link>
                            </NavItem>
                        )}
                        {this.props.authenticated && navlinksPrivate.map((elem, i) =>
                            <NavItem key={i}>
                                <Link to={elem.linkTo} className='nav-link'>
                                    {elem.text}
                                </Link>
                            </NavItem>
                        )}
                        {this.props.authenticated &&
                            <NavItem>
                                <Link to='/' onClick={this.props.logoutUser} className='nav-link'>
                                    Log out
                                </Link>
                            </NavItem>
                        }
                    </Nav>
                </Collapse>
            </NavbarStyled>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated
    }
}

const mapDispatchToProps = {
    logoutUser
}


export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);