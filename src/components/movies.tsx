import React, {FC, useEffect, useRef, useState} from "react";
import './movies.scss';
import MoviesTable from "./common/moviesTable";
import SearchInput from "./common/searchInput";
import {useNavigate} from "react-router-dom";
import * as actions from "../store/actions/movieActions";
import {useAppDispatch, useAppSelector} from "../@hooks/hooks";
import Pagination from "./common/pagination";
import {PAGINATION_STEP} from "../utils/paginationSteps";

interface MoviesProps {
}

const Movies: FC<MoviesProps> = () => {
    const dispatch = useAppDispatch();
    const inputElementRef: any = useRef();

    const pageSize = 10;

    const fetchMoviesData = (title: string, currentPage: number) => dispatch(actions.fetchMovies(title, currentPage));
    const dispatchSearchedTitle = (title: string) => dispatch(actions.dispatchTitle(title));
    const dispatchCurrentPage = (page: number) => dispatch(actions.dispatchCurrentPage(page));

    const searchTitle = useAppSelector((state: any) => state.movies.searchTitle);
    const isSearchPressed = useAppSelector((state: any) => state.movies.isSearchPressed);
    const movies = useAppSelector((state: any) => state.movies.moviesData);
    const totalResults = useAppSelector((state: any) => state.movies.totalResults);
    const currentPage = useAppSelector((state: any) => state.movies.currentPage);
    const errorSearch = useAppSelector((state: any) => state.movies.errorSearch);

    const onSearchClick = async (title: string) => {
        if (!title) {
            return;
        }
        await dispatchSearchedTitle(inputElementRef.current.value);

        await fetchMoviesData(title, currentPage);
    }

    const PaginationStep = PAGINATION_STEP;

    const handlePageChange = async (page: number | PAGINATION_STEP) => {
        if (PaginationStep.PREVIOUS_STEP === page) {
            await dispatchCurrentPage(currentPage === 1 ? 1 : currentPage - 1);
            return;
        }
        if (PaginationStep.NEXT_STEP === page) {
            await dispatchCurrentPage((currentPage === Math.ceil(totalResults / pageSize)) ? Math.ceil(totalResults / pageSize) : currentPage + 1);
            return;
        }

        await dispatchCurrentPage(page);
    }

    useEffect(() => {
        if (!searchTitle) {
            return;
        }

        fetchMoviesData(searchTitle, currentPage);

    }, [currentPage, searchTitle])

    const navigation = useNavigate();

    const onMovieClick = (id: string) => {
        navigation("/movie/" + id);
    }

    const onFavouriteMoviesClick = () => {
        navigation("/favourite");
    }

    return (
        <div className="search-container">
            <SearchInput inputElementRef={inputElementRef} onSearchClick={onSearchClick}
                         onFavouriteMoviesClick={onFavouriteMoviesClick}></SearchInput>
            <h3 style={{marginTop: '2rem', paddingLeft: '0.5rem', color: 'red'}}>{errorSearch}</h3>

            {!errorSearch && isSearchPressed && movies.length > 0 &&
                <div>
                    <h3 style={{marginTop: '2rem'}}> Found {totalResults} by searched title <b>{searchTitle}</b></h3>
                    <MoviesTable paginatedMovies={movies} onMovieClick={onMovieClick}></MoviesTable>
                    <Pagination
                        items={totalResults}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}></Pagination>
                </div>
            }
        </div>
    )
}

export default Movies;
