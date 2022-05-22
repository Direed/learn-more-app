import React, {ReactChildren, ReactElement, useState} from 'react'
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import {useSelector} from "react-redux";
import {getUser} from "../store/selectors/auth";

import './style.scss'

type IProps = {
    children: ReactElement
    isTopic?: boolean,
    background: string,
    color: string,
}

const Wrapper: React.FC<IProps> = ({children, isTopic = false, background, color}: IProps) => {
    const user = useSelector(getUser)
    const [isOpenMenu, setIsOpenMenu] = useState(false)
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
            {isTopic ? <button className={`BackButton ${!isOpenMenu && 'disableSideBar'}`}>Back to topics</button> : null}
        </>
    )

}

export default Wrapper;
