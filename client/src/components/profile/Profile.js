import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Container, Jumbotron, Button, Col } from 'react-bootstrap';
import * as actions from '../../actions';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Profile = ({ profile }) => {
	const { firstName, lastName, birthday, weight, height, location } = profile;

	const convertHeight = height => {
		let feet = parseInt(height / 12);
		let inches = parseInt(height % 12);
		return `${feet}' ${inches}"`;
	};

	const renderProfile = () => {
		if (Object.keys(profile).length > 0) {
			return (
				<div>
					<div>
						<h1>Profile</h1>
					</div>
					<Card style={{ width: '22rem' }}>
						<Card.Header>
							<FontAwesomeIcon icon="user" className="mr-2" />
							{`${firstName} ${lastName}`}
						</Card.Header>
						<Card.Body>
							<Card.Text>Age: {moment(birthday).toNow()}</Card.Text>
							<Card.Text>
								Location: {location ? location.city + ', ' : ''}{' '}
								{location ? location.state.toUpperCase() : ''}
							</Card.Text>
							<Card.Text>Weight: {weight ? weight : ''}</Card.Text>
							<Card.Text>
								Height: {height ? convertHeight(height) : ''}
							</Card.Text>
							<Card.Text>Member Since: </Card.Text>
							<Link to={'/account/profile/form'}>
								<Button variant="primary" size="sm">
									Edit Profile
								</Button>
							</Link>
						</Card.Body>
					</Card>
				</div>
			);
		} else {
			return (
				<Jumbotron>
					<h1>No Profile</h1>
					<p>You have not created a profile yet</p>
					<p>
						<Button>Create Profile</Button>
					</p>
				</Jumbotron>
			);
		}
	};

	return (
		<Container className="m-5">
			<Col style={{ width: '500px' }}>{renderProfile()}</Col>
		</Container>
	);
};

const mapStateToProps = ({ profile }) => {
	return { profile };
};

export default connect(mapStateToProps, actions)(Profile);
