import React, {useCallback, useEffect, useState} from 'react';

import './style.scss'
import {collectionGroup, getDocs, query} from "firebase/firestore";
import {useDispatch, useSelector} from "react-redux";
import {getTopic} from "../../../store/selectors/topic";
import {closeTest, setAnswers, setCurrentTest, startTest} from "../../../store/actions/test";
import {getAnswers, getCurrentTest, getIsStartTest, getTests} from "../../../store/selectors/test";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";

const TestTopicPage = ({db}) => {
    const dispatch = useDispatch();
    const topic = useSelector(getTopic);
    const tests = useSelector(getTests)
    const answers = useSelector(getAnswers)
    const currentTest = useSelector(getCurrentTest)
    const isStartTest = useSelector(getIsStartTest);
    const [testsFromDB, setTestsFromDB] = useState<any>(null);
    const [answer, setAnswer] = useState<any>(null);

    useEffect(() => {
        fetchData()
    }, [])
    async function fetchData () {
        const testTopic = query(collectionGroup(db, topic.topic_link))
        const querySnapshot = await getDocs(testTopic);
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            console.log('doc', doc)
            console.log('doc.data()', doc.data())
        });
        console.log(querySnapshot, 'querySnapshot')
        let newData = querySnapshot.docs.map(doc => doc.data())
        setTestsFromDB(newData)
        console.log(newData, 'newData')
    }

    const onStartTest  = useCallback(() => {
        dispatch(startTest(testsFromDB))
    }, [testsFromDB])

    const onGiveAnswer = useCallback(() => {
        dispatch(setAnswers(answer))
    }, [answer])

    const onNextStep = useCallback(() => {
        dispatch(setCurrentTest(currentTest+1))
    }, [currentTest])

    const onPreviousStep = useCallback(() => {
        dispatch(setCurrentTest(currentTest-1))
    }, [currentTest])

    const onCloseTest = useCallback(() => {
        dispatch(closeTest())
    }, [])

    console.log('tests', tests)

    return (
        <div className='TestTopicPage'>
            {isStartTest ? (
                <div className='TestCard'>
                    <div className='TestCard--cancelButtonWrapper'><img src={process.env.PUBLIC_URL + '/images/CloseIcon.svg'} onClick={onCloseTest}/></div>
                    <p className='TestCard--title'>{`${currentTest+1}. ${tests[currentTest]?.question}`}</p>
                    <div className='TestCard--answersWrapper'>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            onChange={(e: any) => {
                                setAnswer({
                                    question: tests[currentTest]?.question,
                                    answers: tests[currentTest]?.answers,
                                    answer: e.value,
                                })
                            }}
                        >
                            {tests[currentTest]?.answers?.map((answer: any) => {
                                return <FormControlLabel className={'TestCard--answersWrapper--answer'} value={answer} control={<Radio />} label={answer} />
                            })}
                        </RadioGroup>
                    </div>
                    <div className='TestCard--buttonWrapper'>
                        <button>Answer</button>
                        {currentTest > 0 ? <div className='TestCard--buttonWrapper--backArrow' onClick={onPreviousStep}><img src={process.env.PUBLIC_URL + '/images/BackArrow.svg'}/></div> : null}
                        {currentTest < tests?.length-1 ? <div className='TestCard--buttonWrapper--nextArrow' onClick={onNextStep}><img src={process.env.PUBLIC_URL + '/images/NextArrow.svg'}/></div> : null}
                    </div>
                </div>
            ) : (
                <>
                    <h1 className='TestTopicPage--title'>Test your knowledge</h1>
                    <p className='TestTopicPage--subtitle'>{`This test will take: ${testsFromDB?.length} tasks`}</p>
                    <button className='TestTopicPage--button' type='button' onClick={onStartTest}>
                    Start test
                    </button>
                </>
                )}
        </div>
    )
}

export default TestTopicPage;
