import React, {FunctionComponent} from 'react'
import {useNavigate} from "react-router-dom";

import './IntroducePage.scss'

import pageNames from '../../routes/pathes'

import Button, {IColor} from "../../components/StyledButton";
import {IRole} from "../LoginPage";

type IProps = {
    setRole: (value: IRole) => void
}

const IntroducePage:FunctionComponent<IProps> = ({setRole}:IProps) => {
    const navigate = useNavigate()
    return (
        <div className='IntroducePage'>
            <div className='IntroducePage__teacherSide'>
                <h1 className='IntroducePage__teacherSide--title'>Я вчитель</h1>
                <div className='IntroducePage__teacherSide--description'><p>Continue to be with us, we will help you explore the world</p></div>
                <Button
                    text='Продовжити'
                    color={IColor.yellow}
                    handleClick={() => {
                        navigate(pageNames.login)
                        setRole(IRole.teacher)
                    }}
                />
                <img className='IntroducePage__teacherSide--svg' src={process.env.PUBLIC_URL+'/images/yellow_cat.svg'}/>
            </div>
            <div className='IntroducePage__studentSide'>
                <h1 className='IntroducePage__studentSide--title'>Я учень</h1>
                <div className='IntroducePage__studentSide--description'><p>Здійсніть цю незабутню подорож з нами, і ви дізнаєтеся багато нового</p></div>
                <Button
                    text='Продовжити'
                    color={IColor.purple}
                    handleClick={() => {
                        navigate(pageNames.login)
                        setRole(IRole.student)
                    }}
                />
                <img className='IntroducePage__studentSide--svg' src={process.env.PUBLIC_URL+'/images/gray_cat.svg'} />
            </div>
        </div>
    )
}

export default IntroducePage;
