import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FetchData extends Component {

    static propTypes = {
        url: PropTypes.string,
    }

    state = {
        data: null,
        loading: false,
        error: null,
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        this.setState({ loading: true, error: null });
        const { url } = this.props;

        try {
            const res = await fetch(url);
            const data = await res.json();
            this.setState({
                loading: false,
                data,
            });

        } catch (error) {
            this.setState({
                loading: false,
                error,
            });
        }
    }
    

    render() {
        return this.props.children({ ...this.state, refetch: this.fetchData });
    }
}

export default FetchData;