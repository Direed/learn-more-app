import React, {useEffect, useMemo, useState} from 'react'

import './SubjectsPage.scss'

import Carousel from "../../components/Carousel";
import {collection, getDocs, query} from "firebase/firestore";
import SubjectComponent from "./SubjectComponent";

const SubjectsPage = ({db}) => {
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
        setSubjects([...newData, ...newData])
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
