import React, { Component } from 'react';
import { Modal, Container, Row } from 'react-bootstrap';
import QRCode from 'qrcode.react';
import Axios from 'axios';

export default class QRModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			qrCodeValue: ''
		};
		this.getQRImage = this.getQRImage.bind(this);
		this.hasUserPing = this.hasUserPing.bind(this);
	}

	getQRImage() {
		if (this.props.show) {
			if (this.state.qrCodeValue.length) {
				Axios({
					method: 'DELETE',
					url: `https://fasim.herokuapp.com/qr?qr=${this.state.qrCodeValue}`
				}).then((res) => {
					console.log(res.data);
				});
			}
			Axios({
				method: 'GET',
				url: 'https://fasim.herokuapp.com/qr'
			}).then((res) => {
				this.setState({ qrCodeValue: res.data.toString() });
			});
		}
	}

	hasUserPing() {
		if (this.props.show) {
			Axios({
				method: 'GET',
				url: `https://fasim.herokuapp.com/has-user?qr=${this.state.qrCodeValue}`
			}).then((res) => {
				if (res.data.status !== 'No') {
					this.props.handleQRClose();
					this.props.setUser(res.data);
				}
			});
		}
	}

	componentDidMount() {
		this.getQRImage();
		setInterval(this.getQRImage, 20 * 1000);
		setInterval(this.hasUserPing, 500);
	}

	render() {
		return (
			<Modal
				style={{ zIndex: 9999 }}
				show={this.props.show}
				centered
				keyboard={false}
				backdrop="static"
				onHide={this.props.handleQRClose}
			>
				<Modal.Header closeButton>
					<Modal.Title>Welcome to FASIM</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<Row>
							<p>
								Please use our app to scan this QR Code{' '}
								<span role="img" aria-labelledby="emo" className="h4">
									👇🏻
								</span>
							</p>
						</Row>
						<Row className="justify-content-center">
							<QRCode
								value={this.state.qrCodeValue}
								level="M"
								renderAs="svg"
								size={300}
								imageSettings={{
									width: 60,
									height: 60,
									src:
										'https://cdn.discordapp.com/attachments/759950229473722438/782512125951082496/fasim.png'
								}}
							/>
						</Row>
					</Container>
				</Modal.Body>
			</Modal>
		);
	}
}
