import { XYPosition } from "react-flow-renderer/dist/types";
import { v4 as uuidv4 } from 'uuid';
import { WFNode } from "../../types/node";

/**
 * Clone select node to new node
 * @param {WFNode} node
 * @returns {WFNode}
 */
export default function cloneNode(node: WFNode): WFNode {
	return {
		id: uuidv4(),
		data: { ...node.data, label: renameNode(node.data.label) },
		position: computePosition(node.position),
		type: node.type
	};
}

/**
 * Compute cloned node position
 * @param positions
 */
const computePosition = (positions: XYPosition): XYPosition => {
	const clonedPosition: XYPosition = { x: 0, y: 0 };
	clonedPosition.x = positions.x;
	clonedPosition.y = positions.y + 55;

	return clonedPosition;
}

/**
 * Add node name cloned
 * @param name
 */
const renameNode = (name: string): string => {
	if (!name) {
		return name;
	}

	const isCloned: boolean = name.endsWith('cloned');
	if (!isCloned) {
		name = `${name} cloned`;
	}

	return name;
}