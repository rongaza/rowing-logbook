import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/';
import moment from 'moment';

import { Container, Form, Row, Col, Button, InputGroup } from 'react-bootstrap';

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const days = () => {
	let days = [];
	let count = 1;
	while (count < 32) {
		days.push(count);
		count += 1;
	}
	return days;
};

const years = () => {
	const years = [];
	let count = 110;
	let currYear = moment().format('YYYY');
	let startYear = parseInt(currYear) - 110;
	while (count >= 0) {
		years.push(startYear);
		startYear += 1;
		count -= 1;
	}
	return years;
};

const ProfileForm = ({ profile, updateProfile, history }) => {
	const [email, setEmail] = useState(Object.keys(profile).length !== 0 ? profile.email : '');
	const [firstName, setFirstName] = useState(Object.keys(profile).length !== 0 ? profile.firstName : '');
	const [lastName, setLastName] = useState(Object.keys(profile).length !== 0 ? profile.lastName : '');
	const [gender, setGender] = useState(Object.keys(profile).length !== 0 ? profile.gender : '');
	const [heightFT, setHeightFT] = useState(
		Object.keys(profile).length !== 0 ? parseInt(profile.height / 12) : ''
	);
	const [heightIN, setHeightIN] = useState(
		Object.keys(profile).length !== 0 ? parseInt(profile.height % 12) : ''
	);
	const [weight, setWeight] = useState(Object.keys(profile).length !== 0 ? profile.weight : '');
	const [month, setMonth] = useState(
		Object.keys(profile).length !== 0 ? moment(profile.birthday).format('MMMM') : ''
	);
	const [day, setDay] = useState(Object.keys(profile).length !== 0 ? moment(profile.birthday).format('D') : '');
	const [year, setYear] = useState(
		Object.keys(profile).length !== 0 ? moment(profile.birthday).format('YYYY') : ''
	);
	const [city, setCity] = useState(Object.keys(profile).length !== 0 ? profile.location.city : '');
	const [state, setState] = useState(Object.keys(profile).length !== 0 ? profile.location.state : '');

	const handleSubmit = e => {
		e.preventDefault();
		updateProfile({
			email,
			firstName,
			lastName,
			gender,
			height: heightFT * 12 + heightIN,
			weight,
			birthday: moment(`${month} ${day}, ${year}`),
			location: { state, city },
		});
		history.push('/account/profile');
	};
	return (
		<Container>
			<Form>
				<Row>
					<Col sm={2}>
						<Form.Label>Email</Form.Label>
					</Col>
					<Col sm={5}>
						<Form.Group>
							<Form.Control
								placeholder="Email Address"
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col sm={2}>
						<Form.Label>First Name</Form.Label>
					</Col>
					<Col sm={5}>
						<Form.Group>
							<Form.Control
								placeholder="First Name"
								value={firstName}
								onChange={e => {
									setFirstName(e.target.value);
								}}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col sm={2}>
						<Form.Label>Last Name</Form.Label>
					</Col>
					<Col sm={5}>
						<Form.Group>
							<Form.Control
								placeholder="Last Name"
								value={lastName}
								onChange={e => setLastName(e.target.value)}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col sm={2}>
						<Form.Label>Gender</Form.Label>
					</Col>
					<Col sm={5}>
						<Form.Group>
							<Form.Control
								placeholder="Gender"
								as="select"
								value={gender}
								onChange={e => setGender(e.target.value)}
							>
								<option>Male</option>
								<option>Female</option>
							</Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col sm={2}>
						<Form.Label>Height</Form.Label>
					</Col>
					<Col lg={2}>
						<Form.Group>
							<InputGroup>
								<Form.Control
									placeholder="Height"
									type="number"
									value={heightFT}
									onChange={e => {
										setHeightFT(parseInt(e.target.value));
									}}
								/>
								<InputGroup.Append>
									<InputGroup.Text id="basic-addon2">
										ft
									</InputGroup.Text>
								</InputGroup.Append>
							</InputGroup>
						</Form.Group>
					</Col>
					<Col lg={2}>
						<Form.Group>
							<InputGroup>
								<Form.Control
									placeholder="Inches"
									type="number"
									value={heightIN}
									onChange={e => {
										setHeightIN(parseInt(e.target.value));
									}}
								/>
								<InputGroup.Append>
									<InputGroup.Text id="basic-addon2">
										in
									</InputGroup.Text>
								</InputGroup.Append>
							</InputGroup>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col sm={2}>
						<Form.Label>Weight</Form.Label>
					</Col>
					<Col sm={4}>
						<Form.Group>
							<Form.Control
								placeholder="Weight"
								type="number"
								value={weight}
								onChange={e => setWeight(parseInt(e.target.value))}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col sm={2}>
						<Form.Label>Birthday</Form.Label>
					</Col>
					<Col sm={2}>
						<Form.Group>
							<Form.Control
								as="select"
								value={month}
								onChange={e => setMonth(e.target.value)}
							>
								{months.map(month => (
									<option>{month}</option>
								))}
							</Form.Control>
						</Form.Group>
					</Col>
					<Col sm={1}>
						<Form.Group>
							<Form.Control
								as="select"
								value={day}
								onChange={e => setDay(parseInt(e.target.value))}
							>
								{days().map(day => (
									<option>{day}</option>
								))}
							</Form.Control>
						</Form.Group>
					</Col>
					<Col sm={2}>
						<Form.Group>
							<Form.Control
								as="select"
								value={year}
								onChange={e => setYear(parseInt(e.target.value))}
							>
								{years().map(year => (
									<option>{year}</option>
								))}
							</Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col sm={2}>
						<Form.Label>City</Form.Label>
					</Col>
					<Col sm={5}>
						<Form.Group controlId="formGridCity">
							<Form.Control
								placeholder="City"
								value={city}
								onChange={e => setCity(e.target.value)}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col sm={2}>
						<Form.Label>State</Form.Label>
					</Col>
					<Col sm={5}>
						<Form.Group controlId="formGridState">
							<Form.Control
								placeholder="State"
								value={state}
								onChange={e => setState(e.target.value)}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Button type="submit" onClick={handleSubmit}>
					Submit
				</Button>
			</Form>
		</Container>
	);
};

const mapStateToProps = ({ profile }) => {
	return {
		profile,
	};
};

export default connect(mapStateToProps, actions)(withRouter(ProfileForm));
