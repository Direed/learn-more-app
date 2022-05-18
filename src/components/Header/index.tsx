import React from 'react'
import './Header.scss'

export interface UserInterface {
    firstName: string,
    lastName: string,
    img: string,
}

type IProps = {
    title: string,
    user: UserInterface,
    countAlerts: number,
    isOpenMenu: boolean,
    setIsOpenMenu: (value: boolean) => void
}


const Header: React.FC<IProps> = ({title, user, countAlerts = 0, isOpenMenu, setIsOpenMenu}: IProps) => {
    console.log(process)
    return (
        <div className='Header'>
            <div className='Header__menu' onClick={() => {
                setIsOpenMenu(!isOpenMenu)
            }}>
                <img src={process.env.PUBLIC_URL+'images/menu.svg'}/>
            </div>
            <div className='Header__title'>{title}</div>
            <div className='Header__userWrapper'>
                <div className='Header__userWrapper--alerts'>
                    <img src={process.env.PUBLIC_URL + 'images/bell.svg'}/>
                    <div className={'Header__userWrapper--alerts--counter'}>{countAlerts}</div>
                </div>
                <div className='Header__userWrapper__user'>
                    <div className='Header__userWrapper__user--userName'>{`${user.firstName} ${user.lastName}`}</div>
                    <img className='Header__userWrapper__user--userIcon' src={user.img}></img>
                </div>
            </div>
        </div>
    )
}

export default Header;
