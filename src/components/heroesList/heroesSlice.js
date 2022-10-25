import { createSlice, CreateSlice } from "@reduxjs/toolkit";


const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching:state => {     ///action creators
            state.heroesLoadingStatus = 'loading';     ///действие по изменению стейта       + работает имер.js который следит за иммутабельностью
        },
        heroesFetched:(state, action) => {
                    state.heroes = action.payload;
                    state.heroesLoadingStatus = 'idle';
                },
        heroesFetchingError:state => {
                    state.heroesLoadingStatus = 'error';
                },
        heroCreated:(state, action) => {
                    state.heroes.push(action.payload);
                },
        heroDeleted:(state, action) => {
                    state.heroes = state.heroes.filter(item => item.id !== action.payload)
                }
    }
});

// export const {heroesFetching, heroesFetched, heroesFetchingError, heroCreated, heroDeleted} = heroesSlice.actions;
// export default heroesSlice.reducer;

const {actions, reducer} = heroesSlice;
export default reducer;
export const {heroesFetching, heroesFetched, heroesFetchingError, heroCreated, heroDeleted} = actions;

