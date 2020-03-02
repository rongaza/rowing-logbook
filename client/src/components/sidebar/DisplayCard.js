import React from 'react';
import { Card } from 'react-bootstrap';

const Meters = ({ title, distance }) => {
	return (
		<Card bg="primary" text="white">
			<Card.Body>
				<Card.Text className="text-center">{distance}</Card.Text>
			</Card.Body>
			<Card.Footer className="text-center">{title}</Card.Footer>
		</Card>
	);
};

export default Meters;
