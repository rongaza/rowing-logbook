import React from 'react';
import LandingLogo from '../assets/images/landing-rower.jpg';

import { Jumbotron, Button, Container, Col, Image } from 'react-bootstrap';

const Landing = () => {
	return (
		<Container>
			<Col>
				<Jumbotron className="text-center mx-auto mt-5" style={{ width: '500px' }}>
					<Container>
						<Image src={LandingLogo} fluid />
						<h1 className="mt-3">Rowing Logbook</h1>
						<p>Track your rowing workouts</p>

						<Button
							className="ml-auto"
							variant="outline-primary"
							href="/auth/google"
						>
							Login with Google
						</Button>
					</Container>
				</Jumbotron>
			</Col>
		</Container>
	);
};

export default Landing;
