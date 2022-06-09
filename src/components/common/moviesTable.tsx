import React from "react";
import {Movie} from "../../utils/tools";

type Props = {
    paginatedMovies: [];
    onMovieClick: (id: string) => void;
}

const MoviesTable: React.FC<Props> = (props) => {
    const {paginatedMovies, onMovieClick} = props;

    return (
        <table className="table table-hover">
            <thead>
            <tr>
                <th scope="col">Title</th>
                <th scope="col">Year</th>
                <th scope="col">Type</th>
            </tr>
            </thead>
            <tbody>
            {paginatedMovies.map((movie: Movie) => (
                <tr key={movie.imdbID} onClick={() => onMovieClick(movie.imdbID)}>
                    <td>{movie.Title}</td>
                    <td>{movie.Year}</td>
                    <td>{movie.Type}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default MoviesTable;