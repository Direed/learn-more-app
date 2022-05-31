import React, {useEffect, useMemo, useState} from 'react'

import Carousel from "../../components/Carousel";
import {collection, collectionGroup, getDocs, query} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import pathes from "../../routes/pathes";
import SubjectComponent from "../SubjectsPage/SubjectComponent";
import {useDispatch, useSelector} from "react-redux";
import {getSubject} from "../../store/selectors/subject";
import {setTopic} from "../../store/actions/topic";

const SubjectPage = ({db}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const subject = useSelector(getSubject)
    const [gradeTopics, setGradeTopics] = useState<any>(null)

    async function fetchData () {
        const SubjectTopics = query(collectionGroup(db, subject.topics_link))
        const querySnapshot = await getDocs(SubjectTopics);
        console.log(' querySnapshot after request', querySnapshot)
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            console.log('doc', doc)
            console.log('doc.data()', doc.data())
        });
        console.log(querySnapshot, 'querySnapshot')
        let newData = querySnapshot.docs.map(doc => doc.data())
        console.log(newData, 'newData')
        setGradeTopics(...newData)
    }

    useEffect(() => {
        fetchData()
    }, [])

    console.log(subject, 'subject')


    const topicsObject = useMemo(() => {
        // if (gradeTopics?.topics.length <= 3) {
        //     gradeTopics?.topics.push({isHiden: true})
        // }
        return gradeTopics?.topics?.map((topic) => {
            if(topic.isHiden) {
                return (<SubjectComponent
                    isHiden
                />)
            }
            return (<SubjectComponent
                title={topic.title}
                handleClick={() => {
                    dispatch(setTopic(topic))
                    navigate(pathes.topic.home)
                }}
            />)
        }).reverse()
    }, [gradeTopics])

    console.log(topicsObject)


    return (
        <div className='subjectsPage'>
            <Carousel>
                {topicsObject}
            </Carousel>
        </div>
    )
}

export default SubjectPage
