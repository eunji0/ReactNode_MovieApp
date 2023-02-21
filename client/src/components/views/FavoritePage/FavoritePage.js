import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import './favorite.css';
import { Popover } from 'antd';

function FavoritePage() {

  const [Favorites, setFavorites] = useState([])

  useEffect(() => {
    Axios.post('/api/favorite/getFavoriteMovie', { userFrom: localStorage.getItem('userId') })
      .then(response => {
        if (response.data.success) {
          console.log(response.data)
          setFavorites(response.data.favorites)
        }
        else {
          alert('영화 정보를 가져오는데 실패했습니다.')
        }
      })
  })

const renderCards = Favorites.map((favorite, index) => {
  return <tr key={index}>
    <Popover title={`${favorite.movieTitle}`}>
    <td>{favorite.movieTitle}</td>
    </Popover>
    
    <td>{favorite.movieRunTime}</td>
    <td><button>Remove</button></td>
  </tr>

})

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h2>Favorite Movie</h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <td>Remove from favorites</td>
          </tr>
        </thead>
        <tbody>
          {renderCards}
        </tbody>
      </table>
    </div>
  )
}

export default FavoritePage
