import React from "react";
import lodash from "lodash";
import {PAGINATION_STEP} from "../../utils/paginationSteps";

type Props = {
    items: number;
    pageSize: number;
    currentPage: number;
    onPageChange: (page: any) => void;
}

const Pagination: React.FC<Props> = (props) => {
    const {items, pageSize, currentPage, onPageChange} = props

    const pagesCount = Math.ceil(items / pageSize);
    const pages = pagesCount === 1 ? [] : lodash.range(1, pagesCount + 1);

    return (
        pagesCount === 1 ? null :
            (<nav>
                <ul className="pagination">
                    <li key="previousPage" className="page-item pointer-event cursor-pointer">
                        <a className="page-link"
                           onClick={() => onPageChange(PAGINATION_STEP.PREVIOUS_STEP)}>Previous</a>
                    </li>
                    {
                        pages.map(page =>
                            <li key={page}
                                className={page === currentPage ? "page-item active cursor-pointer" : "page-item cursor-pointer"}>
                                <a className="page-link" onClick={() => onPageChange(page)}>{page}</a>
                            </li>
                        )
                    }
                    <li key="nextPage" className="page-item pointer-event cursor-pointer">
                        <a className="page-link" onClick={() => onPageChange(PAGINATION_STEP.NEXT_STEP)}>Next</a>
                    </li>
                </ul>
            </nav>)
    )
}

export default Pagination;