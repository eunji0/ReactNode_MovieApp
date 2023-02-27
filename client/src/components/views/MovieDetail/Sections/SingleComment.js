import { Avatar, Comment, Button, Input } from 'antd'
import React, { useState } from 'react'

function SingleComment(props) {

    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setcommentValue] = useState("")

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }

    const onHandleChange =(event)=>{
        setcommentValue(event.currentTarget.CommentValue)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        // const variables = {
        //     content: CommentValue,
        //     writer: user.userData._id,
        //     postId: props.postId,
        //     responseTo:
        // }

        // console.log('varables', variables)

        // Axios.post('/api/comment/saveComment', variables)
        // .then(response => {
        //     if(response.data.success){
        //         console.log(response.data.result)
        //     }else{
        //         alert('커멘트를 저장하지 못했습니다.')
        //     }
        // })
    }

    const actions = [
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
    ]
    return (

        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt />}
                content={<p>{props.comment.content}</p>}
            />

            {OpenReply &&

                <form style={{ display: 'flex' }} onSubmit={onsubmit}>
                    <textarea style={{ width: '100%', borderRadius: '5px' }}
                        onChange={onHandleChange}
                        value={CommentValue}
                        placeholder="코멘트를 작성해 주세요"
                    />
                    <br />
                    <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
                </form>
            }
        </div>
    )
}

export default SingleComment
