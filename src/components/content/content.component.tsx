import { Box, makeStyles, Theme } from "@material-ui/core";
import React, { FC } from "react";
import { NodesFlow } from "../nodesFlow/nodesFlow.component";

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: '100%',
		flex: '1 1 auto',
		minHeight: '1px',
		display: 'flex',
	},
}));

const Content: FC = (): JSX.Element => {
	const classes = useStyles();

	return (
		<Box className={classes.root}>
			<NodesFlow/>
		</Box>
	)
}

export default Content;