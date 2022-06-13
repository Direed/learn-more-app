import React, {FunctionComponent, useCallback, useMemo} from 'react'
import {useFormik} from "formik";
import * as Yup from 'yup'
import {useNavigate} from "react-router-dom";

import './LoginPage.scss'

import Button from "../../components/StyledButton";
import Input, {IColor} from "../../components/Input";

import pageNames from "../../routes/pathes";
import pathes from "../../routes/pathes";
import { signInWithEmailAndPassword } from 'firebase/auth';
import {useDispatch} from "react-redux";
import {setUser} from "../../store/actions/auth";
import {query, collectionGroup, getDocs} from "firebase/firestore";
import { getBlob, getDownloadURL, ref} from 'firebase/storage';
import {toast} from "react-toastify";


type IProps = {
    role: IRole,
    auth: any,
    db: any,
    storage: any,
}

export enum IRole {
    student = "student",
    teacher = "teacher"
}

export interface ILogin {
    email: string;
    password: string;
    initialValues: ILoginIV,
    validationSchema: ILoginIV,
}

interface ILoginIV {
    userName: string,
    password: string,
}

const LoginPage: FunctionComponent<IProps> = ({role, auth, db, storage}:IProps) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
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

    const GetUserDataInDB = useCallback( async (userUID: any) => {
        const users = query(collectionGroup(db, 'Users'))
        const querySnapshot = await getDocs(users);
        querySnapshot.docs.forEach((user) => {
            let user_data: any = user.data()
            if(user_data?.uid === userUID) {
                dispatch(setUser({...user_data}))
            }
        })
    }, [])

    // const avatarRef = ref(storage, `User's avatar/${userUID}.jpg`)
    // const avatar = await getDownloadURL(avatarRef)
    // dispatch(setUser({...user_data, photo: avatar}))

    const formik = useFormik<ILogin>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().max(50, 'Must be 20 characters or less').required('Required'),
            // password: Yup.string()
        }),
        onSubmit: (values) => {
            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    toast.success('Вітаю! Ти успішно увійшов в систему')
                    console.log('userCredential', userCredential)
                    GetUserDataInDB(userCredential?.user?.uid)
                    navigate(pathes.home)
                })
                .catch((error) => {
                    toast.error('Введенні дані не вірні')
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }
    });

    console.log(formik)
    return (
        <div className={`${activeClass.className}`}>
            <h1 className={`${activeClass.className}__title`}>Welcome</h1>
            <form className={`${activeClass.className}__form`}>
                <Input
                    name='email'
                    id='email'
                    color={activeClass.inputColor}
                    label={'Email'}
                    value={formik.values.email}
                    handleChange={formik.handleChange}
                />
                <Input
                    name='password'
                    id='password'
                    color={activeClass.inputColor}
                    label={'Password'} value={formik.values.password}
                    handleChange={formik.handleChange}
                    helperText={'Forget password ?'}
                    helperAction={() => {}}/>
                <Button className={`${activeClass.className}__form--button`} text={'Login'} color={activeClass.buttonColor} handleClick={formik.handleSubmit} />
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
