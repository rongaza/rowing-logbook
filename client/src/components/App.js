import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import WorkoutForm from './WorkoutForm';
import EditWorkout from './EditWorkout';
import ProtectedRoute from './ProtectedRoute';

export const App = ({ fetchUser }) => {
	useEffect(() => {
		fetchUser();
	});
	return (
		<Container fluid>
			<BrowserRouter>
				<React.Fragment>
					<Header />
					<Route path="/" exact component={Landing} />
					<ProtectedRoute path="/workouts" exact component={Dashboard} />
					<ProtectedRoute path="/workouts/new" exact component={WorkoutForm} />
					<ProtectedRoute path="/workouts/edit/:id" exact component={EditWorkout} />
				</React.Fragment>
			</BrowserRouter>
		</Container>
	);
};

export default connect(null, actions)(App);
