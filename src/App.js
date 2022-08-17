import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import React, { Suspense, useState } from "react";
import useFetch from "./util/useFetch";
import styled from "styled-components";
import Button from "./styles/common";
const Detail = React.lazy(() => import("./pages/Detail"));
const Loading = React.lazy(() => import("./component/Loading"));
const Category = React.lazy(() => import("./component/Category"));
const Home = React.lazy(() => import("./pages/Home"));
const Create = React.lazy(() => import("./pages/Create"));
const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
`;
const MainWrapper = styled.div`
  padding: 30px;
  min-width: 80%;
  min-height: 90vh;
  display: flex;
  /* align-items: center; */
  flex: 1 0 auto;
  flex-direction: row;
`;
const Content = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  /* min-height: 100vh; */
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

function App() {
  const [filterText, setFilterText] = useState("");

  const {
    data: travelData,
    isPending: travelIsPending,
    error: travelError,
  } = useFetch("http://localhost:4001/travel");
  const {
    data: areaData,
    isPending: areaIsPending,
    error: areaError,
  } = useFetch("http://localhost:4001/area");

  const handleCategoryClick = (e) => {
    setFilterText(e.target.textContent);
  };

  return (
    <BrowserRouter>
      {travelError && <div>{travelError}</div>}
      <Suspense fallback={<Loading />}>
        <Main>
          <ButtonWrapper>
            <Link to="/">
              <Button>메인으로 가기</Button>
            </Link>
            <Link to="/create">
              <Button>일정 추가하기</Button>
            </Link>
          </ButtonWrapper>
          {travelData && areaData && (
            <MainWrapper>
              <Category
                handleClick={handleCategoryClick}
                data={areaData}
              ></Category>
              <Content>
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      <Home
                        data={travelData}
                        isPending={travelIsPending}
                        category={filterText}
                      />
                    }
                  />
                  <Route path="/create" element={<Create />}></Route>
                  <Route path="/detail/:id" element={<Detail />}></Route>
                </Routes>
              </Content>
            </MainWrapper>
          )}
        </Main>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
