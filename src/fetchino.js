import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Fetchino extends Component {
  state = {
    loading: true,
    error: null,
    data: null,
  }

  static propTypes = {
    url: PropTypes.string.isRequired,
    options: PropTypes.object,
    render: PropTypes.func,
  }

  static defaultProps = {
    options: {},
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.url !== prevState.url || 
      nextProps.options !== prevState.options
    ) {

      return {
        data: null,
        error: null,
        loading: true,
        url: nextProps.url,
        options: nextProps.options,
      };

    }

    return null;
  }
  
  async componentDidMount() {
    const { url } = this.props;

    if (!!url) {
      await this.fetch();
    }
  }
  
  async componentDidUpdate() {
    const { url } = this.props;
    const { data, error } = this.state;
    
    if (!!url && data === null && error === null) {
      await this.fetch();
    }
  }
  
  async fetch() {
    try {

      const { url, options } = this.props;
      const response = await fetch(url, options);
      const data = await response.json();
      
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
    const { loading, error, data } = this.state;
    const { render, children = render } = this.props;
    
    if (typeof children === 'function') {
      return children({ loading, error, data });
    }
    
    return null;
  }
}
