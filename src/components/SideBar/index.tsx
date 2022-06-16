import React, {useMemo} from 'react'
import {NavLink, useLocation, useNavigate} from "react-router-dom";

import './SideBar.scss'

import pathes from "../../routes/pathes";
import {useDispatch} from "react-redux";
import {setActiveRoute} from "../../store/actions/auth";

const SideBar = ({isTopic, background, color}: any) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const routes = useMemo(() => {
        if(isTopic) {
            return [
                {
                    title: 'Відео',
                    img: process.env.PUBLIC_URL + '/images/VideoIcon.svg',
                    darkIcon: process.env.PUBLIC_URL + '/images/VideoDarkIcon.svg',
                    bgColor: '#2a2828',
                    to: pathes.topic.video,
                    handleClick: () => {
                        navigate(pathes.topic.video)
                        dispatch(setActiveRoute('Відео'))
                    }
                },
                {
                    title: 'Текст',
                    img: process.env.PUBLIC_URL + '/images/TextIcon.svg',
                    darkIcon: process.env.PUBLIC_URL + '/images/textDarkIcon.svg',
                    bgColor: '#2a2828',
                    to: pathes.topic.text,
                    handleClick: () => {
                        navigate(pathes.topic.text)
                        dispatch(setActiveRoute('Текст'))
                    }

                },
                {
                    title: 'Домашня робота',
                    img: process.env.PUBLIC_URL + '/images/HomeworkIcon.svg',
                    darkIcon: process.env.PUBLIC_URL + '/images/homeworkDarkIcon.svg',
                    bgColor: '#2a2828',
                    to: pathes.topic.homework,
                    handleClick: () => {
                        navigate(pathes.topic.homework)
                        dispatch(setActiveRoute('Домашня робота'))
                    }
                },
                {
                    title: 'Тест',
                    img: process.env.PUBLIC_URL + '/images/TestIcon.svg',
                    bgColor: '#2a2828',
                    to: pathes.topic.test,
                    handleClick: () => {
                        navigate(pathes.topic.test)
                        dispatch(setActiveRoute('Тест'))
                    }
                },
            ]
        }

        return [
            {
                title: 'Головна',
                img: process.env.PUBLIC_URL + '/images/home.svg',
                darkIcon: process.env.PUBLIC_URL + '/images/homeDarkIcon.svg',
                bgColor: '#2a2828',
                to: pathes.home,
                handleClick: () => {
                    navigate(pathes.home)
                    dispatch(setActiveRoute('Головна'))
                }
            },
            {
                title: 'Предмети',
                img: process.env.PUBLIC_URL + '/images/Subjects.svg',
                bgColor: '#2a2828',
                to: pathes.subjects,
                handleClick: () => {
                    navigate(pathes.subjects)
                    dispatch(setActiveRoute('Предмети'))
                }

            },
            {
                title: 'Виконані роботи',
                img: process.env.PUBLIC_URL + '/images/completed_works.svg',
                bgColor: '#2a2828',
                to: pathes.completedWorks,
                handleClick: () => {
                    navigate(pathes.home)
                    dispatch(setActiveRoute('Виконані роботи'))
                }
            },
            {
                title: 'Прогрес',
                img: process.env.PUBLIC_URL + '/images/Progress.svg',
                bgColor: '#2a2828',
                to: pathes.progress,
                handleClick: () => {
                    navigate(pathes.home)
                    dispatch(setActiveRoute('Прогрес'))
                }
            },
            {
                title: 'Налаштування',
                img: process.env.PUBLIC_URL + '/images/Settings.svg',
                bgColor: '#2a2828',
                to: pathes.settings,
                handleClick: () => {
                    navigate(pathes.home)
                    dispatch(setActiveRoute('Налаштування'))
                }
            },
            {
                title: 'Підтримка',
                img: process.env.PUBLIC_URL + '/images/Support.svg',
                bgColor: '#2a2828',
                to: pathes.support,
                handleClick: () => {
                    navigate(pathes.home)
                    dispatch(setActiveRoute('Підтримка'))
                }
            },
            {
                title: 'Вихід',
                img: process.env.PUBLIC_URL + '/images/logout.svg',
                bgColor: '#2a2828',
                to: pathes.login,
                handleClick: () => {
                    navigate(pathes.mainRoute)
                    dispatch(setActiveRoute('Completed works'))
                }
            },
        ]
    }, [isTopic])

    return (
        <div className='SideBar'>
            {isTopic ? <h1 className='SideBar--title'>Матеріали уроку</h1> : null}
            {routes.map((route) => {
                return (
                    <NavLink
                        className={(data) => data.isActive ? 'navLink active' : 'navLink'}
                        to={route.to}
                    >
                        <div style={{backgroundColor: location.pathname.includes(route.to) ? background : route.bgColor, color: location.pathname.includes(route.to) && color}} className='SideBar__routeWrapper' onClick={route.handleClick}>
                            <img src={location.pathname.includes(route.to) && route?.darkIcon ? route.darkIcon : route.img}/>
                            <a>{route.title}</a>
                        </div>
                    </NavLink>
                )
            })}
        </div>
    )
}

export default React.memo(SideBar)
