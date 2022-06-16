import React, {useEffect, useMemo, useState} from 'react'
import Calendar from "react-calendar";
import { collection, collectionGroup, getDocs, query } from "firebase/firestore";
import 'react-calendar/dist/Calendar.css';
import './Calendar.scss'
import './Home.scss'
import TasksList from "../../components/TasksList";
import {useSelector} from "react-redux";
import {getUser} from "../../store/selectors/auth";
import RecentlyComponent from "./RecentlyComponent";
import moment from "moment";


const HomePage: React.FC<any> = ({db}) => {
    const user = useSelector(getUser)
    const [filter, setFilter] = useState<string>('All')
    const [completedTests, setCompletedTests] = useState<any>(null)

    async function fetchCompletedWorks () {
        const testTopic = query(collectionGroup(db, 'CompletedTests'))
        const querySnapshot = await getDocs(testTopic);
        let newData = querySnapshot.docs.map(doc => doc.data())
        let userCompletedTests: any = newData?.map((data: any) => {
            if(data?.uid === user?.uid) {
                return data;
            }
        })
        setCompletedTests( Array.isArray(userCompletedTests) ? [...userCompletedTests] : [userCompletedTests])
    }

    useEffect(() => {
        fetchCompletedWorks()
    }, [])

    const recentlyCompletedTests = useMemo(() => {
        if(completedTests?.length > 4) return completedTests.slice(0, 5);
        return completedTests;
    }, [completedTests])

    const headers = ['Предмет', "Тема", "Дата", "Правильних відповідей"]


    return (
        <div className='Home'>
            <div className='LeftHomeWrapper'>
                <div className='TitleWrapper'>
                    <div className='TitleWrapper--firstRow'>
                        <a>{`Привіт ${user?.first_name}`}</a>
                        <div>
                            <a>{'0 points'}</a>
                            <img src={process.env.PUBLIC_URL + '/images/Star.svg'} />
                        </div>
                    </div>
                    <a className='TitleWrapper--secondRow'>Не забудь виконати своє домашнє завдання!</a>
                    <button className='TitleWrapper--thirdRow' type={"button"}>
                        Твоя домашня робота
                    </button>
                    <img className='home-illustration-two' src={process.env.PUBLIC_URL + '/images/homeIllustrationIconTwo.svg'} />
                </div>
                <div className='RecentlyComponent'>
                    <h1 className='table-wrapper--title'>Останні пройдені тести</h1>
                    <div className='filters-wrapper'>
                        <div className={`${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>Всі</div>
                        <div className={`${filter === 'Successful' ? 'active' : ''}`} onClick={() => setFilter('Successful')}>Успішні</div>
                        <div className={`${filter === 'Unsuccessful' ? 'active' : ''}`} onClick={() => setFilter('Unsuccessful')}>Не успішні</div>
                    </div>
                    { recentlyCompletedTests?.length && recentlyCompletedTests[0] ? <div className='subject-progress-list'>
                        <div className='subject-progress-list--header'>
                            {headers.map((header) => <div>{header}</div>)}
                        </div>
                        <div className='subject-progress-list--body'>
                            {recentlyCompletedTests?.map((topicItem: any) => topicItem ? <div className='subject-progress-list--body--row'>
                                <div className='subject-progress-list--body--row--item'>{topicItem?.subject_title}</div>
                                <div className='subject-progress-list--body--row--item'>{topicItem?.topic_title?.length > 21 ? `${topicItem?.topic_title?.slice(0, 20)}...` : topicItem?.topic_title}</div>
                                <div className='subject-progress-list--body--row--item'>{moment(topicItem?.date).format("DD.MM.YYYY")}</div>
                                <div className='subject-progress-list--body--row--item'>{`${topicItem?.count_right_answers} з ${topicItem?.count_tests}`}</div>
                                {/*<div className='subject-progress-list--body--row--item'>*/}
                                {/*    <div className='progress'>*/}
                                {/*        <div className='progress--indicate' style={{width: `${ topicItem?.count_right_answers ? (topicItem?.count_right_answers * 100/topicItem?.count_tests) : 100}%`, color: topicItem?.count_right_answers ? 'white' : 'black', backgroundColor: topicItem.count_right_answers && '#8D5CF6'}}>*/}
                                {/*            {`${((topicItem?.count_right_answers * 100)/topicItem?.count_tests).toFixed(2)}%`}*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div> : null)}
                        </div>
                    </div> : (
                        <div className={'RecentlyComponent--not-result'}><h1>Пройдених тестів поки що немає</h1></div>
                    )}
                </div>
                <div>
                </div>
            </div>
            <div className='RightHomeWrapper'>
                <div className={'account-card'}>
                    <div className={'account-card--user-wrapper'}>
                        <div className={'account-card--user-wrapper--img'}>{user?.photo ? <img src={user.photo}/> : <p>{user?.first_name?.[0]}</p>}</div>
                        <p className={'account-card--user-wrapper--name'}>{`${user?.first_name} ${user?.last_name ? user?.last_name : ''}`}</p>
                    </div>
                    <div className={'account-card--links-wrapper'}>
                        <p>Налаштування аккаунту</p>
                        <p>Керувати системою</p>
                        <p>Мова</p>
                        <p>Сповіщення</p>
                        <p>Вихід</p>
                        <img src={process.env.PUBLIC_URL + '/images/homeIllustrationIcon.svg'} />
                    </div>
                </div>
            </div>
            {/*<div className='Home__doneTasksWrapper'>*/}
            {/*    <TasksList tasks={tasks}/>*/}
            {/*</div>*/}
        </div>
    )
}

export default React.memo(HomePage)
