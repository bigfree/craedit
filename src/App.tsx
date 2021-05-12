import '@fontsource/roboto';
import { CssBaseline, makeStyles } from "@material-ui/core";
import React, { FC } from 'react';
import Content from "./components/content/content.component";
import Header from "./components/header/header.component";

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100vw',
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
	}
}));

const App: FC = (): JSX.Element => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline/>
			<Header/>
			<Content/>
		</div>
	);
}

export default App;
