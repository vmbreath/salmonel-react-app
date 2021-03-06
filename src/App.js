import React, {useEffect} from "react";
import Button from '@material-ui/core/Button';
import './App.scss';
import StickyHeadTable from "./Table";
import FormDialog from "./Dialog";
import ClickAway from "./buttonsList";
import Admin from "./Admin";
import {useSelector, useDispatch} from "react-redux";
import {
    HashRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import {
    clearQueryFilter,
    selectOAntigenVariants,
    selectH1AntigenVariants,
    selectH2AntigenVariants, updateNewData,
} from "./searchReducer";
import {IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import FilterText from "./filterResults";
import admin from './admin.png'
import {selectToken, selectIsAuthenticated, setIsAuthenticated} from "./authorizationReducer";

function App() {
    const dispatch = useDispatch();
    const storageToken = useSelector(selectToken);
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const OAntigenVariants = useSelector(selectOAntigenVariants);
    const H1AntigenVariants = useSelector(selectH1AntigenVariants);
    const H2AntigenVariants = useSelector(selectH2AntigenVariants);

    useEffect(() => {
        const verify = async () =>{
            const tokenOk = await verifyToken();
            dispatch(setIsAuthenticated(tokenOk));
        }
        verify();
    }, [storageToken])

    const verifyToken = async () =>{
        if (storageToken && !isAuthenticated){
                const url = new URL('https://salmonel-heroku.herokuapp.com/verifier')
                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        token:storageToken ? storageToken : 'no token',
                    },
                    body: JSON.stringify({userName: 'admin'})
                });
                let result = await response.json();
                if (result.data === 'ololo'){
                    //dispatch(setIsAuthenticated(true));
                    console.log('result', result)
                    return true;
                }
                console.log('result', result)
                //dispatch(setIsAuthenticated(false));
                return false;
        }
    }
    const clearFilter = () => {
        dispatch(clearQueryFilter());
    };
    return (
        <Router basename="/">
            <div className="App">
                <header>
                    <Link className={'link'} to="/search">
                        <Button variant="contained" color="link">
                            ОПРЕДЕЛИТЬ БАКТЕРИИ
                        </Button>
                    </Link>
                    <Link className={'link'} to="/info">
                        <Button variant="contained" color="link">
                            ЛЕГЕНДА
                        </Button>
                    </Link>
                    <Link className={'link'} to="/contacts">
                        <Button variant="contained" color="link">
                            ОБРАТНАЯ СВЯЗЬ
                        </Button>
                    </Link>
                    <Link className={'link'} to="/admin">
                        <Button variant="contained" color="link">
                            <img src={admin} alt="Админ"/>
                        </Button>
                    </Link>
                </header>
                <Switch>
                    <Route path="/search">
                        <div className={'search'}>
                            <div className={'filter'}>
                                <div className={'filterResults'}>
                                    <FilterText/>
                                    <IconButton onClick={clearFilter} aria-label="delete">
                                        <DeleteIcon/>
                                    </IconButton>
                                </div>
                                <div className={'filterButtons'}>
                                    <ClickAway data={OAntigenVariants} name={'О антигены'}/>
                                    <ClickAway data={H1AntigenVariants} name={'H1 антигены'}/>
                                    <ClickAway data={H2AntigenVariants} name={'H2 антигены'}/>
                                </div>
                            </div>
                            <StickyHeadTable/>
                        </div>
                    </Route>
                    <Route
                        path="/admin"
                        render={
                            ()=>!isAuthenticated ?
                                <FormDialog/>:
                                //<Redirect to="/admin"/>
                                <Admin/>
                        }
                    >
                    </Route>
                    <Route path="/info">
                        <p>info</p>
                    </Route>
                    <Route path="/contacts">
                        <p>contacts</p>
                    </Route>
                    <Route path="/">
                        <p>main window</p>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
