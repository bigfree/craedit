import {FC} from "react";
import {AppBar, IconButton, makeStyles, Theme, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
    },
    appBar: {
        backgroundColor: '#333',
        transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

const Header: FC = (): JSX.Element => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position={'static'} className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge={'start'}
                        className={classes.menuButton}
                        color={'inherit'}
                        aria-label={'open drawer'}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        CRAEdit
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;