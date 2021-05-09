import { createStore } from "easy-peasy";
import { FlowElement } from "react-flow-renderer";
import { nodesModel } from "../store/models/nodesModel";
import { IStoreType } from "../store/types/storeType";

const node: FlowElement = {
	"id": "ebfc3757-d39d-443d-b29f-e535d218f376",
	"data": {
		"id": null,
		"type": "M",
		"label": "Another Node",
		"canMerge": false,
		"taskId": "TT_SrProjectionSurvey",
		"workplaceId": "WP_Projection"
	},
	"position": {
		"x": 100,
		"y": 125
	}
};

test('Awdd node action', async () => {
	const store = createStore<IStoreType>({
		nodes: nodesModel,
	});

	// Add node
	store.getActions().nodes.addNode(node);

	// Assert
	expect(store.getState().nodes.nodes).toEqual([node])
});