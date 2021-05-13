import {
	Avatar,
	Dialog,
	DialogTitle,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	makeStyles,
	Paper,
	PaperProps,
	Theme
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { FC } from "react";
import Draggable from 'react-draggable';
import { NodeAction, TListItems, TNodeDialogProps } from "./nodeDialogTypes";

const useStyles = makeStyles((theme: Theme) => ({
	list: {
		width: 320
	},
	dialogTitle: {
		borderBottom: `1px solid ${theme.palette.divider}`,
		paddingRight: theme.spacing(8),
		cursor: 'move',
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1.1),
		color: theme.palette.grey[400],
	},
}));

/**
 * Array of objects dialog menu items
 * @type {({name: string, icon: JSX.Element, action: NodeAction})[]}
 */
const listItems: Readonly<TListItems[]> = [
	{
		name: 'Edit node',
		action: NodeAction.Edit,
		icon: <EditIcon/>
	},
	{
		name: 'Clone node',
		action: NodeAction.Clone,
		icon: <FileCopyIcon/>
	},
	{
		name: 'Delete node',
		action: NodeAction.Delete,
		icon: <DeleteIcon/>
	}
];

/**
 * Handle draggable dialog
 * @param {PaperProps} props
 * @returns {JSX.Element}
 * @constructor
 */
const PaperComponent: FC = (props: PaperProps): JSX.Element => {
	return (
		<Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
			<Paper {...props} />
		</Draggable>
	);
}

/**
 * Node Dialog component
 * @param {TNodeDialogProps} props
 * @returns {JSX.Element}
 * @constructor
 */
const NodeDialog: FC<TNodeDialogProps> = (props: TNodeDialogProps): JSX.Element => {
	const classes = useStyles();
	const { node, open, onClose } = props;

	/**
	 * Close dialog
	 */
	const handleClose = () => {
		onClose('', node);
	};

	/**
	 * Close dialog with value
	 * @param {string} value
	 */
	const handleListItemClick = (value: string) => {
		onClose(value, node);
	};

	return (
		<Dialog
			onClose={handleClose}
			open={open}
			fullWidth={false}
			PaperComponent={PaperComponent}
		>
			<DialogTitle className={classes.dialogTitle} id="draggable-dialog-title">
				{node?.data.label ?? ''}
				<IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
					<CloseIcon/>
				</IconButton>
			</DialogTitle>
			<List className={classes.list}>
				{listItems.map((item: TListItems) => (
					<ListItem button onClick={() => handleListItemClick(item.action)} key={item.name}>
						<ListItemAvatar>
							<Avatar>
								{item.icon}
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={item.name}/>
					</ListItem>
				))}
			</List>
		</Dialog>
	)
}

export default NodeDialog;