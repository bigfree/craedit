import {
	Avatar,
	Dialog,
	DialogTitle,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	makeStyles,
	Theme
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { FC } from "react";
import { NodeAction, TListItems, TNodeDialogProps } from "./nodeDialogTypes";

const useStyles = makeStyles((theme: Theme) => ({
	list: {
		width: 300
	},
	dialogTitle: {
		borderBottom: `1px solid ${theme.palette.divider}`
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
]

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
		onClose('');
	};

	/**
	 * Close dialog with value
	 * @param {string} value
	 */
	const handleListItemClick = (value: string) => {
		onClose(value);
	};

	return (
		<Dialog onClose={handleClose} open={open} fullWidth={false}>
			<DialogTitle className={classes.dialogTitle}>{node?.data.label}</DialogTitle>
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