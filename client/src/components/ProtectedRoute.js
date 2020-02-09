import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, auth, ...rest }) => {
	return <Route {...rest} render={props => (auth ? <Component {...props} /> : <Redirect to="/" />)} />;
};

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps)(ProtectedRoute);
