import React from 'react';
import { Navbar, Nav, Dropdown, Image, Row, Col } from 'react-bootstrap';
import fasimLogo from '../../assets/fasim.png';

class MenuBar extends React.Component {
	render() {
		return (
			<Navbar bg="primary" variant="dark" fixed="top">
				<Navbar.Brand style={{ color: 'white' }}>
					<Row>
						<Col lg="4">
							<Image style={{ width: '2em' }} src={fasimLogo} />
						</Col>
						<Col lg="8" className="text-left my-auto">
							FASIM
						</Col>
					</Row>
				</Navbar.Brand>
				<Navbar.Toggle style={{ color: 'white' }} aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav>
						<Dropdown>
							<Dropdown.Toggle variant="transparent" id="file-menu" style={{ color: 'white' }}>
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
							<Dropdown.Toggle variant="transparent" id="help-menu" style={{ color: 'white' }}>
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
