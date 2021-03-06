import {createSlice} from '@reduxjs/toolkit';
import {loadState} from './localStorage'

const persistedState = loadState('reducer');

export const initialState = persistedState ? persistedState.state : ({
    data: ['first-load'],
    oAntigenVariants: [],
    h1AntigenVariants: [],
    h2AntigenVariants: [],
    queryFilter: {
        find: {
            OAntigen: [],
            H1Antigen: [],
            H2Antigen: [],
        },
        exclude: {
            OAntigen: [],
            H1Antigen: [],
            H2Antigen: [],
        }
    },
});

export const searchReducer = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setNewData: (state, action) => {
            state.data = action.payload;
            action.payload.forEach((row) => {
                const elementsO = row.o_antigen;
                const elementsH1 = row.h_antigen1;
                const elementsH2 = row.h_antigen2;
                const filterBrackets = (elem) => {
                    if (elem[0] === '[' || elem[0] === '{' || elem[0] === '(') {
                        if (elem[elem.length - 1] === ']' || elem[elem.length - 1] === '}' || elem[elem.length - 1] === ')') {
                            return elem.slice(1, -1);
                        } else {
                            return elem.slice(1);
                        }
                    } else if (elem[elem.length - 1] === ']' || elem[elem.length - 1] === '}' || elem[elem.length - 1] === ')') {
                        return elem.slice(0, -1);
                    } else {
                        return elem;
                    }
                }
                const formVariantArray = (elem, array) => {
                    const findElem = filterBrackets(elem);
                    if (findElem.includes(',')) {
                        findElem.split(',').forEach(elem => {
                            const ifExists = array.find(el => el[0] === elem);
                            if (!ifExists) {
                                array.push([elem, 'white']);
                            }
                        })
                    } else {
                        const ifExists = array.find(el => el[0] === findElem);
                        if (!ifExists) {
                            array.push([findElem, 'white']);
                        }
                    }
                }
                elementsO.forEach((elem) => {
                    formVariantArray(elem, state.oAntigenVariants);
                });
                elementsH1.forEach((elem) => {
                    formVariantArray(elem, state.h1AntigenVariants);
                });
                elementsH2.forEach((elem) => {
                    formVariantArray(elem, state.h2AntigenVariants);
                });
            })
            state.oAntigenVariants = state.oAntigenVariants.sort((a, b) => {
                let numberA = a[0];
                let numberB = b[0];
                if (numberA.includes('!')){numberA = numberA.slice(0,numberA.length-1)}
                if (numberB.includes('!')){numberB = numberB.slice(0,numberB.length-1)}
                if (numberA.includes('Vi')){numberA = 99999}
                if (numberB.includes('Vi')){numberB = 99999}
                return numberA-numberB;
            });
            state.h1AntigenVariants = state.h1AntigenVariants.sort();
            state.h2AntigenVariants = state.h2AntigenVariants.sort();
        },
        updateNewData: (state, action) => {
            state.data = action.payload;
            console.log(state.data);
        },
        updateOAntigenVariants: (state, action) => {
            const currentElement = state.oAntigenVariants[action.payload];
            if (currentElement[1] === 'white') {
                currentElement[1] = '#AAFFB3';
                state.queryFilter.find.OAntigen.push(currentElement[0]);
            } else if (currentElement[1] === '#AAFFB3') {
                currentElement[1] = '#FFAFAA';
                state.queryFilter.exclude.OAntigen.push(currentElement[0]);
                const index = state.queryFilter.find.OAntigen.indexOf(currentElement[0]);
                state.queryFilter.find.OAntigen.splice(index, 1);
            } else if (currentElement[1] === '#FFAFAA') {
                currentElement[1] = 'white';
                const index = state.queryFilter.exclude.OAntigen.indexOf(currentElement[0]);
                state.queryFilter.exclude.OAntigen.splice(index, 1);
            }
        },
        updateH1AntigenVariants: (state, action) => {
            const currentElement = state.h1AntigenVariants[action.payload];
            if (currentElement[1] === 'white') {
                currentElement[1] = '#AAFFB3';
                state.queryFilter.find.H1Antigen.push(currentElement[0]);
            } else if (currentElement[1] === '#AAFFB3') {
                currentElement[1] = '#FFAFAA';
                state.queryFilter.exclude.H1Antigen.push(currentElement[0]);
                const index = state.queryFilter.find.H1Antigen.indexOf(currentElement[0]);
                state.queryFilter.find.H1Antigen.splice(index, 1);
            } else if (currentElement[1] === '#FFAFAA') {
                currentElement[1] = 'white';
                const index = state.queryFilter.exclude.H1Antigen.indexOf(currentElement[0]);
                state.queryFilter.exclude.H1Antigen.splice(index, 1);
            }
        },
        updateH2AntigenVariants: (state, action) => {
            const currentElement = state.h2AntigenVariants[action.payload];
            if (currentElement[1] === 'white') {
                currentElement[1] = '#AAFFB3';
                state.queryFilter.find.H2Antigen.push(currentElement[0]);
            } else if (currentElement[1] === '#AAFFB3') {
                currentElement[1] = '#FFAFAA';
                state.queryFilter.exclude.H2Antigen.push(currentElement[0]);
                const index = state.queryFilter.find.H2Antigen.indexOf(currentElement[0]);
                state.queryFilter.find.H2Antigen.splice(index, 1);
            } else if (currentElement[1] === '#FFAFAA') {
                currentElement[1] = 'white';
                const index = state.queryFilter.exclude.H2Antigen.indexOf(currentElement[0]);
                state.queryFilter.exclude.H2Antigen.splice(index, 1);
            }
        },
        clearQueryFilter: (state) => {
            state.oAntigenVariants.forEach((elem) => {
                elem[1] = 'white';
            });
            state.h1AntigenVariants.forEach((elem) => {
                elem[1] = 'white';
            });
            state.h2AntigenVariants.forEach((elem) => {
                elem[1] = 'white';
            });
            state.queryFilter = {
                find: {
                    OAntigen: [],
                    H1Antigen: [],
                    H2Antigen: [],
                },
                exclude: {
                    OAntigen: [],
                    H1Antigen: [],
                    H2Antigen: [],
                }
            };
        },
    },
});

export const {
    clearQueryFilter,
    updateH1AntigenVariants,
    updateH2AntigenVariants,
    setNewData,
    updateOAntigenVariants,
    updateNewData
} = searchReducer.actions;
export const selectData = state => state.search.data;
export const selectOAntigenVariants = state => state.search.oAntigenVariants;
export const selectH1AntigenVariants = state => state.search.h1AntigenVariants;
export const selectH2AntigenVariants = state => state.search.h2AntigenVariants;
export const selectQueryFilter = state => state.search.queryFilter;
export default searchReducer.reducer;
export const {reducer, actions} = searchReducer;