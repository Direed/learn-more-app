import React, {FunctionComponent} from 'react'
import {useFormik} from "formik";
import * as Yup from 'yup'

import './LoginPage.scss'

import Button from "../../components/StyledButton";
import Input, {IColor} from "../../components/Input";

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
        <div className='LoginPage'>
            <h1 className='LoginPage__title'>Welcome</h1>
            <form className='LoginPage__form'>
                <Input color={IColor.purple} label={'Username'} value={'sdfsdf'} handleChange={() => {}} />
                <Input color={IColor.purple} label={'Password'} value={'32423'} handleChange={() => {}} helperText={'Forget password ?'} helperAction={() => {}}/>
                <Button className={'LoginPage__form--button'} text={'Login'} color={IColor.yellow} handleClick={() => {}} />
            </form>
        </div>
    )
}

export default LoginPage
