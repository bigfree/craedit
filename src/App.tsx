import React from 'react';
import style from './App.module.css';
import { NodesFlow } from "./components/nodesFlow/nodesFlow.component";

function App() {
	return (
		<div className={style.app}>
			<NodesFlow/>
		</div>
	);
}

export default App;
