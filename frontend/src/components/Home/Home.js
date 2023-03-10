import React, {useState, useEffect} from 'react';
import {Container, Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core';
import { Form } from '../Form/Form';
import { Posts } from '../Posts/Posts';
import useStyles from "./styles";
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Pagination from '../Pagination';
import {useLocation, useNavigate} from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Home() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);

    const handleKeyPress = (e) => {
        if (e.keyCode === 13 ) // enter key
        {
            searchPost();
        }
    }

    const handleAdd = (tag) => {
        setTags([...tags, tag]);
    }

    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    }

    const searchPost = () => {
        if (search.trim() || tags)
        {
            dispatch(getPostsBySearch({search, tags: tags.join(",")}));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }
        else
        {
            navigate("/");
        }
    };

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid className={classes.gridContainer} container justify-content='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId}></Posts>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position='static' color = 'inherit'>
                            <TextField
                                name='search'
                                variant='outlined'
                                label='Search Memories'
                                onKeyPress={handleKeyPress}
                                fullWidth
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}>
                            </TextField>
                            <ChipInput
                                style={{margin: '10px 0'}}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label='Search Tags'
                                variant='outlined'
                            ></ChipInput>
                            <Button onClick={searchPost} className={classes.searchButton} color='primary' variant='contained'>Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
                        {(!searchQuery && !tags.length) &&
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page}></Pagination>
                            </Paper>
                        }
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home