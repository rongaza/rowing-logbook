import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import LoadingBar from 'react-redux-loading-bar';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faCheckSquare,
	faUser,
	faRoad,
	faClock,
	faTachometerAlt,
	faBatteryHalf,
} from '@fortawesome/free-solid-svg-icons';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import WorkoutForm from './WorkoutForm';
import EditWorkout from './EditWorkout';
import ProtectedRoute from './ProtectedRoute';
import WorkoutDetails from './WorkoutDetails';
import Charts from './sidebar/Charts';
import Profile from './profile/Profile';
import ProfileForm from './profile/ProfileForm';

library.add(faCheckSquare, faUser, faRoad, faClock, faTachometerAlt, faBatteryHalf);

export const App = ({ fetchUser }) => {
	useEffect(() => {
		fetchUser();
	});
	return (
		<Container fluid className="overf">
			<BrowserRouter>
				<React.Fragment>
					<Header />
					<LoadingBar />
					<Route path="/" exact component={Landing} />
					<Route path="/charts" exact component={Charts} />
					<ProtectedRoute path="/workouts" exact component={Dashboard} />
					<ProtectedRoute path="/workouts/new" exact component={WorkoutForm} />
					<ProtectedRoute path="/workouts/edit/:id" exact component={EditWorkout} />
					<ProtectedRoute path="/workouts/details/:id" exact component={WorkoutDetails} />
					<ProtectedRoute path="/account/profile" exact component={Profile} />
					<ProtectedRoute path="/account/profile/form" exact component={ProfileForm} />
				</React.Fragment>
			</BrowserRouter>
		</Container>
	);
};

export default connect(null, actions)(App);
