import {createSlice} from '@reduxjs/toolkit';
import {AppState, AppThunk} from './store';

export const subjectSlice = createSlice({
    name: 'subject',

    initialState: {
        subjectName: 'English',
    } as any,

    reducers: {
        setEnt(state, action) {
            return action.payload;
        },

        setSubjectName(state, action) {
            state.subjectName = action.payload;
        },

        removeSubjectName(state, action) {
            state.subjectName = '';
        },
    },

    // extraReducers: {
    //     [HYDRATE]: (state, action) => {
    //         console.log('HYDRATE', state, action.payload);
    //         return {
    //             ...state,
    //             ...action.payload.subject,
    //         };
    //     },
    // },
});

export const {setSubjectName, removeSubjectName, setEnt} = subjectSlice.actions;

// A selector
export const recipesSelector = (state) => state.subject;

export const selectSubject = (id: any) => (state: AppState) => state?.[subjectSlice.name]?.[id];

export const fetchSubject =
    (id: any): AppThunk =>
    async (dispatch) => {
        const timeoutPromise = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

        await timeoutPromise(200);

        dispatch(
            subjectSlice.actions.setEnt({
                [id]: {
                    id,
                    name: `Subject ${id}`,
                },
            }),
        );
    };
