import * as actionTypes from './actionTypes';
import clientService from "../../services/clientService";
import {AppDispatch} from "../store";

export const dispatchTitle = (title: string) => async (dispatch: AppDispatch) => {
    try {
        if (title) {
            dispatch({type: actionTypes.DISPATCH_TITLE, title});
        }
    } catch (err) {
        throw new Error('Failed to dispatch title');
    }
};

export const dispatchCurrentPage = (page: number) => async (dispatch: AppDispatch) => {
    try {
        if (page) {
            dispatch({type: actionTypes.DISPATCH_CURRENT_PAGE, page});
        }
    } catch (err) {
        throw new Error('Failed to dispatch title');
    }
};

export const fetchMovies = (title: string, currentPage: number) => async (dispatch: AppDispatch) => {
    try {
        const data = await clientService.getMoviesByTitle(title, currentPage);

        if (data.Response === "False") {
            dispatch({type: actionTypes.FETCH_MOVIES_ERROR, data});
            return;
        }

        dispatch({type: actionTypes.FETCH_MOVIES, data});
    } catch (err) {
        throw new Error('Movies fetch failed');
    }
};

export const fetchMovieDetails = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const data = await clientService.getMovieDetails(id);

        if (data.Response === "False") {
            dispatch({type: actionTypes.FETCH_MOVIE_DETAILS_ERROR, data});
            return;
        }

        dispatch({type: actionTypes.FETCH_MOVIE_DETAILS, data});
    } catch (err) {
        throw new Error('Movie details fetch failed');
    }
};
