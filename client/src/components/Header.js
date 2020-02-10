import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

const Header = ({ auth }) => {
	const renderContent = () => {
		switch (auth) {
			case null:
				return;
			case false:
				return (
					<React.Fragment>
						<Nav></Nav>
						<Button
							className="ml-auto"
							variant="outline-primary"
							href="/auth/google"
						>
							Login with Google
						</Button>
					</React.Fragment>
				);
			default:
				return (
					<React.Fragment>
						<Nav className="mr-auto">
							<Navbar.Text>
								<Link to={'/workouts'}>LOG</Link>
							</Navbar.Text>
							<Nav.Link>HISTORY</Nav.Link>
							<Nav.Link>RANKINGS</Nav.Link>
							<Nav.Link>RANKED WORKOUTS</Nav.Link>
						</Nav>
						<Button href="/api/logout" variant="outline-primary">
							Logout
						</Button>
					</React.Fragment>
				);
		}
	};
	return (
		<Navbar className="navbar-light bg-light" expand="lg">
			<Navbar.Brand>
				<Link to={auth ? '/workouts' : '/'}>Rowing App</Link>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">{renderContent()}</Navbar.Collapse>
		</Navbar>
	);
};

const mapStateToProps = ({ auth }) => {
	return {
		auth,
	};
};
export default connect(mapStateToProps)(Header);
