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
    const subject = useSelector(getSubjectProgress)
    const [topics, setTopics] = useState<any>(null)
    const [myProgress, setMyProgress] = useState<any>(null);
    const [testOfTopic, setTestOfTopic] = useState<any>(null);
    const grade = 1;
    const headers = ["Тема", "Дата", "Правильних відповідей", "Прогресс"]

    async function fetchData() {
        const subjectTopicsWithGradesRef = query(collectionGroup(db, topic.topics_link))
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

    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    const dataForChart = useMemo(() => {
        return testOfTopic?.map((item: any) => {
            return {
                name: `${moment(item.date).format('DD.MM.YYYY')}`,
                uv: 3490,
                pv: (item.count_right_answers * 100)/item.count_tests,
                amt: 2100,
            }
        }).reverse()
    }, [testOfTopic])

    console.log(dataForChart, 'dataForChart')

    async function fetchTests () {
        const testTopic = query(collectionGroup(db, 'CompletedTests'))
        const querySnapshot = await getDocs(testTopic);
        let newData = querySnapshot.docs.map(doc => doc.data())
        let userCompletedTests = newData?.filter((data: any) => {
            if(data?.uid === user?.uid && data?.topic === topic?.topic_link) {
                return data;
            }
        })
        console.log(newData, 'completed tests')
        console.log(userCompletedTests, 'completed tests with filter')
        setTestOfTopic(userCompletedTests)
    }


    async function fetchMyProgress() {
        const myProgressRef = doc(db, 'CompletedSubjects', user.uid);
        const myProgressObject = await getDoc(myProgressRef);
        setMyProgress(myProgressObject.data())
        fetchTests()
    }

    const topicsWithGrade = useMemo(() => {
        let data = topics?.find((topic: any) => topic.grade === grade)
        let dataWithMyProgress = data?.topics?.map((dataItem: any) => {
            if(myProgress && myProgress[subject.topics_link][`${subject.topics_link}_grade${grade}`][dataItem.topic_link]) {
                let progress = myProgress[subject.topics_link][`${subject.topics_link}_grade${grade}`][dataItem.topic_link];
                if(progress.video?.isVideo && progress.text?.isText && progress.test?.isTest) return { ...dataItem, percent: '100,00%', completed_works: 3, works: 3}
                if((progress.video?.isVideo && progress.text?.isText) || (progress.video?.isVideo && progress.test?.isTest) || (progress.text?.isText && progress.test?.isTest)) return { ...dataItem, percent: '66,66%', completed_works: 2, works: 3}
                if(progress.video?.isVideo || progress.text?.isText || progress.test?.isTest) return { ...dataItem, percent: '33,33%', completed_works: 1, works: 3}
                return { ...dataItem, percent: '0%', completed_works: 0, works: 3 }
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

    console.log(topic, 'topic')
    return (
        <div className='subject-progress-page'>
            <div className='subject-progress-wrapper'>
                <div className='subject-progress-wrapper--upper-side'>
                    <div className='subject-progress-information-wrapper'>
                        <h1>{topic.title}</h1>
                        <div><img src={process.env.PUBLIC_URL+'/images/lessonsIcon.svg'}/><p>{`${topic?.progress?.video?.isVideo} lessons`}</p></div>
                        <div><img src={process.env.PUBLIC_URL+'/images/hoursIcon.svg'}/><p>{`${topic?.progress?.text?.isText} hours`}</p></div>
                        <div><img src={process.env.PUBLIC_URL+'/images/homeworksIcon.svg'}/><p>{`${topic?.progress?.test?.isTest} homeworks`}</p></div>
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
