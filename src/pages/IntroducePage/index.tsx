import React, {FunctionComponent} from 'react'
import {useNavigate} from "react-router-dom";

import './IntroducePage.scss'

import pageNames from '../../routes/pathes'

import Button, {IColor} from "../../components/StyledButton";

const IntroducePage:FunctionComponent = () => {
    const navigate = useNavigate()
    return (
        <div className='IntroducePage'>
            <div className='IntroducePage__teacherSide'>
                <h1 className='IntroducePage__teacherSide--title'>I AM A TEACHER</h1>
                <div className='IntroducePage__teacherSide--description'><p>Continue to be with us, we will help you explore the world</p></div>
                <Button
                    text='Continue'
                    color={IColor.yellow}
                    handleClick={() => {navigate(pageNames.login)}}
                />
                <img className='IntroducePage__teacherSide--svg' src={process.env.PUBLIC_URL+'/images/yellow_cat.svg'}/>
            </div>
            <div className='IntroducePage__studentSide'>
                <h1 className='IntroducePage__studentSide--title'>I AM A STUDENT</h1>
                <div className='IntroducePage__studentSide--description'><p>Take this unforgettable trip with us and you will learn a lot</p></div>
                <Button
                    text='Continue'
                    color={IColor.purple}
                    handleClick={() => {navigate(pageNames.register)}}
                />
                <img className='IntroducePage__studentSide--svg' src={process.env.PUBLIC_URL+'/images/gray_cat.svg'} />
            </div>
        </div>
    )
}

export default IntroducePage;
