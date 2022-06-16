import React, {useEffect, useMemo, useState} from 'react';

import {useSelector} from "react-redux";
import {getSubjectProgress, getTopicProgress} from '../../store/selectors/progress';
import Chart from "../../components/Chart";
import {collectionGroup, doc, getDoc, getDocs, query} from "firebase/firestore";
import { getUser } from '../../store/selectors/auth';
import moment from "moment";

const TopicProgressPage = ({db}) => {
    const user = useSelector(getUser)
    const topic = useSelector(getTopicProgress)
    const [myProgress, setMyProgress] = useState<any>(null);
    const [testOfTopic, setTestOfTopic] = useState<any>(null);
    const grade = 1;
    const headers = ["Тема", "Дата", "Правильних відповідей", "Прогресс"]

    const dataForChart = useMemo(() => {
        return testOfTopic?.map((item: any) => {
            return {
                name: `${moment(item.date).format('DD.MM.YYYY')}`,
                uv: 3490,
                pv: (item.count_right_answers * 100)/item.count_tests,
                amt: 2100,
            }
        })
    }, [testOfTopic])

    async function fetchTests () {
        const testTopic = query(collectionGroup(db, 'CompletedTests'))
        const querySnapshot = await getDocs(testTopic);
        let newData = querySnapshot.docs.map(doc => doc.data())
        let userCompletedTests = newData?.filter((data: any) => {
            if(data?.uid === user?.uid && data?.topic === topic?.topic_link) {
                return data;
            }
        })
        setTestOfTopic(userCompletedTests)
    }

    async function fetchMyProgress() {
        const myProgressRef = doc(db, 'CompletedSubjects', user.uid);
        const myProgressObject = await getDoc(myProgressRef);
        setMyProgress(myProgressObject.data())
        fetchTests()
    }

    useEffect(() => {
        fetchMyProgress()
    }, [])

    console.log(topic, 'topic')
    return (
        <div className='subject-progress-page'>
            <div className='subject-progress-wrapper'>
                <div className='subject-progress-wrapper--upper-side'>
                    <div className='subject-progress-information-wrapper'>
                        <h1>{topic.title}</h1>
                        <div><img src={process.env.PUBLIC_URL+'/images/lessonsIcon.svg'}/><p>{`${topic?.progress?.video?.isVideo ? 'Відео переглянуто' : 'Відео не переглянуто'}`}</p></div>
                        <div><img src={process.env.PUBLIC_URL+'/images/hoursIcon.svg'}/><p>{`${topic?.progress?.text?.isText ? 'Матеріали переглянуто' : 'Матеріали не переглянуто'}`}</p></div>
                        <div><img src={process.env.PUBLIC_URL+'/images/homeworksIcon.svg'}/><p>{`${topic?.progress?.test?.isTest ? 'Тест успішно здано' : 'Тест не пройдено'}`}</p></div>
                    </div>
                    <div className='subject-progress-chart-wrapper'><Chart data={dataForChart}/></div>
                </div>
                <div className='subject-progress-wrapper--down-side'>
                    <h1>Тести по темі</h1>
                    <div className='subject-progress-list'>
                        <div className='subject-progress-list--header'>
                            {headers.map((header) => <div>{header}</div>)}
                        </div>
                        <div className='subject-progress-list--body'>
                            {testOfTopic?.map((topicItem: any) => <div className='subject-progress-list--body--row'>
                                <div className='subject-progress-list--body--row--item'>{topic.title}</div>
                                <div className='subject-progress-list--body--row--item'>{moment(topicItem.date).format("DD.MM.YYYY")}</div>
                                <div className='subject-progress-list--body--row--item'>{`${topicItem.count_right_answers} з ${topicItem.count_tests}`}</div>
                                <div className='subject-progress-list--body--row--item'>
                                    <div className='progress'>
                                        <div className='progress--indicate' style={{width: `${ topicItem.count_right_answers ? (topicItem.count_right_answers * 100/topicItem.count_tests) : 100}%`, color: topicItem.count_right_answers ? 'white' : 'black', backgroundColor: topicItem.count_right_answers && '#8D5CF6'}}>
                                            {`${((topicItem.count_right_answers * 100)/topicItem.count_tests).toFixed(2)}%`}
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopicProgressPage;
