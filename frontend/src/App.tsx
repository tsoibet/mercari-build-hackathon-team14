import React from "react";
import logo from "./logo.svg";
import Header from "./components/Header/index";
import "./App.less";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Header />
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit2 <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
