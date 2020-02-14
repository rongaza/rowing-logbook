import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Form, Col, Row, Button, InputGroup } from 'react-bootstrap';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';

const WorkoutForm = props => {
	const _id = props.workout ? props.workout._id : '';
	const [date, setDate] = useState(props.workout ? props.workout.date : new moment());
	const [type, setType] = useState(props.workout ? props.workout.type : 'Indoor Rower');
	const [distance, setDistance] = useState(props.workout ? props.workout.distance : '');
	const [hours, setHours] = useState(props.workout ? props.workout.time.hours : '');
	const [mins, setMins] = useState(props.workout ? props.workout.time.mins : '');
	const [secs, setSecs] = useState(props.workout ? props.workout.time.secs : '');
	const [tenths, setTenths] = useState(props.workout ? props.workout.time.tenths : '');
	const [weightClass, setWeightClass] = useState(props.workout ? props.workout.weightClass : '');
	const [notes, setNotes] = useState(props.workout ? props.workout.notes : '');

	const renderSubmitButtons = () => {
		if (props.workout) {
			return (
				<React.Fragment>
					<Button variant="primary" type="submit">
						Submit
					</Button>
					<Link to={'/workouts'}>
						<Button variant="secondary" className="ml-2">
							Cancel
						</Button>
					</Link>
					<Button variant="danger" onClick={handleDelete} className="ml-2">
						Delete
					</Button>
				</React.Fragment>
			);
		} else {
			return (
				<Button variant="primary" type="submit">
					Submit
				</Button>
			);
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		props.onSubmit({
			_id,
			date,
			type,
			distance,
			time: {
				hours,
				mins,
				secs,
				tenths,
				totalSeconds: hours * 60 * 60 + mins * 60 + secs + tenths / 10,
			},
			weightClass,
			notes,
		});
		props.history.push('/workouts');
	};

	const handleDelete = () => {
		props.deleteWorkout(_id);
		props.history.push('/workouts');
	};
	return (
		<Form className="" onSubmit={handleSubmit}>
			<Row className="pb-3">
				<Col md={2}>
					<Form.Label>Date</Form.Label>
				</Col>
				<Col md={4}>
					<DayPickerInput
						onDayChange={day => setDate(day)}
						formatDate={formatDate}
						parseDate={parseDate}
						placeholder={`${formatDate(new Date())}`}
					/>
				</Col>
			</Row>
			<Row>
				<Col md={2}>
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
				<Col md={2}>
					<Form.Label>Distance</Form.Label>
				</Col>
				<Col md={4}>
					<Form.Group controlId="distance">
						<InputGroup>
							<Form.Control
								required
								type="number"
								placeholder="Enter Distance"
								value={distance}
								onChange={e => setDistance(parseInt(e.target.value))}
							/>
							<InputGroup.Append>
								<InputGroup.Text id="basic-addon2">
									Meters
								</InputGroup.Text>
							</InputGroup.Append>
						</InputGroup>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col sm={2}>
					<Form.Label>Time</Form.Label>
				</Col>
				<Col sm={2}>
					<Form.Control
						type="number"
						placeholder="Hours"
						value={hours}
						onChange={e => setHours(parseInt(e.target.value))}
					/>
				</Col>
				<Col sm={2}>
					<Form.Control
						type="number"
						placeholder="Minutes"
						value={mins}
						onChange={e => setMins(parseInt(e.target.value))}
					/>
				</Col>
				<Col sm={2}>
					<Form.Control
						type="number"
						placeholder="Seconds"
						value={secs}
						onChange={e => setSecs(parseInt(e.target.value))}
					/>
				</Col>
				<Col sm={2}>
					<Form.Control
						type="number"
						placeholder="Tenths"
						value={tenths}
						onChange={e => setTenths(parseInt(e.target.value))}
					/>
				</Col>
			</Row>
			<Row className="py-2">
				<Col md={2}>
					<Form.Label>Weight Class</Form.Label>
				</Col>
				<Col md={3}>
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
				<Col md={2}>
					<Form.Label>Notes</Form.Label>
				</Col>
				<Col md={5}>
					<Form.Control
						as="textarea"
						rows="3"
						value={notes}
						onChange={e => setNotes(e.target.value)}
					/>
				</Col>
			</Row>
			<Row className="pt-3">
				<Col sm={6} className="offset-sm-2">
					{renderSubmitButtons()}
				</Col>
			</Row>
		</Form>
	);
};

export default connect(null)(withRouter(WorkoutForm));
