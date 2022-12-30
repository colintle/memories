import React from 'react'
import {Post} from './Post/Post.js';
import useStyles from './styles';
import {Grid, CircularProgress} from '@material-ui/core';
import {useSelector} from 'react-redux';

export function Posts({setCurrentId}) {
  const {posts, isLoading} = useSelector((state) =>  state.posts);
  const classes = useStyles();

  if (!posts.length && !isLoading) return 'No posts';
  return (
    isLoading ? <CircularProgress></CircularProgress> : (
      <Grid className = {classes.container} container alignItems="stretch" spacing={3}>
        {
          posts.map((post) => (
            <Grid item key={post.id} xs={12} sm={12} md={6} lg={3}>
              <Post post={post} setCurrentId={setCurrentId}></Post>
            </Grid>
          ))
        }
      </Grid>
    )
  )
}
