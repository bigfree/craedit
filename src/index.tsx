import { StoreProvider } from "easy-peasy";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { storeModel } from './store/models/storeModel';

ReactDOM.render(
	<StoreProvider store={storeModel}>
		<React.StrictMode>
			<App/>
		</React.StrictMode>
	</StoreProvider>,
	document.getElementById('root')
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
