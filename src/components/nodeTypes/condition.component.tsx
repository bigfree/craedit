import { Paper } from "@material-ui/core";
import { FC, PropsWithChildren } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { ClassesProps, useStyles } from "./shareStyles";

const Condition: FC<NodeProps> = (props: PropsWithChildren<NodeProps>): JSX.Element => {
	const classesProps: ClassesProps = {
		nodeBoxShadow: props.selected ? '0 0 0 0.8px #1a192b' : 'none',
		handleBackgroundColor: props.isConnectable ? '#55dd99' : '#e2e2e2',
		nodeBackground: 'lightcyan',
	};
	const classes = useStyles(classesProps);

	return (
		<>
			<Handle type="target" position={Position.Top} className={classes.handle}/>
			<Paper className={classes.root} variant={'outlined'}>
				{props.data.label}
			</Paper>
			<Handle type="source" position={Position.Bottom} className={classes.handle}/>
		</>
	)
}

export default Condition;