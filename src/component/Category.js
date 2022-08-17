import React, { useState } from "react";
import styled from "styled-components";

// import "../styles/common.css";
const CategoryWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: 1rem;
  background-color: var(--mainColor);
  padding: 1rem;
  border-radius: 20px;
  overflow: auto;
`;
const CategoryButton = styled.button`
  width: 100px;
  padding: 1rem;
  border: 0;
  border-radius: 0.5rem;
  background-color: var(--pointColor);
  color: var(--mainColor);
  margin-bottom: 1rem;
  cursor: pointer;
`;
const Category = ({ handleClick, data }) => {
  const [addArea, setAddArea] = useState(false);
  const [area, setArea] = useState("");
  const handleSubmit = (e) => {
    area !== ""
      ? fetch("http://localhost:4001/area", {
          method: "POST",
          body: JSON.stringify({ area }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            alert("장소가 추가되었습니다");
            setAddArea(false);
          })
          .catch((err) => console.log(err))
      : setAddArea(false);
  };
  return (
    <CategoryWrapper>
      {data.map((d, idx) => (
        <CategoryButton key={idx} onClick={handleClick}>
          {d.area}
        </CategoryButton>
      ))}
      {console.log(addArea)}
      {addArea ? (
        <>
          <input value={area} onChange={(e) => setArea(e.target.value)}></input>
          <button onClick={handleSubmit}>저장하기</button>
        </>
      ) : (
        <CategoryButton onClick={() => setAddArea(true)}>
          장소 추가하기
        </CategoryButton>
      )}
    </CategoryWrapper>
  );
};

export default Category;
