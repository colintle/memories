import Express from 'express';

import {getPostsBySearch, getPosts, createPost, updatePost, deletePost, likePost, getPost, commentPost} from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = Express.Router();

router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost)
router.post('/', auth, createPost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);


export default router;