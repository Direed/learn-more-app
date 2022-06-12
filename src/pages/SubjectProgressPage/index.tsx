import React, {useEffect, useMemo, useState} from 'react';

import './style.scss';

import {useDispatch, useSelector} from "react-redux";
import { getSubjectProgress } from '../../store/selectors/progress';
import Chart from "../../components/Chart";
import {collectionGroup, doc, getDoc, getDocs, query} from "firebase/firestore";
import { getUser } from '../../store/selectors/auth';
import {setTopicProgress} from "../../store/actions/progress";
import {useNavigate} from "react-router-dom";
import pathes from "../../routes/pathes";

const SubjectProgressPage = ({db}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(getUser)
    const subject = useSelector(getSubjectProgress)
    const [topics, setTopics] = useState<any>(null)
    const [myProgress, setMyProgress] = useState<any>(null);
    const grade = 1;
    const headers = ["Предмет", "Тема", "Прогресс"]

    async function fetchData() {
        const subjectTopicsWithGradesRef = query(collectionGroup(db, subject.topics_link))
        const subjectTopicsWithGradesSnapshots = await getDocs(subjectTopicsWithGradesRef);
        let subjectTopicsWithGrades = subjectTopicsWithGradesSnapshots.docs.map(doc => doc.data())
        // let SubjectTopics = subjectTopicsWithGrades?.topics.map((topicWithGrade: any, index: number) => {
        //     return {
        //         grade: topicWithGrade.grade,
        //         grade_link: topicWithGrade.title,
        //         topic: topicWithGrade.topics[index],
        //     }
        // })
        console.log(subjectTopicsWithGrades, 'subjectTopicsWithGrades')
        setTopics([...subjectTopicsWithGrades])
    }

    async function fetchMyProgress() {
        const myProgressRef = doc(db, 'CompletedSubjects', user.uid);
        const myProgressObject = await getDoc(myProgressRef);
        setMyProgress(myProgressObject.data())
    }

    const topicsWithGrade = useMemo(() => {
        let data = topics?.find((topic: any) => topic.grade === grade)
        let dataWithMyProgress = data?.topics?.map((dataItem: any) => {
            if(myProgress && myProgress[subject.topics_link][`${subject.topics_link}_grade${grade}`][dataItem.topic_link]) {
                let progress = myProgress[subject.topics_link][`${subject.topics_link}_grade${grade}`][dataItem.topic_link];
                if(progress.video?.isVideo && progress.text?.isText && progress.test?.isTest) return { ...dataItem, percent: '100,00%', completed_works: 3, works: 3, progress}
                if((progress.video?.isVideo && progress.text?.isText) || (progress.video?.isVideo && progress.test?.isTest) || (progress.text?.isText && progress.test?.isTest)) return { ...dataItem, percent: '66,66%', completed_works: 2, works: 3, progress}
                if(progress.video?.isVideo || progress.text?.isText || progress.test?.isTest) return { ...dataItem, percent: '33,33%', completed_works: 1, works: 3, progress}
                return { ...dataItem, percent: '0%', completed_works: 0, works: 3, progress}
            }
            return { ...dataItem, percent: '0%', completed_works: 0, works: 3 };
        })
        return {...data, topics: dataWithMyProgress};
    }, [topics, myProgress, subject])

    console.log(topicsWithGrade, 'topicsWithGrade')

    useEffect(() => {
        fetchData()
        fetchMyProgress()
    }, [])

    return (
        <div className='subject-progress-page'>
            <div className='subject-progress-wrapper'>
                <div className='subject-progress-wrapper--upper-side'>
                    <div className='subject-progress-information-wrapper'>
                        <h1>{subject.title}</h1>
                        <div><img src={process.env.PUBLIC_URL+'/images/lessonsIcon.svg'}/><p>{`${subject.lessons} lessons`}</p></div>
                        <div><img src={process.env.PUBLIC_URL+'/images/hoursIcon.svg'}/><p>{`${subject.hours} hours`}</p></div>
                        <div><img src={process.env.PUBLIC_URL+'/images/homeworksIcon.svg'}/><p>{`${subject.homeworks} homeworks`}</p></div>
                    </div>
                    <div className='subject-progress-chart-wrapper'><Chart/></div>
                </div>
                <div className='subject-progress-wrapper--down-side'>
                    <h1>Теми</h1>
                    <div className='subject-progress-list'>
                        <div className='subject-progress-list--header'>
                            {headers.map((header) => <div>{header}</div>)}
                        </div>
                        <div className='subject-progress-list--body'>
                            {topicsWithGrade?.topics?.map((topicItem: any) => <div className='subject-progress-list--body--row' onClick={() => {
                                dispatch(setTopicProgress(topicItem))
                                navigate(pathes.topicProgress)
                            }}>
                                <div className='subject-progress-list--body--row--item'>{subject.title}</div>
                                <div className='subject-progress-list--body--row--item'>{topicItem.title}</div>
                                <div className='subject-progress-list--body--row--item'>
                                    <div className='progress'><div className='progress--indicate' style={{width: `${ topicItem.completed_works ? (topicItem.completed_works * 100/topicItem.works) : 100}%`, color: topicItem.completed_works ? 'white' : 'black', backgroundColor: topicItem.completed_works && '#8D5CF6'}}>{topicItem.percent}</div></div>
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubjectProgressPage;
