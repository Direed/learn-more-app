import React, {useMemo} from 'react'
import {NavLink, useLocation, useNavigate} from "react-router-dom";

import './SideBar.scss'

import pathes from "../../routes/pathes";
import {useDispatch, useSelector} from "react-redux";
import {getActiveRoute, getMainBgColor} from "../../store/selectors/auth";
import {setActiveRoute} from "../../store/actions/auth";

const SideBar = ({isTopic, background, color}: any) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const mainBgColor = useSelector(getMainBgColor)
    const location = useLocation()
    const activeRoute = useSelector(getActiveRoute)

    const routes = useMemo(() => {
        if(isTopic) {
            return [
                {
                    title: 'Video',
                    img: process.env.PUBLIC_URL + '/images/VideoIcon.svg',
                    bgColor: '#2a2828',
                    to: pathes.topic.video,
                    handleClick: () => {
                        navigate(pathes.topic.video)
                        dispatch(setActiveRoute('Video'))
                    }
                },
                {
                    title: 'Text',
                    img: process.env.PUBLIC_URL + '/images/TextIcon.svg',
                    bgColor: '#2a2828',
                    to: pathes.topic.text,
                    handleClick: () => {
                        navigate(pathes.topic.text)
                        dispatch(setActiveRoute('Text'))
                    }

                },
                {
                    title: 'Homework',
                    img: process.env.PUBLIC_URL + '/images/HomeworkIcon.svg',
                    bgColor: '#2a2828',
                    to: pathes.topic.homework,
                    handleClick: () => {
                        navigate(pathes.topic.homework)
                        dispatch(setActiveRoute('Homework'))
                    }
                },
                {
                    title: 'Test',
                    img: process.env.PUBLIC_URL + '/images/TestIcon.svg',
                    bgColor: '#2a2828',
                    to: pathes.topic.test,
                    handleClick: () => {
                        navigate(pathes.topic.test)
                        dispatch(setActiveRoute('Test'))
                    }
                },
            ]
        }

        return [
            {
                title: 'Home',
                img: process.env.PUBLIC_URL + '/images/home.svg',
                bgColor: '#2a2828',
                to: pathes.home,
                handleClick: () => {
                    navigate(pathes.home)
                    dispatch(setActiveRoute('Home'))
                }
            },
            {
                title: 'Subjects',
                img: process.env.PUBLIC_URL + '/images/subjects.svg',
                bgColor: '#2a2828',
                to: pathes.subjects,
                handleClick: () => {
                    navigate(pathes.subjects)
                    dispatch(setActiveRoute('Subjects'))
                }

            },
            {
                title: 'Completed works',
                img: process.env.PUBLIC_URL + '/images/completed_works.svg',
                bgColor: '#2a2828',
                to: pathes.topics,
                handleClick: () => {
                    navigate(pathes.home)
                    dispatch(setActiveRoute('Completed works'))
                }
            },
        ]
    }, [isTopic])

    return (
        <div className='SideBar'>
            {isTopic ? <h1 className='SideBar--title'>Lesson materials</h1> : null}
            {routes.map((route) => {
                return (
                    <NavLink
                        className={(data) => data.isActive ? 'navLink active' : 'navLink'}
                        to={route.to}
                    >
                        <div style={{backgroundColor: location.pathname.includes(route.to) ? background : route.bgColor, color: location.pathname.includes(route.to) && color}} className='SideBar__routeWrapper' onClick={route.handleClick}>
                            <img src={route.img}/>
                            <a>{route.title}</a>
                        </div>
                    </NavLink>
                )
            })}
        </div>
    )
}

export default React.memo(SideBar)
