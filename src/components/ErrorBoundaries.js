import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundaries extends Component {

    static propTypes = {
        renderOnError: PropTypes.func.isRequired,
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node)
        ])
    }

    state = {
        hasError: false,
        error: null,
        errorInfo: null,
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true,
            error,
            errorInfo
        })
    }
    

    render() {
        const { hasError, error, errorInfo } = this.state;

        if(hasError) {
            return this.props.renderOnError({ error, errorInfo });
        }

        return this.props.children;
    }
}

export default ErrorBoundaries;