import React, { useState, useEffect } from 'react'
import Post from './../../components/Post'
import { getPosts } from '../../store/features/PostSlice'
import { useDispatch, useSelector } from 'react-redux'

const Feed = () => {
    const dispatch = useDispatch()
    const { posts } = useSelector((state) => state.post)
    useEffect(() => {
        dispatch(getPosts())
    }, [])

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col">
                    <h2>Feed</h2>

                    {posts.length ? (
                        posts?.map((post) => <Post key={post.id} post={post} />)
                    ) : (
                        <h1 className="text-center">No Post Found</h1>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Feed
