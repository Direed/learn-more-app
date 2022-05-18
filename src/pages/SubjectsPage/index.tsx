import React, {useEffect, useMemo, useState} from 'react'

import './SubjectsPage.scss'

import Carousel from "../../components/Carousel";
import {collection, getDocs, query} from "firebase/firestore";
import SubjectComponent from "./SubjectComponent";
import {useNavigate} from "react-router-dom";
import pathes from "../../routes/pathes";
import {useDispatch} from "react-redux";
import {setSubject} from "../../store/actions/subject";

const SubjectsPage = ({db}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [subjects, setSubjects] = useState<any>(null)

    async function fetchData () {
        const querySnapshot = await getDocs(collection(db, 'Subjects'));
        console.log(' querySnapshot after request', querySnapshot)
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            console.log('doc', doc)
            console.log('doc.data()', doc.data())
        });
        let newData = querySnapshot.docs.map(doc => doc.data())
        setSubjects([...newData])
    }

    useEffect(() => {
        fetchData()
    }, [])

    console.log(subjects, 'subjects')


    const subjectsObject = useMemo(() => {
        return subjects?.map((subject) => <SubjectComponent
            title={subject.title}
            description={subject.description}
            phrase={subject.phrase}
            handleClick={() => {
                dispatch(setSubject(subject))
                navigate(pathes.topics)
            }}
        />)
    }, [subjects])


    return (
        <div className='subjectsPage'>
            <Carousel>
                {subjectsObject}
            </Carousel>
        </div>
    )
}

export default SubjectsPage
