import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getShowById } from '../api/tvmaze';

const Show = () => {
  const { showId } = useParams();

  const [showData, setshowData] = useState(null);
  const [showError, setshowError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getShowById(showId);
        setshowData(data);
      } catch (err) {
        setshowError(err);
      }
    }
    fetchData();
  }, [showId]);

  if (showError) {
    return <div>We have an error:{showError.message}</div>;
  }

  if (showData) {
    return <div>Got show data : {showData.name}</div>;
  }

  return <div>Data is Loading..</div>;
};

export default Show;
