import React from 'react';
import MenuBar from './components/nav/MenuBar';
import Sketch from './components/sketch/Sketch';

class App extends React.Component {
	render() {
		return (
			<div>
				<MenuBar />
				<Sketch />
			</div>
		);
	}
}

export default App;
