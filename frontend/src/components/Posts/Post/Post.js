import React, {useState} from 'react'
import useStyles from './styles';
import {Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Moment from 'react-moment';
import {useDispatch} from 'react-redux';
import {deletePost, likePost} from '../../../actions/posts';
import {useNavigate} from 'react-router-dom';

export function Post({post, setCurrentId}) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  const userId = user?.sub || user?._id;
  const hasLikedPost = likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost)
    {
      setLikes(likes.filter((id) => id !== (userId)))
    }
    else
    {
      setLikes([...likes, userId]);
    }
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title}>
        </CardMedia>
        <div className={classes.overlay}>
          <Typography variant='h6'>{post?.name}</Typography>
          <Typography variant='body2'>
            <Moment fromNow>
              {post.createdAt}
            </Moment>
          </Typography>
        </div>
        {(user?.sub === post?.creator || user?._id === post?.creator) &&
          <div className={classes.overlay2}>
            <Button style={{color:'white'}} size='small' onMouseEnter={() => setCurrentId(post._id)}>
              <MoreHorizIcon fontSize='default'></MoreHorizIcon>
            </Button>
          </div>
        }
        <div className={classes.details}>
          <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography variant='h5' className={classes.title} gutterBottom>{post.title}</Typography>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary' disabled={!user} onClick={handleLike}>
          <Likes></Likes>
        </Button>
        {(user?.sub === post?.creator || user?._id === post?.creator) && 
          <Button size='small' color='primary' onClick={() => {dispatch(deletePost(post._id))}}>
            <DeleteIcon fontSize='small'></DeleteIcon>
            Delete
          </Button>
        }
      </CardActions>
    </Card>
  )
}