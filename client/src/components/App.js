import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Container } from 'react-bootstrap';

import Header from './Header';
import Landing from './Landing';
import Test from './Test';

const Dashboard = () => {
	return <h2>Dashboard</h2>;
};
const WorkoutNew = () => {
	return <h2>WorkoutNew</h2>;
};

export const App = ({ fetchUser }) => {
	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	console.log('running');
	return (
		<div>
			<BrowserRouter>
				<Container>
					<Header />
					<Route path="/" exact component={Landing} />
					<Route path="/workouts" exact component={Dashboard} />
					<Route path="/workouts/new" component={WorkoutNew} />
					<Route path="/test" component={Test} />
				</Container>
			</BrowserRouter>
		</div>
	);
};

// connect(mapstatetoprops, actions) -> props
export default connect(null, actions)(App);
