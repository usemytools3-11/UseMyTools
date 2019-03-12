import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserData, fetchTool, addNewTool, updateTool } from '../actions';
import { history } from '../';

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
        if(this.props.newTool === false){
            this.props.fetchTool(this.props.toolID).then(_ => {
                this.props.tool.lender_id !== this.props.userID
                ? history.push('/tools')
                : this.setState({
                    name: this.props.tool.name
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
            lender_id: this.props.userID
        });
    }

    updateTool(e){
        e.preventDefault();
        this.props.updateTool({
            id: this.props.toolID,
            name: this.state.name,
            lender_id: this.props.userID
        });
    }

    render() {
        return (
            <>
                <form onSubmit={this.props.newTool ? this.addNewTool : this.updateTool}>
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