import React, {FunctionComponent, useMemo} from 'react'
import {useFormik} from "formik";
import * as Yup from 'yup'
import {useNavigate} from "react-router-dom";

import './LoginPage.scss'

import Button from "../../components/StyledButton";
import Input, {IColor} from "../../components/Input";

import pageNames from "../../routes/pathes";


type IProps = {
    role: IRole,
}

export enum IRole {
    student = "student",
    teacher = "teacher"
}

export interface ILogin {
    initialValues: ILoginIV,
    validationSchema: ILoginIV,
}

interface ILoginIV {
    userName: string,
    password: string,
}

const LoginPage: FunctionComponent<IProps> = ({role}:IProps) => {
    const navigate = useNavigate()
    const activeClass = useMemo(() => {
        return role === IRole.student ? {
            className: 'RegisterPageStudent',
            inputColor: IColor.yellow,
            buttonColor: IColor.purple,
        } : {
            className: 'RegisterPageTeacher',
            inputColor: IColor.purple,
            buttonColor: IColor.yellow,
        };
    }, [role])

    const formik = useFormik<ILogin>({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema: Yup.object({
            userName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
            password: Yup.string().uuid()
        }),
    });

    console.log(formik)
    return (
        <div className={`${activeClass.className}`}>
            <h1 className={`${activeClass.className}__title`}>Welcome</h1>
            <form className={`${activeClass.className}__form`}>
                <Input color={activeClass.inputColor} label={'Username'} value={'sdfsdf'} handleChange={() => {}} />
                <Input color={activeClass.inputColor} label={'Password'} value={'32423'} handleChange={() => {}} helperText={'Forget password ?'} helperAction={() => {}}/>
                <Button className={`${activeClass.className}__form--button`} text={'Login'} color={activeClass.buttonColor} handleClick={() => {}} />
            </form>
            <img className={`${activeClass.className}__svg`} src={process.env.PUBLIC_URL+'/images/yellow_cat.svg'}/>
            <div className={`${activeClass.className}__footerTitle`}>
                <p>Don’t have an account? </p>
                <p className={`${activeClass.className}__footerTitle--route`} onClick={() => navigate(pageNames.register)}>Create</p>
            </div>
        </div>
    )
}

export default LoginPage
