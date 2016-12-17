/**
 * Created by tdzl2_000 on 2016-01-25.
 */
/* eslint-disable react/forbid-prop-types */
import React, { PropTypes } from 'react';
import { match, RouterContext } from 'react-router';

export default class RouterContainer extends React.Component {
  static propTypes = {
    location: PropTypes.string,
    passProps: PropTypes.object,
    routeConfig: PropTypes.object,
  };

  static childContextTypes = {
    location: PropTypes.string,
  };

  state = {
    renderProps: null,
  };

  getChildContext() {
    return {
      location: this.props.location,
      app: this
    };
  }

  createElement(component, props) {
    const { passProps } = this.props;
    return React.createElement(component, {
      ...props,
      ...passProps,
    });
  }

  render() {
    const { location, routeConfig } = this.props;

    console.log('Current location:', location);

    let props;
    match({
      location,
      routes: routeConfig,
    }, (err, redirectLocation, renderProps) => {
      if (err) {
        console.error(err.stack);
      } else {
        props = renderProps;
      }
    });
    if (!props) {
      console.warn('Async router is not supported by react-native');
    }

    return <RouterContext {...props} createElement={this.createElement} />;
  }
}
