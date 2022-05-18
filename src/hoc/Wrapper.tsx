import React, {ReactChildren, ReactElement, useState} from 'react'
import Header from "../components/Header";
import SideBar from "../components/SideBar";

type IProps = {
    children: ReactElement
    isTopic?: boolean
}

const Wrapper: React.FC<IProps> = ({children, isTopic = false}: IProps) => {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    return (
        <>
            <Header
                title={'Home'}
                user={{firstName: 'Anton', lastName: 'Vyhrest', img: '/images/avatar.svg'}}
                countAlerts={1}
                isOpenMenu={isOpenMenu}
                setIsOpenMenu={setIsOpenMenu}
            />
            <div style={{display: 'flex', flexDirection: 'row'}}>
                {isOpenMenu && <SideBar isTopic={isTopic}/>}
                {children}
            </div>
        </>
    )

}

export default Wrapper;
