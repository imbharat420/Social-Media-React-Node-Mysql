import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiPost from '../../api/post.api'

export const getPosts = createAsyncThunk('/post/getPosts', async () => {
    const { data } = await apiPost.getAll()
    return data
})

const initialState = {
    posts: [],
}

const updatePosts = (state, { payload }) => {
    state.posts = payload?.posts
}

const postSlice = createSlice({
    name: 'post',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPosts.fulfilled, updatePosts)
    },
})

export const {} = postSlice.actions

export default postSlice.reducer
