import React, {FunctionComponent, useCallback, useMemo, useState} from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from 'yup'

import './RegisterPage.scss'

import Input, {IColor} from "../../components/Input";
import Button from "../../components/StyledButton";

import pageNames from '../../routes/pathes'
import {IRole} from "../LoginPage";
import {collection, doc, getDocs, setDoc} from 'firebase/firestore';
import {useDispatch} from "react-redux";
import {setUser} from "../../store/actions/auth";

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
    db: any,
}


const RegisterPage: FunctionComponent<IProps> = ({role, auth, db}:IProps) => {
    const dispatch = useDispatch()
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

    const SetUserDataInDB = useCallback( async (user) => {
        const userData = {
            uid: user.uid,
            first_name: user.first_name,
            email: user.email,
        };
        await setDoc(doc(db, "Users", user.uid), userData);
        await setDoc(doc(db, 'CompletedSubjects', user.uid), {uid: user.uid})
        dispatch(setUser(userData))
    }, [])

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
            if(values.confirmPassword === values.password) {
                createUserWithEmailAndPassword(auth, values.email, values.password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        SetUserDataInDB({uid: user.uid ,first_name: values.userName, email: values.email})
                        navigate(pageNames.home)
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
            <h1 className={`${activeClass.className}__title`}>СТВОРИТИ ЗАПИС</h1>
            <form className={`${activeClass.className}__form`}>
                <Input
                    id='userName'
                    name='userName'
                    placeholder={'Ім\'я'}
                    color={activeClass.inputColor}
                    label={'Ім\'я'}
                    value={formik.values.userName}
                    handleChange={formik.handleChange}
                />
                <Input
                    id='email'
                    name='email'
                    type={'email'}
                    placeholder={'Електрона пошта'}
                    color={activeClass.inputColor}
                    label={'Електрона пошта'}
                    value={formik.values.email}
                    handleChange={formik?.handleChange}
                />
                <Input
                    id='password'
                    name='password'
                    type={'password'}
                    placeholder={'Пароль'}
                    color={activeClass.inputColor}
                    label={'Пароль'}
                    value={formik.values.password}
                    handleChange={formik.handleChange}
                />
                <Input
                    id='confirmPassword'
                    name='confirmPassword'
                    type={'password'}
                    placeholder={"Підтвердьте пароль"}
                    color={activeClass.inputColor}
                    label={'Підтвердьте пароль'}
                    value={formik.values.confirmPassword}
                    handleChange={formik.handleChange}
                />
                <Button className={`${activeClass.className}__form--button`} text={'Створити'} color={activeClass.buttonColor} handleClick={formik.handleSubmit} />
            </form>
            <img className={`${activeClass.className}__svg`} src={process.env.PUBLIC_URL+'/images/yellow_cat.svg'}/>
            <div className={`${activeClass.className}__footerTitle`}>
                <p>Вже є аккаунт? </p>
                <p className={`${activeClass.className}__footerTitle--route`} onClick={() => navigate(pageNames.login)}>Увійти</p>
            </div>
        </div>
    )
}

export default React.memo(RegisterPage)
