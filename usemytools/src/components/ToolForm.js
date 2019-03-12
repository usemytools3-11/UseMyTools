import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserData, addNewTool, updateTool } from '../actions';

class ToolForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            photo_url: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateTool = this.updateTool.bind(this);
        this.addNewTool = this.addNewTool.bind(this);
    }

    componentDidMount() {
        this.props.getUserData();
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
            lender_id: this.props.userID
        });
    }

    updateTool(e){
        e.preventDefault();
        console.log("UPDATE", this.state);
    }

    render() {
        return (
            <>
                <form onSubmit={this.props.newTool ? this.addNewTool : this.UNSAFE_componentWillMount.updateTool}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your tool name"
                        onChange={this.handleChange}
                        value={this.state.name}
                    />

                    <input
                        type="submit"
                        name="submit"
                    />
                </form>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        userID: state.auth.user ? state.auth.user.id : -1
    }
}

const mapDispatchToProps = {
    getUserData,
    addNewTool,
    updateTool
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolForm);