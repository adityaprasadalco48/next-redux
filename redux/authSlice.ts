import {createSlice} from '@reduxjs/toolkit';
import {HYDRATE} from 'next-redux-wrapper';

export const authSlice = createSlice({
    name: 'auth',

    initialState: {
        user: {
            email: '',
        },
        loading: false,
        hasErrors: false,
        recipes: [],
    } as any,

    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },

        getRecipes: (state) => {
            state.loading = true;
        },
        getRecipesSuccess: (state, {payload}) => {
            state.recipes = payload;
            state.loading = false;
            state.hasErrors = false;
        },
        getRecipesFailure: (state) => {
            state.loading = false;
            state.hasErrors = true;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            console.log('HYDRATE', state, action.payload);
            return {
                ...state,
                ...action.payload.auth,
            };
        },
    },
});

export const {setUser, getRecipes, getRecipesSuccess, getRecipesFailure} = authSlice.actions;

// A selector
export const recipesSelector = (state) => state.auth;

export function fetchRecipes():any {
    return async (dispatch) => {
        dispatch(getRecipes());

        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
            const data = await response.json();

            dispatch(getRecipesSuccess(data));
        } catch (error) {
            dispatch(getRecipesFailure());
        }
    };
}
