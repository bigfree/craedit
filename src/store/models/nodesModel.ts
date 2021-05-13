import axios from "axios";
import { action, Actions, Helpers, State, thunk } from "easy-peasy";
import { FlowElement } from "react-flow-renderer";
import { Edge } from "react-flow-renderer/dist/types";
import { WFNode } from "../../types/node";
import cloneNode from "../services/cloneNode.service";
import { NodesStoreType } from "../types/nodesType";

export const nodesModel: NodesStoreType = {
	nodes: [],
	error: null,

	// Push one node to state.nodes
	addNode: action((state: State<NodesStoreType>, payload: FlowElement) => {
		state.nodes = [...state.nodes, payload];
	}),

	// Push nodes to state.nodes
	addNodes: action((state: State<NodesStoreType>, payload: FlowElement[]) => {
		state.nodes = [...state.nodes, ...payload];
	}),

	// Update one node in state.nodes
	updateNode: action((state: State<NodesStoreType>, payload: FlowElement) => {
		state.nodes.find((node: FlowElement, index: number) => {
			if (node.id === payload.id) {
				state.nodes[index] = payload;
				return true;
			}
			return false;
		});
	}),

	// Find node in state.nodes
	findNode: action((state: State<NodesStoreType>, payload: FlowElement) => {
		state.nodes.find((node: FlowElement) => {
			if (node.id === payload.id) {
				return node;
			}
			return false;
		});
	}),

	// Remove one node in state.nodes
	removeNode: action((state: State<NodesStoreType>, payload: FlowElement) => {
		state.nodes.find((node: FlowElement, index: number) => {
			if ((node as WFNode).id === payload.id) {
				state.nodes.splice(index, 1);
				return true;
			}
			return false;
		});

		state.nodes.find((node: FlowElement, index: number) => {
			if ((node as Edge).target === payload.id || (node as Edge).source === payload.id) {
				state.nodes.splice(index, 1);
			}
			return false;
		});
	}),

	// Replace all nodes in state.nodes
	replaceNodes: action((state: State<NodesStoreType>, payload: FlowElement[]) => {
		state.nodes = payload;
	}),

	// Set if fetchNodes catch error
	setError: action((state: State<NodesStoreType>, payload: string | null) => {
		state.error = payload;
	}),

	// Add connection between nodes merge state.nodes
	addConnection: action((state: State<NodesStoreType>, payload: FlowElement[]) => {
		state.nodes = payload;
	}),

	// Clone node and add to state.nodes
	cloneNode: thunk((actions: Actions<NodesStoreType>, payload: WFNode) => {
		actions.addNode(cloneNode(payload));
	}),

	// Fetch nodes from server by WorkFlow ID
	fetchNodes: thunk(async (actions: Actions<NodesStoreType>, payload: string) => {
		try {
			const { data } = await axios.get(`http://localhost:3000/${payload}.json`);
			actions.replaceNodes(data);
		} catch (error) {
			actions.setError(error.message);
		}
	}),

	// Save nodes on server
	saveNodes: thunk(async (actions: Actions<NodesStoreType>, payload: string, helpers: Helpers<NodesStoreType, any, any>) => {
		try {
			const stateNodes: FlowElement[] = helpers.getState().nodes;
			const results = await axios.post(`http://localhost:3000/${payload}.json`, stateNodes);

			console.log(results);
		} catch (error) {
			actions.setError(error.message);
		}
	}),

	// Synchronize nodes between state.nodes and server nodes
	syncNodes: thunk(async (actions: Actions<NodesStoreType>, payload: string, helpers: Helpers<NodesStoreType, any, any>) => {
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
			actions.setError(error.message);
		}
	}),
};