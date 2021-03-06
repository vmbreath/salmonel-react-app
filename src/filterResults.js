import React from 'react';
import {useSelector} from "react-redux";
import {selectQueryFilter} from "./searchReducer";
import './filterResults.scss'

export default function FilterText() {
    const queryFilter = useSelector(selectQueryFilter);

    return (
        <div>
            <fieldset>
                <legend align="left">Поиск</legend>
                <p>
                    <span style={{fontWeight: 'bold'}}>O:</span><span
                    style={{color: 'green'}}>{queryFilter.find.OAntigen.map((elem, index) => index > 0 ? ',' + elem : elem)}</span><span
                    style={{color: 'red'}}>{queryFilter.exclude.OAntigen.map((elem, index) => index > 0 || queryFilter.find.OAntigen.length > 0 ? ',' + elem : elem)}</span>
                    <span style={{fontWeight: 'bold'}}>    H1:</span><span
                    style={{color: 'green'}}>{queryFilter.find.H1Antigen.map((elem, index) => index > 0 ? ',' + elem : elem)}</span><span
                    style={{color: 'red'}}>{queryFilter.exclude.H1Antigen.map((elem, index) => index > 0 || queryFilter.find.H1Antigen.length > 0 ? ',' + elem : elem)}</span>
                    <span style={{fontWeight: 'bold'}}>    H2:</span><span
                    style={{color: 'green'}}>{queryFilter.find.H2Antigen.map((elem, index) => index > 0 ? ',' + elem : elem)}</span><span
                    style={{color: 'red'}}>{queryFilter.exclude.H2Antigen.map((elem, index) => index > 0 || queryFilter.find.H2Antigen.length > 0 ? ',' + elem : elem)}</span>
                </p>
            </fieldset>
        </div>

    );
}