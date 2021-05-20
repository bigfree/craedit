import { makeStyles, Theme } from "@material-ui/core";

export interface ClassesProps {
	nodeBoxShadow: string,
	nodeBackground: string,
	handleBackgroundColor: string,
}

export const useStyles = makeStyles((theme: Theme) => ({
	root: (props: ClassesProps) => ({
		minWidth: 150,
		padding: theme.spacing(1.2),
		textAlign: 'center',
		borderColor: '#1a192b',
		backgroundColor: props.nodeBackground,
		boxShadow: props.nodeBoxShadow,
		color: '#000',
		'&:hover': {
			boxShadow: '0 0 7px 0 rgba(26, 25, 43, .3)',
		}
	}),
	handle: (props: ClassesProps) => ({
		width: 9,
		height: 9,
		background: '#e2e2e2',
		border: '1px solid #1a192b',
		boxShadow: '0px 0px 0px 2px #fafafa',
		'&:hover': {
			backgroundColor: props.handleBackgroundColor
		}
	})
}));