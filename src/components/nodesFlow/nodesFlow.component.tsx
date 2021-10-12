import { Box, makeStyles } from "@material-ui/core";
import { Actions, State } from "easy-peasy";
import React, { FC, MouseEvent } from "react";
import ReactFlow, {
	addEdge,
	ArrowHeadType,
	Background,
	BackgroundVariant,
	Connection,
	Controls,
	Edge,
	FlowElement,
	isNode
} from "react-flow-renderer";
import { useStoreAction, useStoreState } from "../../store/hooks";
import { IStoreType } from "../../store/types/storeType";
import { edgeTypes } from "../edgeType/edgeType";
import NodeDialog from "../nodeDialog/nodeDialog.component";
import { NodeAction } from "../nodeDialog/nodeDialogTypes";
import { nodeTypes } from "../nodeTypes/nodeTypes";

const useStyles = makeStyles(() => ({
	root: {
		flex: '1 1 auto',
		position: 'relative',
	},
	buttons: {
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: 9999,
	}
}));

type OpenNodeDialog = {
	isOpen: boolean,
	node: null | FlowElement
}

export const NodesFlow: FC = (): JSX.Element => {
	const classes = useStyles();

	const nodesStates = useStoreState((state: State<IStoreType>) => state.nodes);
	const nodesActions = useStoreAction((actions: Actions<IStoreType>) => actions.nodes);

	const [openNodeDialog, setOpenNodeDialog] = React.useState<OpenNodeDialog>({
		isOpen: false,
		node: null,
	});

	/**
	 * Nodes connect event
	 * @param {Edge | Connection} params
	 */
	const onNodeConnect = (params: Edge | Connection) => {

		const customParams = params as Edge;

		customParams.type = "custom";
		customParams.data = { text: 'custom edge' };
		customParams.arrowHeadType = ArrowHeadType.ArrowClosed;

		console.log(customParams);

		const nodeElements: FlowElement[] = addEdge(customParams, nodesStates.nodes);
		nodesActions.addConnection(nodeElements);
	}

	/**
	 * Open dialog menu onClick node
	 * @param {React.MouseEvent} event
	 * @param {FlowElement} node
	 */
	const onNodeMenu = (event: MouseEvent, node: FlowElement) => {
		// If is node element, not edge element
		if (!isNode(node)) {
			return false;
		}
		setOpenNodeDialog({
			isOpen: true,
			node: node
		});
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

	/**
	 * Close node dialog menu event
	 * @param {string} action
	 * @param {FlowElement | null} node
	 * @returns {boolean}
	 */
	const handleClose = (action: string, node: FlowElement | null) => {
		setOpenNodeDialog({
			isOpen: false,
			node: null
		});

		if (null === node) {
			return false;
		}

		switch (action) {
			case NodeAction.Clone:
				nodesActions.cloneNode(node);
				break;
			case NodeAction.Delete:
				nodesActions.removeNode(node);
				break;
		}
	};

	return (
		<Box className={classes.root}>
			<Box className={classes.buttons}>
				<button onClick={onFetchNodes}>Load</button>
				<button onClick={onSyncNode}>Sync</button>
				<button onClick={onSaveNode}>Save</button>
			</Box>
			<ReactFlow elements={nodesStates.nodes}
			           onConnect={onNodeConnect}
			           onElementClick={onNodeMenu}
			           deleteKeyCode={46}
			           nodeTypes={nodeTypes}
			           edgeTypes={edgeTypes}
			           selectNodesOnDrag={false}
			           snapToGrid={true}
			           elementsSelectable={false}
			>
				<Background
					variant={BackgroundVariant.Dots}
					gap={12}
				/>
				<Controls/>
			</ReactFlow>
			<NodeDialog open={openNodeDialog.isOpen} onClose={handleClose} node={openNodeDialog.node}/>
		</Box>
	)
}