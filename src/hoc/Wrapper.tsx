import React, {ReactChildren, ReactElement, useState} from 'react'
import Header from "../components/Header";
import SideBar from "../components/SideBar";

type IProps = {
    children: ReactElement
}

const Wrapper: React.FC<IProps> = ({children}: IProps) => {
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
                {isOpenMenu && <SideBar/>}
                {children}
            </div>
        </>
    )

}

export default Wrapper;
