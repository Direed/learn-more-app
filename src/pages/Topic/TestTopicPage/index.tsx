import React, {useCallback, useEffect, useState} from 'react';

import './style.scss'
import {collectionGroup, getDocs, query, collection, addDoc} from "firebase/firestore";
import {useDispatch, useSelector} from "react-redux";
import {getTopic} from "../../../store/selectors/topic";
import {closeTest, setAnswers, setCurrentTest, startTest} from "../../../store/actions/test";
import {getAnswers, getCurrentTest, getIsStartTest, getTests} from "../../../store/selectors/test";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {getSubject} from "../../../store/selectors/subject";
import moment from "moment";
import {getUser} from "../../../store/selectors/auth";

const TestTopicPage = ({db}) => {
    const dispatch = useDispatch();
    const user = useSelector(getUser)
    const subject = useSelector(getSubject)
    const topic = useSelector(getTopic);
    const tests = useSelector(getTests)
    const answers = useSelector(getAnswers)
    const currentTest = useSelector(getCurrentTest)
    const isStartTest = useSelector(getIsStartTest);
    const [testsFromDB, setTestsFromDB] = useState<any>(null);
    const [answer, setAnswer] = useState<any>(null);

    console.log(tests, tests)
    console.log(testsFromDB, 'testsFromDB')

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

    const matchAnswers = (tests: any, nextIndex: number): any => {
        for (let i=0; i < answers.length; i++) {
            if (answers[i]?.id === tests[nextIndex]?.id && (answers[i]?.question === tests[nextIndex]?.question)) {
                console.log(answers[i], tests[nextIndex])
                return matchAnswers(tests, nextIndex + 1)
            };
            continue;
        }
    }

    const onGiveAnswer = useCallback(() => {
        onNextStep()
        const userAnswers = answers.map((answer: any) => {
            const testRealAnswer = tests.find((test: any) => test.id === answer.id);
            return {
                ...answer,
                isCorrectAnswer: answer?.answer === testRealAnswer?.right_answer
            }
        });
        let countRightAnswers = 0;
        userAnswers.forEach((answer: any) => {
            if(answer?.isCorrectAnswer) {
                countRightAnswers++;
            }
        })
        addCompletedTests(userAnswers, countRightAnswers)
    }, [answer])


    const addCompletedTests = async (answers: any, countRightAnswers: any) => {
        await addDoc(collection(db, "CompletedTests"), {
            uid: user?.uid,
            subject: subject?.topics_link,
            subject_route: subject?.route,
            topic: topic?.topic_link,
            topic_route: topic?.route,
            answers: answers,
            count_right_answers: countRightAnswers,
            count_tests: answers?.length,
            date: moment(new Date()).toString(),
        });
    }

    const onNextStep = useCallback(() => {
      if(answer) {
          if (answers?.length && (answers?.find((item: any) => item?.id === answer?.id && (item?.question === answer?.question || item?.answers[0] === answer?.answers[0])))) {
              let newAnswers = answers?.map((item: any) => {
                  if (item?.id === answer?.id && (item?.question === answer?.question || item?.answers[0] === answer?.answers[0])) {
                      return answer;
                  } else {
                      return item;
                  }
              })
              dispatch(setAnswers([...newAnswers]))
          } else {
              let newAnswers = answers?.length ? [...answers, answer] : [answer];
              dispatch(setAnswers([...newAnswers]))
          }
          setAnswer(() => null)
          currentTest < tests?.length-1 && dispatch(setCurrentTest(currentTest + 1))
        }
    }, [currentTest, answer, answers, tests])

    const onPreviousStep = useCallback(() => {
        setAnswer(null)
        dispatch(setCurrentTest(currentTest-1))
    }, [currentTest])

    const onCloseTest = useCallback(() => {
        setAnswer(null)
        dispatch(closeTest())
    }, [])

    console.log('ANSWER!!!!!!!!!!!', answer)

    return (
        <div className='TestTopicPage'>
            {isStartTest ? (
                <div className='TestCard'>
                    <div className='TestCard--cancelButtonWrapper'><img src={process.env.PUBLIC_URL + '/images/CloseIcon.svg'} onClick={onCloseTest}/></div>
                    <p className='TestCard--title'>{`${currentTest+1}. ${tests[currentTest]?.question}`}</p>
                    <div className='TestCard--answersWrapper'>
                        <RadioGroup
                            key={`radio-group-${currentTest+1}`}
                            aria-labelledby={`demo-radio-buttons-group-label-${currentTest+1}`}
                            name={`radio-buttons-group-${currentTest+1}`}
                            onChange={(e: any) => {
                                setAnswer({
                                    question: tests[currentTest]?.question,
                                    answers: tests[currentTest]?.answers,
                                    answer: e.target.value,
                                    id: tests[currentTest]?.id,
                                })
                            }}
                        >
                            {tests[currentTest]?.answers?.map((item: any) => {
                                return <FormControlLabel key={`test_${currentTest+1}-${item}`} className={'TestCard--answersWrapper--answer'} value={item} control={<Radio key={`test_${currentTest+1}-${item}`} color={'secondary'} />} label={item} />
                            })}
                        </RadioGroup>
                    </div>
                    <div className='TestCard--buttonWrapper'>
                        {currentTest === tests.length-1 ? <button onClick={onGiveAnswer}>Answer</button> : null}
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
