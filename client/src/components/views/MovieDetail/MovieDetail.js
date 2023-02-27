
import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCard from '../commons/GridCard';
import { Row } from 'antd';
import Favorite from './Sections/Favorite';
import Comment from './Sections/Comment';
import Axios from 'axios';

function MovieDetail(props) {

    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)
    const [Comments, setComments] = useState([])

    useEffect(() => {
        // console.log(props.match)
        const varable = { movieId: movieId }

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`

        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                // console.log(response)
                setMovie(response)
            })

        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                // console.log('reponseForCrew', response)
                setCasts(response.cast)
            })

        Axios.post('/api/comment/getComments', varable)
        .then(response =>{
            if(response.data.success){
                setComments(response.data.Comments)

                console.log(response.data.Comments)
            }else{
                alert('코멘트 정보를 가져오는 것을 실패하였습니다/')
            }
        })



    }, [])
    return (
        <div>
            {/* {Header} */}

            <MainImage
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview} />

            {/* {Body} */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <div
                    style={{ display: 'flex', justifyContent: 'flex-end' /*버튼을 오른쪽으로밀겠다는의미*/, }}>
                    <Favorite
                        movieInfo={Movie} //무비정보
                        movieId={movieId} //무비Id
                        userFrom={localStorage.getItem('userId')} //로그인한 사람의정보
                    />
                </div>
                {/* {Movie Info} */}
                <MovieInfo
                    movie={Movie}
                />
                <br />
                {/* {Actors Grid} */}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={() => setActorToggle(!ActorToggle)}> Toggle Actor View</button>
                </div>

                {
                    ActorToggle &&
                    <Row gutter={[16, 16]}>
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCard
                                    image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    characterName={cast.name}
                                />
                            </React.Fragment>
                        ))}
                    </Row>
                }


                <Comment commentLists={Comments} postId={movieId} />

            </div>
        </div>
    )
}

export default MovieDetail
