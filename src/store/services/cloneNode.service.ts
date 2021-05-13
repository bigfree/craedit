import {Node} from "react-flow-renderer";
import {v4 as uuidv4} from 'uuid';
import {XYPosition} from "react-flow-renderer/dist/types";

export default function cloneNode(node: Node) {
    console.log(node);
    const clonedNode: Node = {
        id: uuidv4(),
        data: node.data,
        position: computePosition(node.position),
        type: node.type
    };

    clonedNode.data.label = renameNode(clonedNode.data.label);

    return clonedNode;
}

/**
 * Compute cloned node position
 * @param positions
 */
const computePosition = (positions: XYPosition) => {
    positions.x = positions.x - 100;
    positions.y = positions.y - 100;

    return positions;
}

/**
 * Add node name cloned
 * @param name
 */
const renameNode = (name: string) => {
    const isCloned = name.includes('cloned');

    if (isCloned) {
        name = `${name}1`;
    } else {
        name = `${name} cloned`;
    }

    return name;
}