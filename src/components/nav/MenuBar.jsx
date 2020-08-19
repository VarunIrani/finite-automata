import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';

class MenuBar extends React.Component {
	render() {
		return (
			<Navbar bg="primary" variant="dark" fixed="top">
				<Navbar.Brand style={{ color: 'white' }}>FASIM</Navbar.Brand>
				<Navbar.Toggle style={{ color: 'white' }} aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Dropdown>
							<Dropdown.Toggle variant="primary" id="file-menu">
								File
							</Dropdown.Toggle>
							<Dropdown.Menu aria-labelledby="file-menu">
								<Dropdown.Item
									onClick={() => {
										this.props.newSketch();
									}}
								>
									New
								</Dropdown.Item>
								<Dropdown.Item>Import</Dropdown.Item>
								<Dropdown.Item>Export</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item>Exit</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						<Dropdown>
							<Dropdown.Toggle variant="primary" id="help-menu">
								Help
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item>Manual</Dropdown.Item>
								<Dropdown.Item>Contact</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default MenuBar;
