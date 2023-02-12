import React, {useEffect} from 'react';
import classes from './Spotted.module.css';
import Button from '../../../Components/Button';
import * as Icon from 'react-bootstrap-icons';
import Wrapper from '../../../Layout/Wrapper';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from '../../../axios';

const Spotted = () => {
    const [posts, setPosts] = useState([
        {
            id: 69,
            createdAt: new Date("2023-02-06T19:21:38.727Z"),
            title: "Lekcja z symfony u stopiarza",
            text: "Chciałem się pochwalić że prowadziłem lekcje u stopiarza",
            isAnonymous: false,
            author: {
                username: "test_weryfikacji",
                name: "Seweryn",
                surname: "Pajor"
            },
            likes: 0,
            dislikes: 0,
            isLiked: false
        }
        // {
        //     id: '1',
        //     user: 'anonim',
        //     date: '6.9.2137',
        //     time: '21:37',
        //     content: 'Treść posta na spotted. Jakieś gówno, obgadywanie ludzi',
        //     likes: 69420,
        //     comments: 420,
        //     isLiked: false,
        // },
        // {
        //     id: '2',
        //     user: 'twoja mama',
        //     date: '9.6.2137',
        //     time: '21:37',
        //     content: 'post 2 jebać disa',
        //     likes: 69420,
        //     comments: 420,
        //     isLiked: false,
        // },
        // {
        //     id: '3',
        //     user: 'twoja mama',
        //     date: '9.6.2137',
        //     time: '21:37',
        //     content: 'post 2 jebać disa',
        //     likes: 69420,
        //     comments: 420,
        //     isLiked: false,
        // },
        // {
        //     id: '4',
        //     user: 'twoja mama',
        //     date: '9.6.2137',
        //     time: '21:37',
        //     content: 'post 2 jebać disapost 2 jebać disapost 2 jebać disapost 2 jebać disapost 2 jebać disapost 2 jebać disa',
        //     likes: 69420,
        //     comments: 420,
        //     isLiked: false,
        // },
    ]);

    const [listType, setListType] = useState({
        width: '40%',
    });

    const [isActive, setIsActive] = useState(true);

    function changeListTypeHandler(length: Number, id: Number) {
        setIsActive(!id);
        setListType({
            width: length + '%',
        });
    }

    function likeHandler(postId: any) {
        let postsCopy = [...posts];
        if (posts[postId - 1].isLiked) {
            postsCopy[postId - 1].isLiked = false;
            postsCopy[postId - 1].likes -= 1;
            setPosts(postsCopy);
        } else {
            postsCopy[postId - 1].isLiked = true;
            postsCopy[postId - 1].likes += 1;
            setPosts(postsCopy);
        }
    }

    useEffect(() => {
        getAllPosts();
    }, []);

    async function getAllPosts() {
        const res = await axios.get('/spotted/post');
        const posts = res.data;
        console.log(posts);
        setPosts(posts);
    }

    return (
        <>
            <div className={classes.menu}>
                <div>
                    <Icon.List className={isActive ? '' : classes.active}
                               onClick={() => changeListTypeHandler(100, 1)}/>
                    <Icon.GridFill className={isActive ? classes.active : ''}
                                   onClick={() => changeListTypeHandler(40, 0)}/>
                </div>
                <Link to="/spotted/add"><Button buttonText="Dodaj post" className='alternate'/></Link>
            </div>
            <div className={classes.posts}>
                {posts.map((post) => {

                    return (
                        <div key={post.id} style={listType}>
                            <Wrapper className={classes.post}>
                                <div className={classes.topData}>
                                    <div>
                                        <Icon.PersonFill/>
                                        {post.isAnonymous ? (
                                            'anonim'
                                        ) : (post.author.name + ' ' + post.author.surname)
                                        }
                                    </div>
                                    <>
                                        <Icon.CalendarDate/>
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </>

                                    <div>
                                        <Icon.Clock/>
                                        {new Date(post.createdAt).getHours() + ':' + new Date(post.createdAt).getMinutes()}
                                    </div>
                                    <Icon.FlagFill/>
                                </div>
                                <div className={classes.content}>
                                    {post.text}
                                </div>
                                <div className={classes.bottomData}>
                                    <div onClick={() => {
                                        likeHandler(post.id)
                                    }}>
                                        {post.isLiked && <Icon.HeartFill style={{color: 'var(--add1-500)'}}/>}
                                        {!post.isLiked && <Icon.Heart/>}
                                        <p style={post.isLiked ? {color: 'var(--add1-500)'} : {}}>{post.likes}</p>
                                    </div>
                                    {/*<div>*/}
                                    {/*    <Icon.ChatLeftText/>*/}
                                    {/*    {post.comments + ' komentarzy'}*/}
                                    {/*</div>*/}
                                </div>
                            </Wrapper>
                        </div>)
                })}
            </div>
        </>
    )
}

export default Spotted;