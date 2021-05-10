import { Actions, State } from "easy-peasy";
import { FC } from "react";
import ReactFlow, { Background, BackgroundVariant, Elements, FlowElement } from "react-flow-renderer";
import { useStoreAction, useStoreState } from "../../store/hooks";
import { IStoreType } from "../../store/types/storeType";

export const NodesFlow: FC = (): JSX.Element => {

	const nodesStates = useStoreState((state: State<IStoreType>) => state.nodes);
	const nodesActions = useStoreAction((actions: Actions<IStoreType>) => actions.nodes);

	const onNodeRemove = (node: Elements<FlowElement>) => {
		const nodeElement: FlowElement = node[0];
		nodesActions.removeNode(nodeElement);
	};

	const onFetchNodes = async () => {
		nodesActions.fetchNodes('test');
	}

	const onSyncNode = async () => {
		nodesActions.syncNodes('test');
	}

	return (
		<>
			<button onClick={onFetchNodes}>Load</button>
			<button onClick={onSyncNode}>Sync</button>
			<ReactFlow elements={nodesStates.nodes}
			           onElementsRemove={onNodeRemove}
			           deleteKeyCode={46}
			           snapToGrid={true}
			>
				<Background
					variant={BackgroundVariant.Dots}
				/>
			</ReactFlow>
		</>
	)
}