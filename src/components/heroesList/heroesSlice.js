import { createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';


const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
});


// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle'
// }



export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/heroes");
    }
)

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        // heroesFetching:state => {     ///action creators
        //     state.heroesLoadingStatus = 'loading';     ///действие по изменению стейта       + работает имер.js который следит за иммутабельностью
        // },
        // heroesFetched:(state, action) => {
        //             state.heroes = action.payload;
        //             state.heroesLoadingStatus = 'idle';
        //         },
        // heroesFetchingError:state => {
        //             state.heroesLoadingStatus = 'error';
        //         },
        heroCreated:(state, action) => {
                heroesAdapter.addOne(state, action.payload)////createEntityAdapter
                    // state.heroes.push(action.payload);
                },
        heroDeleted:(state, action) => {
                heroesAdapter.removeOne(state, action.payload)
                    // state.heroes = state.heroes.filter(item => item.id !== action.payload)
                }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading';})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                heroesAdapter.setAll(state,action.payload)/////////createEntityAdapter
                // state.heroes = action.payload;
                state.heroesLoadingStatus = 'idle';
            })
            .addCase(fetchHeroes.rejected,state => {
                state.heroesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

// export const {heroesFetching, heroesFetched, heroesFetchingError, heroCreated, heroDeleted} = heroesSlice.actions;
// export default heroesSlice.reducer;

const {actions, reducer} = heroesSlice;
export default reducer;
export const {selectAll} = heroesAdapter.getSelectors((state) => state.heroes)
export const {heroesFetching, heroesFetched, heroesFetchingError, heroCreated, heroDeleted} = actions;

