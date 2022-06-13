import React from 'react'
import './Header.scss'
import {IUser} from "../../store/reducers/auth";

type IProps = {
    title: string,
    user: IUser,
    countAlerts: number,
    isOpenMenu: boolean,
    setIsOpenMenu: (value: boolean) => void
}


const Header: React.FC<IProps> = ({title, user, countAlerts = 0, isOpenMenu, setIsOpenMenu}: IProps) => {
    return (
        <div className='Header'>
            <div className='Header__menu' onClick={() => {
                setIsOpenMenu(!isOpenMenu)
            }}>
                <img src={process.env.PUBLIC_URL+'/images/menu.svg'}/>
            </div>
            <div className='Header__title'>{title}</div>
            <div className='Header__userWrapper'>
                <div className='Header__userWrapper--alerts'>
                    <img src={process.env.PUBLIC_URL + '/images/bell.svg'}/>
                    <div className={'Header__userWrapper--alerts--counter'}>{countAlerts}</div>
                </div>
                <div className='Header__userWrapper__user'>
                    <div className='Header__userWrapper__user--userName'>{`${user?.first_name} ${user?.last_name ? user?.last_name : ''}`}</div>
                    { user && user?.photo ? <img className='Header__userWrapper__user--userIcon' src={user?.photo}></img> : <div className='Header__userWrapper__user--userIcon'><h1 style={{color: '#FFFFFF'}}>{user?.first_name?.length && user?.first_name[0]}</h1></div>}
                </div>
            </div>
        </div>
    )
}

export default React.memo(Header);
