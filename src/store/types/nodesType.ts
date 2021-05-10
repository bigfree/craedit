import { Action, Thunk } from 'easy-peasy';
import { FlowElement } from "react-flow-renderer";

/**
 * Nodes interface
 */
export interface INodesType {
	nodes: FlowElement[],
	fetchError: string | null,
	addNode: Action<INodesType, FlowElement>,
	addNodes: Action<INodesType, FlowElement[]>,
	updateNode: Action<INodesType, FlowElement>,
	updateNodes?: Action<INodesType, FlowElement[]>,
	findNode: Action<INodesType, FlowElement>,
	removeNode: Action<INodesType, FlowElement>,
	removeNodes?: Action<INodesType, FlowElement[]>,
	replaceNodes: Action<INodesType, FlowElement[]>,
	setFetchError: Action<INodesType, string | null>,
	fetchNodes: Thunk<INodesType, string>,
	syncNodes: Thunk<INodesType, string, INodesType>,
}