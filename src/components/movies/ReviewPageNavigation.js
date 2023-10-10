import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const ReviewPageNavigation = ({ getReviewPage }) => {
    const pv = useSelector((state) => state.reviews.pv ? state.reviews.pv : { currentPage: 1 });
    const { movieId } = useParams();
    const pageNumbers = [];
    for (let i = pv.startPage; i <= pv.endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav arial-label='...'>
            <ul className='pagination'>
                <li className={pv.startPage <= 1 ? 'page-item disabled' : 'page-item'}>
                    <span className='page-link' onClick={() => getReviewPage(movieId, pv.startPage - pv.blockPage)}>
                        &laquo;
                    </span>
                </li>
                {pageNumbers.map((pnum, idx) => (
                    <li key={pnum} >
                        <span onClick={() => getReviewPage(movieId, pnum)} className={pv.currentPage === pnum ? 'page-item active' : null}>
                            <Link to={`/review/page/${movieId}/${pnum}`} className='page-link' >
                                {pnum}
                            </Link>
                        </span>
                    </li>
                ))}

                <li className={pv.endPage >= pv.totalPage ? 'page-item disabled' : 'page-item'}>
                    <span className='page-link' onClick={() => getReviewPage(movieId, pv.startPage + pv.blockPage)}>
                        &raquo;
                    </span>
                </li>
            </ul>
        </nav>
    );
};

export default ReviewPageNavigation;