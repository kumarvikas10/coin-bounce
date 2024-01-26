import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { getAllBlogs } from "../../api/internal";
import styles from './Blog.module.css';

function Blog (){
    const [blogs, setBlogs] =useState([]);

    useEffect(()=>{
        (async function getAllBLogsApiCall(){
            const response = await getAllBlogs();

            if(response.status === 200){
                setBlogs(response.data.blogs);
            }
        })();

        setBlogs([]);
    }, []);

    if(blogs.length === 0){
        return <Loader text="Blogs" />
    }
    
    return(
        <div className={styles.blogsWrapper}>
            {blogs.map((blog) =>(
                <div id={blog._id} className={styles.blog}>
                    <h1>{blog.title}</h1>
                    <img src={blog.photo} />
                    <p>{blog.content}</p>
                </div>
            ) )}
        </div>
    )
}

export default Blog;