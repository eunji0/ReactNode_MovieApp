import React, { useEffect, useState } from 'react';
import Axios from 'axios';
function Favorite(props) {
  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  useEffect(() => {
    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    let variables = {
      userFrom: userFrom,
      movieId: movieId,
    };
    Axios.post('/api/favorite/favoriteNumber', variables)
      //좋아요 숫자 가져오는 API
      .then((response) => {
        if (response.data.success) {
          console.log(response.data)
          setFavoriteNumber(response.data.favoriteNumber);
        } else {
          alert('숫자 정보를 가져오는데 실패하였습니다.');
        }
      });

    Axios.post('/api/favorite/favorited', variables)
      //내가 좋아요를 눌렀는지에대한 정보가져오는 API
      .then((response) => {
        if (response.data.success) {
          console.log("favorited", response.data)
          setFavorited(response.data.favorited);
        } else {
          alert('좋아요 정보를 가져오는데 실패하였습니다.');
        }
      });
  }, []);
  return (
    <div>
      <button>
        {Favorited ? 'Not Favorite' : 'Add to Favorite'} {FavoriteNumber}
      </button>
    </div>
  );
}

export default Favorite;