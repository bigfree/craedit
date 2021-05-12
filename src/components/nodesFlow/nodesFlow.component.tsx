import { Box, makeStyles, Menu, MenuItem, Theme } from "@material-ui/core";
import { Actions, State } from "easy-peasy";
import React, { FC, MouseEvent, SyntheticEvent, useState } from "react";
import ReactFlow, { addEdge, Background, BackgroundVariant, Controls, FlowElement } from "react-flow-renderer";
import { Connection, Edge } from "react-flow-renderer/dist/types";
import { useStoreAction, useStoreState } from "../../store/hooks";
import { IStoreType } from "../../store/types/storeType";
import { nodeTypes } from "../nodeTypes/nodeTypes";

const useStyles = makeStyles((theme: Theme) => ({
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

export const NodesFlow: FC = (): JSX.Element => {
	const classes = useStyles();

	const nodesStates = useStoreState((state: State<IStoreType>) => state.nodes);
	const nodesActions = useStoreAction((actions: Actions<IStoreType>) => actions.nodes);

	const [anchorEl, setAnchorEl] = useState<null | Element>(null);
	const open = Boolean(anchorEl);

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

	const onNodeContextMenu = (event: MouseEvent, node: FlowElement) => {
		event.preventDefault();
		setAnchorEl(event.currentTarget);
		console.log(event, node);
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

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box className={classes.root}>
			<Box className={classes.buttons}>
				<button onClick={onFetchNodes}>Load</button>
				<button onClick={onSyncNode}>Sync</button>
				<button onClick={onSaveNode}>Save</button>
			</Box>
			<ReactFlow elements={nodesStates.nodes}
			           onElementsRemove={onNodeRemove}
			           onConnect={onNodeConnect}
			           onNodeContextMenu={onNodeContextMenu}
			           deleteKeyCode={46}
			           nodeTypes={nodeTypes}
			           selectNodesOnDrag={false}
			           snapToGrid={true}
			>
				<Background
					variant={BackgroundVariant.Dots}
					gap={12}
				/>
				<Controls/>
			</ReactFlow>


			{/*TODO: create element*/}
			<Menu
				id="fade-menu"
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClose}>Profile</MenuItem>
				<MenuItem onClick={handleClose}>My account</MenuItem>
				<MenuItem onClick={handleClose}>Logout</MenuItem>
			</Menu>
		</Box>
	)
}