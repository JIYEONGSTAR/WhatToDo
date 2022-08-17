import React, { useState } from "react";
import useFetch from "../util/useFetch";
import Button from "../styles/common";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [area, setArea] = useState("장소");
  const [name, setName] = useState("");
  const [type, setType] = useState("유형");
  const [detail, setDetail] = useState("");
  const { data: areas } = useFetch("http://localhost:4001/area");
  const { data: types } = useFetch("http://localhost:4001/category");
  // const SelectButton = styled.input.attrs({
  //   type: "select",
  // })`
  //   width: 5.5em;
  // `;
  const handleSubmit = (e) => {
    e.preventDefault();
    const bodys = {
      areaName: area,
      categoryName: type,
      name,
      detail,
      visited: false,
    };
    fetch("http://localhost:4001/travel", {
      method: "POST",
      body: JSON.stringify(bodys),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => navigate("/"))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {areas && types && (
        <>
          {console.log(areas)}
          <select onChange={(e) => setArea(e.target.value)} value={area}>
            {areas.map((a) => (
              <option value={a.area} key={a.id}>
                {a.area}
              </option>
            ))}
          </select>

          <input value={name} onChange={(e) => setName(e.target.value)}></input>
          <select onChange={(e) => setType(e.target.value)} value={type}>
            {types.map((t) => (
              <option value={t.category} key={t.id}>
                {t.category}
              </option>
            ))}
          </select>
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          ></textarea>
          <Button onClick={handleSubmit}>저장하기</Button>
        </>
      )}
    </div>
  );
};

export default Create;
