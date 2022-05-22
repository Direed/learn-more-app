import React, {ReactChildren, ReactElement, useCallback, useState} from 'react'
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import {useSelector} from "react-redux";
import {getUser} from "../store/selectors/auth";

import './style.scss'
import {useNavigate} from "react-router-dom";
import pathes from "../routes/pathes";

type IProps = {
    children: ReactElement
    isTopic?: boolean,
    background: string,
    color: string,
}

const Wrapper: React.FC<IProps> = ({children, isTopic = false, background, color}: IProps) => {
    const navigate = useNavigate()
    const user = useSelector(getUser)
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const onBackToTopics = useCallback(() => {
        navigate(pathes.topics)
    }, [])
    return (
        <>
            <Header
                title={'Home'}
                user={{first_name: user?.first_name, last_name: user?.last_name, photo: user?.photo}}
                countAlerts={1}
                isOpenMenu={isOpenMenu}
                setIsOpenMenu={setIsOpenMenu}
            />
            <div style={{display: 'flex', flexDirection: 'row'}}>
                {isOpenMenu && <SideBar isTopic={isTopic} background={background} color={color}/>}
                {children}
            </div>
            {isTopic ? <button className={`BackButton ${!isOpenMenu && 'disableSideBar'}`} onClick={onBackToTopics}>Back to topics</button> : null}
        </>
    )

}

export default Wrapper;
