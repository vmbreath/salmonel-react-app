import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {saveState} from './localStorage'
import {setIsAuthenticated, setNewToken} from "./authorizationReducer";
import {useDispatch} from "react-redux";

export default function FormDialog() {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [text, setText] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };

    const submit = () => {
        const login =  async () => {
            const url = new URL('https://salmonel-heroku.herokuapp.com/login')
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userName: 'admin', password:text})
            })
            let result = await response.json();
            if (result){
                saveState({
                    state: result
                }, 'token')
                dispatch(setNewToken(result));
                dispatch(setIsAuthenticated(true));
                setOpen(false);
            }
            console.log('result', result)
        }
        login().catch(err =>{
            console.log('errrr',err);
            setError(true);
        });
        // setOpen(false);
    };
    const textFieldChange = (ev) =>{
        setText(ev.target.value);
    }
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Режим администратора</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Введите пароль
                    </DialogContentText>
                    <TextField
                        autoFocus
                        error={error}
                        helperText={error ? "Неправильный пароль!" : ""}
                        margin="dense"
                        id="password"
                        label="Пароль"
                        type="password"
                        fullWidth
                        onChange={textFieldChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={submit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}