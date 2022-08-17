import { useState, useEffect } from "react";

const useFetch = (url) => {
  //url을 입력받아 fetch 함수를 작성한다.
  //   GET 메소드를 통해 데이터를 받아오는 useEffect hook은 컴포넌트 내 여기저기 존재하고 있다.
  // 해당 hook은 반복이 되는 부분이 있으므로 custom hook으로 만든다.
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setIsPending(false);
          setData(data);
          setError(null);
        })
        .catch((err) => {
          setIsPending(false);
          setError(err.message);
        });
    }, 1000);
  }, []);
  return { data, isPending, error };
};

export default useFetch;
