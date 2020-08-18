import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

class MenuBar extends React.Component {
	render() {
		return (
			<Navbar bg="primary" variant="dark" sticky="top">
				<Navbar.Brand href="#home">FASIM</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<NavDropdown title="File" id="file-dropdown">
							<NavDropdown.Item>New</NavDropdown.Item>
							<NavDropdown.Item>Import</NavDropdown.Item>
							<NavDropdown.Item>Export</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item>Exit</NavDropdown.Item>
						</NavDropdown>
						<NavDropdown title="Add" id="basic-nav-dropdown">
							<NavDropdown.Item>State</NavDropdown.Item>
							<NavDropdown.Item>Final State</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default MenuBar;
