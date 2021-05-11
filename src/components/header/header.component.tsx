import {FC} from "react";
import {AppBar, IconButton, makeStyles, Theme, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

const Header: FC = (): JSX.Element => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position={'static'}>
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