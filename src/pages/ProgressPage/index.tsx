import React, {useCallback, useEffect, useMemo, useState} from 'react';
import ProgressesComponent from "./ProgressesComponent";
import {collection, collectionGroup, doc, getDoc, getDocs, query} from "firebase/firestore";

import './style.scss'
import {useSelector} from "react-redux";
import {getUser} from "../../store/selectors/auth";

const ProgressPage = ({db}: any) => {
    const user = useSelector(getUser)
    const [subjects, setSubjects] = useState<any>(null)
    const [subjectsFullObjects, setSubjectsFullObjects] = useState<any>([])
    const [progressObject, setProgressObject] = useState<any>(null)

    async function fetchData () {
        const querySnapshot = await getDocs(collection(db, 'Subjects'));
        let newData = querySnapshot.docs.map(doc => doc.data())
        setSubjects([...newData])
    }

    async function fetchProgress () {
        const myProgressRef = doc(db, 'CompletedSubjects', user.uid);
        const myProgressObject = await getDoc(myProgressRef);
        setProgressObject(myProgressObject.data())
    }

    async function fetchLessons (subjectLink: string){
        const topics = query(collectionGroup(db, subjectLink))
        const topicsSnapshot = await getDocs(topics);
        let newData = topicsSnapshot.docs.map(doc => doc.data())
        let subjectsClone = null;
        subjects?.find((subject) => {
            if(subject?.topics_link === subjectLink) {
                let lessons = newData?.reduce((topicsGradePrev, topicGradeCurrent) => {
                    if(topicsGradePrev?.topics?.length) {
                        return topicsGradePrev?.topics?.length + topicGradeCurrent?.topics?.length
                    }
                    return 0 + topicGradeCurrent?.topics?.length
                }, 0)
                subjectsClone = {
                    ...subject,
                    lessons: lessons || 0,
                    hours: lessons * 8 || 0,
                    homeworks: lessons || 0,
                };
            }
        })
        setSubjectsFullObjects((prevState) => [...prevState, subjectsClone])
    }

    useEffect(() => {
        fetchData()
        fetchProgress()
    }, [])

    useEffect(() => {
        if(subjects?.length) {
            subjects.forEach((subject: any) => {
                if(subject?.topics_link) {
                    fetchLessons(subject?.topics_link)
                }
            })
        }
    }, [subjects])

    return (
        <div className='progress-page'>
            <ProgressesComponent subjects={subjectsFullObjects} />
        </div>
    )
}

export default ProgressPage;
