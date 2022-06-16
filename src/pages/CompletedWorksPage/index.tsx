import React, {useEffect, useMemo, useState} from "react";

import './style.scss'
import {collectionGroup, getDocs, query} from "firebase/firestore";
import {useSelector} from "react-redux";
import {getUser} from "../../store/selectors/auth";
import {TextField} from "@mui/material";
import moment from "moment";

const CompletedWorksPage = ({db}: any) => {
    const user = useSelector(getUser);
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState<any>('All')
    const [completedTests, setCompletedTests] = useState<any>(null)
    const headers = ['Предмет', "Тема", "Дата", "Правильних відповідей", "Прогресс"]

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData () {
        const testTopic = query(collectionGroup(db, 'CompletedTests'))
        const querySnapshot = await getDocs(testTopic);
        let newData = querySnapshot.docs.map(doc => doc.data())
        let userCompletedTests = newData?.map((data: any) => {
            if(data?.uid === user?.uid) {
                return data;
            }
        })
        setCompletedTests([...userCompletedTests])
    }

    const completedTestsWithFilters = useMemo(() => {
        let newData = completedTests?.map((item) => {
            if(item?.topic?.includes(search)) {
                return item;
            }
        })
        let newDataWithFilters = newData?.filter((item) => {
            if(filter === 'All') return item;
            if(filter === 'Successful' && (item?.count_right_answers * 100)/item?.count_tests === 100) return item;
            if(filter === 'Unsuccessful' && (item?.count_right_answers * 100)/item?.count_tests < 100) return item;
        })
        return newDataWithFilters;
    }, [completedTests, filter, search])

    return (
        <div className='completed-works-page'>
            <div className='completed-works-wrapper'>
                <div className='search-wrapper'>
                    <TextField
                        className='search-wrapper--input'
                        placeholder={'Пошук тесту за темою'}
                        type={"text"}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className='table-wrapper'>
                    <h1 className='table-wrapper--title'>Пройдені тести</h1>
                    <div className='filters-wrapper'>
                        <div className={`${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>Всі</div>
                        <div className={`${filter === 'Successful' ? 'active' : ''}`} onClick={() => setFilter('Successful')}>Успішні</div>
                        <div className={`${filter === 'Unsuccessful' ? 'active' : ''}`} onClick={() => setFilter('Unsuccessful')}>Не успішні</div>
                    </div>
                    { completedTestsWithFilters?.length && completedTestsWithFilters[0] ? <div className='subject-progress-list'>
                        <div className='subject-progress-list--header'>
                            {headers.map((header) => <div>{header}</div>)}
                        </div>
                        <div className='subject-progress-list--body'>
                            {completedTestsWithFilters?.map((topicItem: any) => <div className='subject-progress-list--body--row'>
                                <div className='subject-progress-list--body--row--item'>{topicItem?.subject_title}</div>
                                <div className='subject-progress-list--body--row--item'>{topicItem?.topic_title?.length > 21 ? `${topicItem?.topic_title?.slice(0, 20)}...` : topicItem?.topic_title}</div>
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
                    </div> : (
                        <div className={'not-result'}><h1>Пройдених тестів поки що немає</h1></div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CompletedWorksPage;
