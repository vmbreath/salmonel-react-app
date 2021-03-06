import React, {useEffect} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import {useSelector, useDispatch} from "react-redux";
import {
    updateH2AntigenVariants,
    updateH1AntigenVariants,
    updateOAntigenVariants,
} from "./searchReducer";

const useStyles = makeStyles((theme) => ({
    root: {
        //position: 'relative',
    },
    dropdown: {
        position: 'absolute',
        float: 'bottom',
        //right: '5vw',
        left: '1vw',
        width: '95vw',
        zIndex: 5,
        border: '1px solid',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
}));
const BootstrapButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 0px',
        border: '1px solid',
        lineHeight: 1.5,
        borderColor: '#3f51b5',
        fontFamily: 'sans-serif',
    },
})(Button);
export default function ClickAway({data, name}) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen((prev) => !prev);
    };
    const handleClickAway = () => {
        setOpen(false);
    };
    const handleClickColor = (index) => {
        if (name === 'О антигены') {
            dispatch(updateOAntigenVariants(index));
        } else if (name === 'H1 антигены') {
            dispatch(updateH1AntigenVariants(index));
        } else if (name === 'H2 антигены') {
            dispatch(updateH2AntigenVariants(index));
        }
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.root}>
                <Button style={{textTransform: 'none'}} variant="contained" color="primary" onClick={handleClick}>
                    {name}
                </Button>
                {open ? (
                    <div className={classes.dropdown}>
                        {/*<Button style={{textTransform: 'none'}} variant="contained" color="secondary" onClick={handleClick}>*/}
                        {/*    Закрыть*/}
                        {/*</Button>*/}
                        {data.map((elem, index) => {
                                return (
                                    <BootstrapButton key={elem[0]} onClick={() => handleClickColor(index)}
                                                     color="primary" style={{backgroundColor: elem[1]}}>
                                        {elem[0]}
                                    </BootstrapButton>
                                )
                            }
                        )}
                    </div>
                ) : null}
            </div>
        </ClickAwayListener>
    );
}