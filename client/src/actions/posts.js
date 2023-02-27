import * as api from "../api";
import {
  CREATE,
  FETCH_ALL,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
} from "../constants/actionType";
// Action Creators
// Action creators are the function that return actions.

// we are using redux thunk for performing asynchronous actions.
//action creators
// as soon as this below action dispatch and we are doing in App.js (useEffect hook) ,we immediately go to the post reducer and there we have to handle
// the logic of fetching all post.

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    // console.log(data);
    const action = { type: FETCH_ALL, payload: data }; // action
    dispatch(action);
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    // console.log(data);
    dispatch({ type: FETCH_POST, payload: data }); //action
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
export const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post); //it is making a post api request.
    navigate(`/posts/${data._id}`);
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    //here we are making API request for updating the post.
    const { data } = await api.updatePost(id, post); //it will return updated post
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    dispatch({type:COMMENT,payload:data});
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};