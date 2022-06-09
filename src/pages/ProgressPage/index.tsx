import React, {useEffect, useState} from 'react';
import ProgressesComponent from "./ProgressesComponent";
import {collection, collectionGroup, doc, getDoc, getDocs, query} from "firebase/firestore";

import './style.scss'
import set = Reflect.set;
import {useSelector} from "react-redux";
import {getUser} from "../../store/selectors/auth";

const ProgressPage = ({db}: any) => {
    const user = useSelector(getUser)
    const [subjects, setSubjects] = useState<any>(null)
    const [subjectsFullObjects, setSubjectsFullObjects] = useState<any>(null)
    console.log(subjects)

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

    async function fetchProgress () {
        const myProgressRef = doc(db, 'CompletedSubjects', user.uid);
        const myProgressObject = await getDoc(myProgressRef);
        console.log(myProgressObject.data())
    }

    async function fetchLessons (subjectLink: any) {
        const users = query(collectionGroup(db, subjectLink))
        const querySnapshot = await getDocs(users);
        let newData = querySnapshot.docs.map(doc => doc.data())
        console.log(newData, 'newData')
        let subjectsClone = subjects.map((subject) => {
            if(subject?.topics_link === subjectLink) {
                let lessons = newData?.reduce((topicsGradePrev, topicGradeCurrent) => {
                    if(topicsGradePrev?.topics?.length) {
                        return topicsGradePrev?.topics?.length + topicGradeCurrent?.topics?.length
                    }
                    return 0 + topicGradeCurrent?.topics?.length
                }, 0)
                return {
                    ...subject,
                    lessons: lessons || 0,
                    hours: lessons * 8 || 0,
                    homeworks: lessons || 0,
                }
            }
            return {...subject,
                lessons: 0,
                hours: 0,
                homeworks: 0,
            };
        })
        setSubjectsFullObjects([...subjectsClone])
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

    console.log(subjects)
    console.log(subjectsFullObjects, 'subjectsFullObjects')

    return (
        <div className='progress-page'>
            <ProgressesComponent subjects={subjectsFullObjects} />
        </div>
    )
}

export default ProgressPage;
