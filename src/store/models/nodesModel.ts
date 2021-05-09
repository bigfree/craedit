import axios from "axios";
import { action, Actions, debug, State, thunk } from "easy-peasy";
import { FlowElement } from "react-flow-renderer";
import { INodesType } from "../types/nodesType";

export const nodesModel: INodesType = {
	nodes: [],
	fetchError: null,

	// Push one node to state.nodes
	addNode: action((state: State<INodesType>, payload: FlowElement) => {
		state.nodes = [...state.nodes, payload];
	}),

	// Push nodes to state.nodes
	addNodes: action((state: State<INodesType>, payload: FlowElement[]) => {
		state.nodes = [...state.nodes, ...payload];
	}),

	// Update one node in state.nodes
	updateNode: action((state: State<INodesType>, payload: FlowElement) => {
		state.nodes.find((node: FlowElement, index: number) => {
			if (node.id === payload.id) {
				state.nodes[index] = payload;
				return true;
			}
			return false;
		});
	}),

	// Find node in state.nodes
	findNode: action((state: State<INodesType>, payload: FlowElement) => {
		state.nodes.find((node: FlowElement) => {
			if (node.id === payload.id) {
				return node;
			}
			return false;
		});
	}),

	// Remove one node in state.nodes
	removeNode: action((state: State<INodesType>, payload: FlowElement) => {

		let findNodeIndex = -1;
		state.nodes.find((node: FlowElement, index: number) => {
			if (node.id === payload.id) {
				findNodeIndex = index;
				return true;
			}
			return false;
		});

		if (findNodeIndex !== -1) {
			state.nodes.splice(findNodeIndex, 1);
		}
	}),

	// Replace all nodes in state.nodes
	replaceNodes: action((state: State<INodesType>, payload: FlowElement[]) => {
		state.nodes = payload;
	}),

	// Set if fetchNodes catch error
	setFetchError: action((state: State<INodesType>, payload: string | null) => {
		state.fetchError = payload;
	}),

	// Fetch nodes from server by WorkFlow ID
	fetchNodes: thunk(async (actions: Actions<INodesType>, payload: string) => {
		try {
			const { data } = await axios.get(`http://localhost:3000/${payload}.json`);
			actions.replaceNodes(data);
		} catch (error) {
			actions.setFetchError(error.message);
		}
	}),
};