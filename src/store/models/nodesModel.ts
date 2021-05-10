import axios from "axios";
import { action, Actions, Helpers, State, thunk } from "easy-peasy";
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

	// Add connection between nodes merge state.nodes
	addConnection: action((state: State<INodesType>, payload: FlowElement[]) => {
		state.nodes = payload;
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

	// Synchronize nodes between state.nodes and server nodes
	syncNodes: thunk(async (actions: Actions<INodesType>, payload: string, helpers: Helpers<INodesType, any, any>) => {
		try {
			const { data } = await axios.get(`http://localhost:3000/${payload}.json`);
			const stateNodes: FlowElement[] = helpers.getState().nodes;

			// Diff StateNodes
			// TODO: rewrite to export method
			const diffStateNodes = stateNodes.filter((node: FlowElement) => {
				return !data.map((node: FlowElement) => {
					return JSON.stringify(node);
				}).includes(JSON.stringify(node));
			});

			// Diff FetchNodes
			const diffFetchNodes = data.filter((node: FlowElement) => {
				return !stateNodes.map((node: FlowElement) => {
					return JSON.stringify(node);
				}).includes(JSON.stringify(node));
			});

			// Diff merge results
			const diff = [...diffStateNodes, ...diffFetchNodes];

			// If diff results is greater when 0 fetch nodes from server
			if (diff.length > 0) {
				actions.replaceNodes(data);
			}
		} catch (error) {
			actions.setFetchError(error.message);
		}
	}),
};