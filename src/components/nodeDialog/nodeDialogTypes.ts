import { SvgIconProps } from "@material-ui/core/SvgIcon/SvgIcon";
import { ReactNode } from "react";
import { FlowElement } from "react-flow-renderer";

export enum NodeAction {
	Edit = 'edit',
	Clone = 'clone',
	Delete = 'delete',
}

export type TNodeDialogProps = {
	children?: ReactNode;
	open: boolean;
	node: null | FlowElement;
	onClose: (type: string, node: FlowElement | null) => void;
}

export type TListItems = {
	name: string;
	action: NodeAction;
	icon: SvgIconProps;
}