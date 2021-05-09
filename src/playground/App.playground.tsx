import { Actions, State } from "easy-peasy";
import React from 'react';
import './App.css';
import { FlowElement } from "react-flow-renderer";
import { useStoreAction, useStoreState } from "../store/hooks";
import { IStoreType } from "../store/types/storeType";

function AppPlayground() {

	const nodesStates = useStoreState((state: State<IStoreType>) => state.nodes);
	const nodesActions = useStoreAction((actions: Actions<IStoreType>) => actions.nodes);

	const fetchNodes = () => {
		nodesActions.fetchNodes('test');
	}

	const addNode = () => {
		const node: FlowElement = {
			"id": "ebfc3757-d39d-443d-b29f-e535d218f37v",
			"data": {
				"id": null,
				"type": "M",
				"label": "Add node",
				"canMerge": false,
				"taskId": "TT_SrProjectionSurvey",
				"workplaceId": "WP_Projection"
			},
			"position": {
				"x": 150,
				"y": 125
			}
		}

		nodesActions.addNode(node);
	}

	const updateNode = () => {
		const node: FlowElement = {
			"id": "ebfc3757-d39d-443d-b29f-e535d218f37v",
			"data": {
				"id": null,
				"type": "M",
				"label": "Add node UPDATE",
				"canMerge": false,
				"taskId": "TT_SrProjectionSurvey",
				"workplaceId": "WP_Projection"
			},
			"position": {
				"x": 150,
				"y": 125
			}
		}

		nodesActions.updateNode(node);
	}

	const showNodes = () => {
		console.log(nodesStates.nodes);
	}


	return (
		<div className="App">
			<p>Test</p>
			<button onClick={fetchNodes}>fetch nodes</button>
			<button onClick={addNode}>add node</button>
			<button onClick={updateNode}>update node</button>
			<button onClick={showNodes}>show nodes</button>
		</div>
	);
}

export default AppPlayground;
