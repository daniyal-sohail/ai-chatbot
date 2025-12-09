"use client"
import axios from 'axios'

export const onGetBlogsPosts = async () => {
    try {
        const postArray: {
            id: string;
            title: string;
            description: string;
            image: string;
            createdAt: Date;
            updatedAt: Date;
        }[] = []

        const posts = await axios.get('https://jsonplaceholder.typicode.com/posts')

    } catch (error) {

    }
}