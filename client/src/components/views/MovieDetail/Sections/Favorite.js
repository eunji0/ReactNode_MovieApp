import React, { useEffect } from 'react';
import Axios from 'axios'

function Favorite(props) {

    const movieId=props.movieId
    const useFrom=props.useFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runTime

    useEffect(()=>{

        let variables = {
            useFrom,
            movieId
        }
        Axios.post('/api/favorite/favoriteNumber', variables)
        .then(reponse =>{
            if(reponse.data.success){

            } else {
                alert('숫자 정보를 가져오는데 실패했습니다.')
            }
        })
    })
  return (
    <div>
      <button>Favorite</button>
    </div>
  )
}

export default Favorite
