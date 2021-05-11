import React, {FC} from 'react';
import {NodesFlow} from "./components/nodesFlow/nodesFlow.component";
import {CssBaseline, makeStyles} from "@material-ui/core";
import Header from "./components/header/header.component";

const useStyles = makeStyles((theme) => ({
    root: {
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
            <NodesFlow/>
        </div>
    );
}

export default App;
