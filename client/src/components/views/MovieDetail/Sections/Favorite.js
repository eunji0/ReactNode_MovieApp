import React, { useEffect, useState } from 'react';
import Axios from 'axios'

function Favorite(props) {

  const movieId = props.movieId
  const useFrom = props.useFrom
  const movieTitle = props.movieInfo.title
  const moviePost = props.movieInfo.backdrop_path
  const movieRunTime = props.movieInfo.runTime
  
  const [FavoriteNumber, setFavoriteNumber]=useState(0)
  // const [Favorited, setFavorited] = useState(false)

  useEffect(() => {

    let variables = {
      useFrom,
      movieId
    }
    Axios.post('/api/favorite/favoriteNumber', variables)
      .then(reponse => {
        
        if (reponse.data.success) {
          console.log('favorite',reponse.data)
        } else {
          alert('숫자 정보를 가져오는데 실패했습니다.')
        }
      })

      Axios.post('/api/favorite/favorited', variables)
      .then(reponse => {
        if (reponse.data.success) {
          console.log('favorited',reponse.data)

        } else {
          alert('정보를 가져오는데 실패했습니다.')
        }
      })
  }, [])
  return (
    <div>
      <button>Favorite</button>
    </div>
  )
}

export default Favorite
