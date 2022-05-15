import React, {useMemo} from 'react'
import {useNavigate} from "react-router-dom";

import './SideBar.scss'

import pathes from "../../routes/pathes";

const SideBar = () => {
    const navigate = useNavigate()

    const routes = useMemo(() => {
        return [
            {
                title: 'Home',
                img: process.env.PUBLIC_URL + '/images/home.svg',
                bgColor: '#00BBF9',
                handleClick: () => {
                    navigate(pathes.home)
                }
            },
            {
                title: 'Subjects',
                img: process.env.PUBLIC_URL + '/images/subjects.svg',
                bgColor: '#2a2828',
                handleClick: () => {
                    navigate(pathes.subjects)
                }

            },
            {
                title: 'Completed works',
                img: process.env.PUBLIC_URL + '/images/completed_works.svg',
                bgColor: '#2a2828',
                handleClick: () => {
                    navigate(pathes.home)
                }
            },
        ]
    }, [])

    return (
        <div className='SideBar'>
            {routes.map((route) => {
                return (
                    <div style={{backgroundColor: route.bgColor}} className='SideBar__routeWrapper' onClick={route.handleClick}>
                        <img src={route.img}/>
                        <a>{route.title}</a>
                    </div>
                )
            })}
        </div>
    )
}

export default SideBar
