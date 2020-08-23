import { Card, Button, ButtonGroup } from 'react-bootstrap';
import React from 'react';
import { ReactComponent as StateSymbol } from '../../assets/symbols/state.svg';
import { ReactComponent as InitState } from '../../assets/symbols/init_state.svg';
import { ReactComponent as FinalState } from '../../assets/symbols/final_state.svg';
import { StateType } from '../sketch/State';

export default class ToolBar extends React.Component {
	render() {
		return (
			<Card bg="white" text="dark">
				<ButtonGroup vertical>
					<Button
						variant="white"
						className="pb-3 pt-3"
						onClick={() => {
							this.props.addState(StateType.INITIAL);
						}}
					>
						<InitState />
					</Button>

					<Button
						variant="white"
						className="pb-3 pt-3"
						onClick={() => {
							this.props.addState(StateType.NORMAL);
						}}
					>
						<StateSymbol />
					</Button>

					<Button
						variant="white"
						className="pb-3 pt-3"
						onClick={() => {
							this.props.addState(StateType.FINAL);
						}}
					>
						<FinalState />
					</Button>
				</ButtonGroup>
			</Card>
		);
	}
}
