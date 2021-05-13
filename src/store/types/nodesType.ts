import { Action, Thunk } from 'easy-peasy';
import { FlowElement } from "react-flow-renderer";

/**
 * Nodes interface
 */
export interface NodesStoreType {
	nodes: FlowElement[];
	error: string | null;
	addNode: Action<NodesStoreType, FlowElement>;
	addNodes: Action<NodesStoreType, FlowElement[]>;
	updateNode: Action<NodesStoreType, FlowElement>;
	updateNodes?: Action<NodesStoreType, FlowElement[]>;
	findNode: Action<NodesStoreType, FlowElement>;
	removeNode: Action<NodesStoreType, FlowElement>;
	removeNodes?: Action<NodesStoreType, FlowElement[]>;
	replaceNodes: Action<NodesStoreType, FlowElement[]>;
	setError: Action<NodesStoreType, string | null>;
	addConnection: Action<NodesStoreType, FlowElement[]>;
	cloneNode: Thunk<NodesStoreType, FlowElement | null>;
	fetchNodes: Thunk<NodesStoreType, string>;
	saveNodes: Thunk<NodesStoreType, string, NodesStoreType>;
	syncNodes: Thunk<NodesStoreType, string, NodesStoreType>;
}