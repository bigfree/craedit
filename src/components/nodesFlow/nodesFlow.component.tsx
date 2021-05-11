import {Actions, State} from "easy-peasy";
import {FC} from "react";
import ReactFlow, {addEdge, Background, BackgroundVariant, Controls, FlowElement} from "react-flow-renderer";
import {Connection, Edge} from "react-flow-renderer/dist/types";
import {useStoreAction, useStoreState} from "../../store/hooks";
import {IStoreType} from "../../store/types/storeType";

export const NodesFlow: FC = (): JSX.Element => {

    const nodesStates = useStoreState((state: State<IStoreType>) => state.nodes);
    const nodesActions = useStoreAction((actions: Actions<IStoreType>) => actions.nodes);

    /**
     * Remove node from state.node
     * @param {FlowElement[]} node
     */
    const onNodeRemove = (node: FlowElement[]) => {
        const nodeElement: FlowElement = node[0];
        nodesActions.removeNode(nodeElement);
    };

    /**
     * Nodes connect event
     * @param {Edge | Connection} params
     */
    const onNodeConnect = (params: Edge | Connection) => {
        const nodeElements: FlowElement[] = addEdge(params, nodesStates.nodes);
        nodesActions.addConnection(nodeElements);
    }

    const onFetchNodes = async () => {
        nodesActions.fetchNodes('test');
    }

    const onSyncNode = async () => {
        nodesActions.syncNodes('test');
    }

    const onSaveNode = async () => {
        nodesActions.saveNodes('test');
    }

    return (
        <>
            <button onClick={onFetchNodes}>Load</button>
            <button onClick={onSyncNode}>Sync</button>
            <button onClick={onSaveNode}>Save</button>
            <ReactFlow elements={nodesStates.nodes}
                       onElementsRemove={onNodeRemove}
                       onConnect={onNodeConnect}
                       deleteKeyCode={46}
                       snapToGrid={true}
            >
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={12}
                />
                <Controls/>
            </ReactFlow>
        </>
    )
}