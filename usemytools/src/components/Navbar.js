import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    color: #D1BD88 !important;
`;

const NavbarStyled = styled(Navbar)`
    margin-bottom: 5rem;
    border-bottom: 1px solid lightgray;
    background: #314D69;
`;

const LinkStyled = styled(Link)`
    color: white !important;
`;

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
            <NavbarStyled light expand="md">
                <NavbarBrandStyled href="/">
                    UseMyTools
                </NavbarBrandStyled>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {!this.props.authenticated && navlinksPublic.map((elem, i) =>
                            <NavItem key={i}>
                                <LinkStyled to={elem.linkTo} className='nav-link'>
                                    {elem.text}
                                </LinkStyled>
                            </NavItem>
                        )}
                        {this.props.authenticated && navlinksPrivate.map((elem, i) =>
                            <NavItem key={i}>
                                <LinkStyled to={elem.linkTo} className='nav-link'>
                                    {elem.text}
                                </LinkStyled>
                            </NavItem>
                        )}
                        {this.props.authenticated &&
                            <NavItem>
                                <LinkStyled to='/' onClick={this.props.logoutUser} className='nav-link'>
                                    Log out
                                </LinkStyled>
                            </NavItem>
                        }
                    </Nav>
                </Collapse>
            </NavbarStyled>
        );
    }
}

NavbarComponent.propTypes = {
    authenticated: PropTypes.bool,
    logoutUser: PropTypes.func
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