import ShowCard from './ShowCard';
import { useEffect, useReducer } from 'react';

const usePersistedreducer = (reducer, initialState, locaLStorageKey) => {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persistValue = localStorage.getItem(locaLStorageKey);

    return persistValue ? JSON.parse(persistValue) : initial;
  });

  useEffect(() => {
    localStorage.setItem(locaLStorageKey, JSON.stringify(state));
  }, [state, locaLStorageKey]);

  return [state, dispatch];
};

const starredShowsReducer = (currentStarred , action) => {
  switch(action.type){
    case 'STAR':
      return currentStarred.concat(action.showId);
      case 'UNSTAR':
      return currentStarred.filter(showId => showId !== action.showId);
      default:
      return currentStarred;
  }
};

const ShowGrid = ({ shows }) => {
  const [starredShows, dispatchStarred] = usePersistedreducer(
    starredShowsReducer,
    [],
    'starredShows'
  );

  const onStarMeClick = showId => {
    const isStarred = starredShows.includes(showId);

    if (isStarred) {
      dispatchStarred({ type: 'UNSTAR', showId });
    } else {
      dispatchStarred({ type: 'STAR', showId });
    }
  };

  return (
    <div>
      {shows.map(data => (
        <ShowCard
          key={data.show.id}
          id={data.show.id}
          name={data.show.name}
          image={
            data.show.image ? data.show.image.medium : 'not-found-image.png'
          }
          summary={data.show.summary}
          onStarMeClick={onStarMeClick}
          isStarred ={starredShows.includes(data.show.id)}
        />
      ))}
    </div>
  );
};
export default ShowGrid;
