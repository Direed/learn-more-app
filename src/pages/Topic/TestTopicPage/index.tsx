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
        let newData = querySnapshot.docs.map(doc => doc.data())
        setTestsFromDB(newData)
    }

    const onStartTest  = useCallback(() => {
        dispatch(startTest(testsFromDB))
    }, [testsFromDB])

    const matchAnswers = (tests: any): any => {
        for (let i=0; i < answers.length; i++) {
            if (answers[i].question === tests[0].question) {
                let newArray = tests.splice(0, 1)
                return matchAnswers(newArray)
            } else {
                continue;
            }
        }
    }

    const onGiveAnswer = useCallback(() => {
        dispatch(setAnswers([...answers, answer]))
        matchAnswers(tests)
    }, [answer])

    const onNextStep = useCallback(() => {
      if(answer) {
            if (answers?.length && (answers?.find((item: any) => item?.question === answer?.question || item?.answers[0] === answer?.answers[0]))) {
                let newAnswers = answers?.map((item: any) => {
                    if (item?.question === answer?.question || item?.answers[0] === answer?.answers[0]) {
                        return answer;
                    } else {
                        return item;
                    }
                })
                dispatch(setAnswers([...newAnswers, answer]))
            } else {
                let newAnswers = answers?.length ? [...answers, answer] : [answer]
                dispatch(setAnswers([...newAnswers]))
            }
            setAnswer(null)
            dispatch(setCurrentTest(currentTest + 1))
        }
    }, [currentTest, answer, answers])

    const onPreviousStep = useCallback(() => {
        setAnswer(null)
        dispatch(setCurrentTest(currentTest-1))
    }, [currentTest])

    const onCloseTest = useCallback(() => {
        setAnswer(null)
        dispatch(closeTest())
    }, [])

    console.log('Answers', answer)

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
                                    answer: e.target.value,
                                })
                            }}
                        >
                            {tests[currentTest]?.answers?.map((answer: any) => {
                                return <FormControlLabel className={'TestCard--answersWrapper--answer'} value={answer} control={<Radio color={'secondary'} />} label={answer} />
                            })}
                        </RadioGroup>
                    </div>
                    <div className='TestCard--buttonWrapper'>
                        {currentTest === tests.length-1 ? <button>Answer</button> : null}
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
