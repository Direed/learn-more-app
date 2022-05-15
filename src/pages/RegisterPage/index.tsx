import React, {FunctionComponent, useMemo, useState} from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
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
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    initialValues: IRegisterInitialValue,
    validationSchema: IRegisterInitialValue,
}

type IProps = {
    role: IRole,
    auth: any,
}


const RegisterPage: FunctionComponent<IProps> = ({role, auth}:IProps) => {
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
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            userName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
            // password: Yup.string().uuid()
        }),
        onSubmit: (values) => {
            console.log('register')
            debugger
            if(values.confirmPassword === values.password) {
                createUserWithEmailAndPassword(auth, values.email, values.password)
                    .then((userCredential) => {
                        console.log('SIGNED IN SUCCESS')
                        const user = userCredential.user;
                        console.log(user, 'user')
                    })
                    .catch((error) => {
                        console.log('SIGN IN ERROR')
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode, 'errorCode')
                        console.log(errorMessage, 'errorMessage')
                    });
            }
        }
    });
    return (
        <div className={activeClass.className}>
            <h1 className={`${activeClass.className}__title`}>Create Account</h1>
            <form className={`${activeClass.className}__form`}>
                <Input
                    id='userName'
                    name='userName'
                    placeholder={'First name'}
                    color={activeClass.inputColor}
                    label={'First name'}
                    value={formik.values.userName}
                    handleChange={formik.handleChange}
                />
                <Input
                    id='email'
                    name='email'
                    placeholder={'Email'}
                    color={activeClass.inputColor}
                    label={'Email'} value={formik.values.email}
                    handleChange={formik?.handleChange}
                />
                <Input
                    id='password'
                    name='password'
                    placeholder={'Password'}
                    color={activeClass.inputColor}
                    label={'Password'}
                    value={formik.values.password}
                    handleChange={formik.handleChange}
                />
                <Input
                    id='confirmPassword'
                    name='confirmPassword'
                    placeholder={"Confirm password"}
                    color={activeClass.inputColor}
                    label={'Confirm password'}
                    value={formik.values.confirmPassword}
                    handleChange={formik.handleChange}
                />
                <Button className={`${activeClass.className}__form--button`} text={'Create'} color={activeClass.buttonColor} handleClick={formik.handleSubmit} />
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
