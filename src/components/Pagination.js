// components/Pagination.css
/*
* 필요 컴포넌트 임포트
* react-icons 는 별도 아이콘 필요시 사용 불필요한 경우 삭제
*/
import React, { Component } from 'react';
import { MdChevronLeft, MdChevronRight, MdFirstPage, MdLastPage } from "react-icons/md";
import datatype from "prop-types";

/**
 * @author Dev-Truly
 * @param currentPage       현재 페이지 번호
 * @param postsPerPage      페이지 리스팅 수
 * @param totalPosts        게시글 총 갯수
 * @param pageLimit         페이징 버튼 출력 갯수
 * @param paginate          부모 상태 조정 함수
 * @returns {JSX.Element}
 */

class Pagination extends Component {
    /**
     * GetBlockInfo() - 전달 받은 props 데이터 활용하여 페이징 알고리즘 처리 함수
     */
    GetBlockInfo = () => {
        // 최종 페이지 번호 = 올림(총 데이터 건수 : 367 / 페이지 리스팅 수 : 10 = 36.7 올림 37 페이지)
        let lastPage = Math.ceil(this.props.totalPosts / this.props.postsPerPage);

        // 현재 페이징 블럭 계산 = 올림(현재 페이지 위치 : 3 / 페이징 버튼 출력수 5 = 0.6 올림 1페이지)
        let block = Math.ceil(this.props.currentPage / this.props.pageLimit);

        // 블럭내 시작 페이지 계산 = ((현재페이징 블럭 : 1 - 1 = 0) * 페이징 버튼 수 : 5 = 0) + 1 = 1 페이지 시작
        let start = ((block - 1) * this.props.pageLimit) + 1;

        // 블럭내 종료 페이지 계산 = 낮은 수(마지막 페이지, (시작페이지 + 페이징 버튼수));
        let end = Math.min(lastPage, (start + this.props.pageLimit) - 1);

        return {lastPage, start, end}
    }

    /**
     * GetPagination() 계산된 페이징 정보 활용하여 components 생성
     */
    GetPagination({...blockInfo}) {

        //console.log();

        // 담을 배열 변수 생성
        let components = [];

        // 시작 페이지가 1보다 크면 출력
        // 1번 페이지 이동 버튼 활성화
        // icon MdFirstPage 컴포넌트 확인 불필요시 삭제 후 대체 필요
        if (blockInfo.start > 1)
            components.push(
                <li
                    className="page-first"
                    onClick={e=>this.props.paginate(1)}>
                    <MdFirstPage size={20} />
                </li>
            );

        // 현재 페이지가 1보다 크면 생성
        // 직전 페이지 이동 버튼 활성화
        // icon MdChevronLeft 컴포넌트 확인 불필요시 삭제 후 대체 필요
        if (1 < this.props.currentPage)
            components.push(
                <li
                    className="page-previous"
                    onClick={e=>this.props.paginate(this.props.currentPage - 1)}
                >
                    <MdChevronLeft size={20} />
                </li>
            );

        // 블록 시작 부터 종료 지점까지 반복 실행
        // 일반 숫자 버튼 활성화
        // currentPage(현재 페이지)와 반복중 증가 연산자의 값이 같으면 클릭 기능 비활성화
        // this.props.paginate(i) 부모 컴포넌트에서 전달 받은 setState 함수 처리
        for (let i = blockInfo.start; i <= blockInfo.end; i++) {
            let currentPageClass = "";
            if (this.props.currentPage === i) currentPageClass = "current-page";
            components.push(
                <li
                    className={`page-number ${currentPageClass}` }
                    onClick={
                        (currentPageClass === "") ?
                            (e) => this.props.paginate(i) : () => null
                    }
                >
                    {i}
                </li>
            );
        }

        // 현재 페이지가 마지막페이지보다 작으면 생성
        // 직후 페이지 이동 버튼 활성화
        // icon MdChevronRight 컴포넌트 확인 불필요시 삭제 후 대체 필요
        if (this.props.currentPage < blockInfo.lastPage)
            components.push(
                <li
                    className="page-next"
                    onClick={e=>this.props.paginate(this.props.currentPage + 1)
                    }>
                    <MdChevronRight size={20} />
                </li>
            );

        // 블록 종료점 페이지가 마지막페이지보다 작으면 생성
        // 마지막 페이지 이동 버튼 활성화
        // icon MdLastPage 컴포넌트 확인 불필요시 삭제 후 대체 필요
        if (blockInfo.end < blockInfo.lastPage)
            components.push(
                <li
                    className="page-last"
                    onClick={e=>this.props.paginate(blockInfo.lastPage)}
                >
                    <MdLastPage size={20} />
                </li>
            );

        // 삽입 된 컴포넌트 리턴
        return (
            <ul className="page-list-group">
                {components}
            </ul>
        );
    }


    render() {
        let {
            currentPage,
            postsPerPage,
            pageLimit,
            totalPosts,
            paginate
        } = this.props;

        // 상기 생성 된 함수 호출
        return (
            <>
                {this.GetPagination(this.GetBlockInfo())}
            </>

        );
    }
}
// 자료형 처리
Pagination.propTypes = {
    currentPage: datatype.number,
    postsPerPage: datatype.number,
    totalPosts: datatype.number,
    paginate: datatype.func,
}

export default Pagination;