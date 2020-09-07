const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');
const { nativeImage } = require('electron');

let mainWindow;

function createWindow() {
	const image = nativeImage.createFromPath(path.join(__dirname, 'logo512.png'));
	app.dock.setIcon(image);
	mainWindow = new BrowserWindow({
		title: 'FASIM - Finite Automata Simulator',
		icon: nativeImage.createFromPath(path.join(__dirname, 'favicon.ico')),
		width: 1280,
		height: 720
	});
	mainWindow.loadURL(isDev ? 'http://localhost:3000/' : `file://${path.join(__dirname, '../build/index.html')}`);
	mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});
