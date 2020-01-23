import React, { useState } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Form, Col, Row, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const WorkoutNew = ({ addWorkout }) => {
	const [date, setDate] = useState(new Date());
	const [type, setType] = useState('Indoor Rower');
	const [distance, setDistance] = useState('');
	const [hours, setHours] = useState('');
	const [mins, setMins] = useState('');
	const [secs, setSecs] = useState('');
	const [tenths, setTenths] = useState('');
	const [weightClass, setWeightClass] = useState(null);
	const [notes, setNotes] = useState('');

	const convertTime = () => {
		return hours + mins + secs + tenths;
	};
	const handleSubmit = e => {
		e.preventDefault();
		addWorkout({
			date,
			type,
			distance,
			time: convertTime(),
			weightClass,
			notes,
		});
		setDate(new Date());
		setType('Indoor Rower');
		setDistance('');
		setHours('');
		setMins('');
		setSecs('');
		setTenths('');
		setWeightClass('null');
		setNotes('');
	};

	return (
		<Form className="" onSubmit={handleSubmit}>
			<h2>Add Workout</h2>
			<Row className="pb-3">
				<Col md={4}>
					<Form.Label>Date</Form.Label>
				</Col>
				<Col md={4}>
					<DatePicker selected={date} onChange={date => setDate(date)} />
				</Col>
			</Row>
			<Row>
				<Col md={4}>
					<Form.Label>Type</Form.Label>
				</Col>
				<Col md={4}>
					<Form.Group controlId="type">
						<Form.Control
							required
							as="select"
							onChange={e => setType(e.target.value)}
						>
							<option value="Indoor Rower">Indoor Rower</option>
							<option value="SkiErg">SkiErg</option>
							<option value="BikeErg">BikeErg</option>
							<option value="Echo Bike">Echo Bike</option>
						</Form.Control>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col md={4}>
					<Form.Label>Distance</Form.Label>
				</Col>
				<Col md={4}>
					<Form.Group controlId="distance">
						<Form.Control
							required
							type="number"
							placeholder="Enter Distance"
							value={distance}
							onChange={e => setDistance(e.target.value)}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col md={4}>
					<Form.Label>Time</Form.Label>
				</Col>
				<Col md={2}>
					<Form.Control
						type="number"
						placeholder="Hours"
						value={hours}
						onChange={e => setHours(parseInt(e.target.value))}
					/>
				</Col>
				<Col md={2}>
					<Form.Control
						type="number"
						placeholder="Minutes"
						value={mins}
						onChange={e => setMins(parseInt(e.target.value))}
					/>
				</Col>
				<Col md={2}>
					<Form.Control
						type="number"
						placeholder="Seconds"
						value={secs}
						onChange={e => setSecs(parseInt(e.target.value))}
					/>
				</Col>
				<Col md={2}>
					<Form.Control
						type="number"
						placeholder="Tenths"
						value={tenths}
						onChange={e => setTenths(parseInt(e.target.value))}
					/>
				</Col>
			</Row>
			<Row className="py-2">
				<Col md={4}>
					<Form.Label>Weight Class</Form.Label>
				</Col>
				<Col md={4}>
					<fieldset>
						<Form.Group controlId="weightClass">
							<Form.Check
								custom
								type="radio"
								label="Heavy"
								name="formHorizontalRadios"
								id="formHorizontalRadios1"
								value={weightClass === 'heavy' ? 'on' : 'off'}
								onChange={e => setWeightClass('Heavy')}
							/>
							<Form.Check
								custom
								type="radio"
								label="Light"
								name="formHorizontalRadios"
								id="formHorizontalRadios2"
								value={weightClass === 'light' ? 'on' : 'off'}
								onChange={e => setWeightClass('Light')}
							/>
						</Form.Group>
					</fieldset>
				</Col>
			</Row>
			<Row>
				<Col md={4}>
					<Form.Label>Notes</Form.Label>
				</Col>
				<Col>
					<Form.Control as="textarea" rows="3" onChange={e => setNotes(e.target.value)} />
				</Col>
			</Row>
			<Row className="pt-3">
				<Col className="col-md-4 offset-md-4">
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default connect(null, actions)(WorkoutNew);
