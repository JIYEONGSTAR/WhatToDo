import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loading from "../component/Loading";

const StyledTable = styled.table`
  width: 80%;
  height: 80%;
  background-color: var(--subColor);
  justify-content: center;
  align-items: center;
  thead > tr {
    background-color: var(--mainColor);
  }
`;
const Home = ({ data, isPending, category }) => {
  const [filterData, setFilterData] = useState(data);
  console.log(category);
  useEffect(() => {
    category && setFilterData(data.filter((d) => d.areaName === category));
  }, [category]);

  const handleClick = () => {};
  const tableHeader = ["이름", "카테고리", "세부정보"];
  return (
    <>
      {isPending && <Loading />}
      {filterData && (
        <StyledTable>
          <tr>
            {tableHeader.map((title, idx) => (
              <th key={idx}>{title}</th>
            ))}
          </tr>
          {filterData.map((d) => (
            <tr onClick={handleClick}>
              <td>{d.name}</td>
              <td>{d.detail}</td>
              <input type="checkbox" checked={d.visited}></input>
            </tr>
          ))}
        </StyledTable>
      )}
    </>
  );
};

export default Home;
