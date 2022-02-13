import React, {FunctionComponent, useMemo} from 'react'
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from 'yup'

import './RegisterPage.scss'

import Input, {IColor} from "../../components/Input";
import Button from "../../components/StyledButton";

import pageNames from '../../routes/pathes'
import {IRole} from "../LoginPage";

interface IRegisterInitialValue {
    userName: string,
    password: string,
}


export interface IRegister {
    initialValues: IRegisterInitialValue,
    validationSchema: IRegisterInitialValue,
}

type IProps = {
    role: IRole
}

const RegisterPage: FunctionComponent<IProps> = ({role}:IProps) => {
    console.log(role)
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

    const formik = useFormik<IRegister>({
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
        <div className={activeClass.className}>
            <h1 className={`${activeClass.className}__title`}>Create Account</h1>
            <form className={`${activeClass.className}__form`}>
                <Input color={activeClass.inputColor} label={'First name'} value={'sdfsdf'} handleChange={() => {}} />
                <Input color={activeClass.inputColor} label={'Email'} value={'erwr3r@gmail.com'} handleChange={() => {}} />
                <Input color={activeClass.inputColor} label={'Password'} value={'32423'} handleChange={() => {}} />
                <Input color={activeClass.inputColor} label={'Confirm password'} value={'32423'} handleChange={() => {}} />
                <Button className={`${activeClass.className}__form--button`} text={'Create'} color={activeClass.buttonColor} handleClick={() => {}} />
            </form>
            <img className={`${activeClass.className}__svg`} src={process.env.PUBLIC_URL+'/images/yellow_cat.svg'}/>
            <div className={`${activeClass.className}__footerTitle`}>
                <p>Already have an account? </p>
                <p className={`${activeClass.className}__footerTitle--route`} onClick={() => navigate(pageNames.login)}>Login</p>
            </div>
        </div>
    )
}

export default React.memo(RegisterPage)
