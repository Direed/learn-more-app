import React, {ReactChildren, ReactElement, useCallback, useState} from 'react'
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import {useDispatch, useSelector} from "react-redux";
import {getActiveRoute, getUser} from "../store/selectors/auth";

import './style.scss'
import {useNavigate} from "react-router-dom";
import pathes from "../routes/pathes";
import {clearTopic} from "../store/actions/test";

type IProps = {
    children: ReactElement
    isTopic?: boolean,
    background: string,
    color: string,
}

const Wrapper: React.FC<IProps> = ({children, isTopic = false, background, color}: IProps) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(getUser)
    const activeRoute = useSelector(getActiveRoute)
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const onBackToTopics = useCallback(() => {
        dispatch(clearTopic())
        navigate(pathes.topics)
    }, [])
    return (
        <>
            <Header
                title={activeRoute}
                user={{first_name: user?.first_name, last_name: user?.last_name, photo: user?.photo}}
                countAlerts={1}
                isOpenMenu={isOpenMenu}
                setIsOpenMenu={setIsOpenMenu}
            />
            <div style={{display: 'flex', flexDirection: 'row'}}>
                {isOpenMenu && <SideBar isTopic={isTopic} background={background} color={color}/>}
                {children}
            </div>
            {isTopic ? <button className={`BackButton ${!isOpenMenu && 'disableSideBar'}`} onClick={onBackToTopics}>Повернутись до тем</button> : null}
        </>
    )

}

export default Wrapper;
