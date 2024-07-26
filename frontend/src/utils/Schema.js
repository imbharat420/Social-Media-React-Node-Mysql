import * as Yup from 'yup'
export const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
})

export const RegisterSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
})


export const CreatePostSchema = Yup.object().shape({
    content: Yup.string().required('Post is required'),
})