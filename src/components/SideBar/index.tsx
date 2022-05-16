import React, {useMemo} from 'react'
import {useNavigate} from "react-router-dom";

import './SideBar.scss'

import pathes from "../../routes/pathes";
import {useDispatch, useSelector} from "react-redux";
import {getActiveRoute, getMainBgColor} from "../../store/selectors/auth";
import {setActiveRoute} from "../../store/actions/auth";

const SideBar = ({isTopic}: any) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const mainBgColor = useSelector(getMainBgColor)
    const activeRoute = useSelector(getActiveRoute)

    const routes = useMemo(() => {
        if(isTopic) {
            return [
                {
                    title: 'Video',
                    img: process.env.PUBLIC_URL + '/images/home.svg',
                    bgColor: '#2a2828',
                    handleClick: () => {
                        navigate(pathes.topic.video)
                        dispatch(setActiveRoute('Video'))
                    }
                },
                {
                    title: 'Text',
                    img: process.env.PUBLIC_URL + '/images/subjects.svg',
                    bgColor: '#2a2828',
                    handleClick: () => {
                        navigate(pathes.topic.text)
                        dispatch(setActiveRoute('Text'))
                    }

                },
                {
                    title: 'Homework',
                    img: process.env.PUBLIC_URL + '/images/completed_works.svg',
                    bgColor: '#2a2828',
                    handleClick: () => {
                        navigate(pathes.topic.homework)
                        dispatch(setActiveRoute('Homework'))
                    }
                },
                {
                    title: 'Test',
                    img: process.env.PUBLIC_URL + '/images/completed_works.svg',
                    bgColor: '#2a2828',
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
                handleClick: () => {
                    navigate(pathes.home)
                    dispatch(setActiveRoute('Home'))
                }
            },
            {
                title: 'Subjects',
                img: process.env.PUBLIC_URL + '/images/subjects.svg',
                bgColor: '#2a2828',
                handleClick: () => {
                    navigate(pathes.subjects)
                    dispatch(setActiveRoute('Subjects'))
                }

            },
            {
                title: 'Completed works',
                img: process.env.PUBLIC_URL + '/images/completed_works.svg',
                bgColor: '#2a2828',
                handleClick: () => {
                    navigate(pathes.home)
                    dispatch(setActiveRoute('Completed works'))
                }
            },
        ]
    }, [isTopic])

    return (
        <div className='SideBar'>
            {routes.map((route) => {
                return (
                    <div style={{backgroundColor: activeRoute === route.title ? mainBgColor : route.bgColor}} className='SideBar__routeWrapper' onClick={route.handleClick}>
                        <img src={route.img}/>
                        <a>{route.title}</a>
                    </div>
                )
            })}
        </div>
    )
}

export default SideBar
