import { Edge, Node } from "react-flow-renderer/dist/types";

export enum WFNodeType {
	SYNCPOINT = 'syncPoint',
	TASK = 'task',
	CONDITION = 'condition',
}

export enum WFNodeDataType {
	MANUAL = "M",
	AUTOMATIC = "A",
	AUTOMATICMANUAL = "AM",
}

export type WFNodeData = {
	id: string | null;
	type: WFNodeDataType;
	label: string;
	canMerge?: false;
	taskId?: string | null;
	workplaceId?: string | null;
}

export type WFNode = Omit<Node, "data" | "type"> & Edge & { data: WFNodeData } & { type: WFNodeType };