import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserData, fetchTool, addNewTool, updateTool } from '../actions';
import { history } from '../';
import styled from 'styled-components';
import { SubmitBtn } from '../styles';
import PropTypes from 'prop-types';

const FormComponent = styled.form`
    width: 24rem;
    margin: 0 auto;
    background-color: #394147 !important;
    color: #D1BD88;
`;

const Title = styled.h1`
    text-align: center;
`;

const cardBorder = {
    border: '1px solid black',
    borderRadius: '6px'
};

class ToolForm extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            name: '',
            price: '',
            photo_url: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateTool = this.updateTool.bind(this);
        this.addNewTool = this.addNewTool.bind(this);
    }

    componentDidMount() {
        this.props.getUserData();
        if(this.props.newTool === false){
            this.props.fetchTool(this.props.toolID).then(_ => {
                this.props.tool.lender_id !== this.props.userID
                ? history.push('/tools')
                : this.setState({
                    name: this.props.tool.name,
                    price: this.props.tool.price,
                    photo_url: this.props.tool.photo_url
                });
            });
        }
    }

    handleChange(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    addNewTool(e){
        e.preventDefault();
        this.props.addNewTool({
            name: this.state.name,
            price: this.state.price,
            photo_url: this.state.photo_url,
            lender_id: this.props.userID
        });
    }

    updateTool(e){
        e.preventDefault();
        this.props.updateTool({
            id: this.props.toolID,
            name: this.state.name,
            price: this.state.price,
            photo_url: this.state.photo_url,
            lender_id: this.props.userID
        });
    }

    render() {
        return (
            <>
                <FormComponent onSubmit={this.props.newTool ? this.addNewTool : this.updateTool} className="card" style={cardBorder}>
                    <Title>
                        {this.props.newTool && "New tool"}
                        {!this.props.newTool && "Update tool"}
                    </Title>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your tool name"
                        onChange={this.handleChange}
                        value={this.state.name}
                    />

                    <input
                        type="text"
                        name="price"
                        placeholder="Your tool lent price"
                        onChange={this.handleChange}
                        value={this.state.price}
                    />

                    <input
                        type="text"
                        name="photo_url"
                        placeholder="Your tool photo url"
                        onChange={this.handleChange}
                        value={this.state.photo_url}
                    />

                    <SubmitBtn
                        type="submit"
                        name="submit"
                        className="btn btn-primary"
                    />
                </FormComponent>
            </>
        );
    }
}

ToolForm.propTypes = {
    addNewTool: PropTypes.func.isRequired,
    fetchTool: PropTypes.func.isRequired,
    getUserData: PropTypes.func.isRequired,
    newTool: PropTypes.bool.isRequired,
    // tool: PropTypes.func.,
    updateTool: PropTypes.func.isRequired,
    userID: PropTypes.number.isRequired,
    toolID: PropTypes.number
}

const mapStateToProps = state => {
    return {
        userID: state.auth.user ? state.auth.user.id : -1,
        tool: state.items.tool || null
    }
}

const mapDispatchToProps = {
    getUserData,
    addNewTool,
    updateTool,
    fetchTool
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolForm);