// App.js

/*
* 필요 컴포넌트 및 css import
*/
import React, { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import './css/Pagination.css';

/**
 * totalPosts - 총 데이터수 ( api 연동 및 데이터 베이스 값 등록 필요 임의 367)
 * currentPage - 현재 페이지 위치 - 기본 1페이지
 * postsPerPage - 페이지 내 리스팅 갯수 - 기본 10개 리스팅
 * pageLimit - 페이징 버튼 출력 갯수 - 기본 5개 리스팅
 */
function App() {
  const [totalPosts, setTotalPosts] = useState(367);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [pageLimit, setPageLimit] = useState(5);

  // 자식(Pagination) 컴포넌트에서 자신(App)의 현재 페이지 값을 변경 할 수 있도록 함수화 처리
  const updateCurrentPage = (page) => {
    setCurrentPage(page);
  }

  /*
  * <Pagination /> 생성시 아래와 같은 props 값 전달
  * 설명은 상단 주석 내용 확인
  */
  return (
      <div className="App">
        <Pagination
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            pageLimit={pageLimit}
            totalPosts={totalPosts}
            paginate={updateCurrentPage}
        />
      </div>
  );
}

export default App;