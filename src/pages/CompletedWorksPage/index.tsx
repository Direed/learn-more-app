import React, {useEffect, useMemo, useState} from "react";

import './style.scss'
import {collectionGroup, getDocs, query} from "firebase/firestore";
import {useSelector} from "react-redux";
import {getUser} from "../../store/selectors/auth";
import {TextField} from "@mui/material";

const CompletedWorksPage = ({db}: any) => {
    const user = useSelector(getUser);
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState<any>('All')
    const [completedTests, setCompletedTests] = useState<any>(null)

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
        console.log(newData, 'completed tests')
        setCompletedTests([...userCompletedTests])
    }


    const completedTestsWithFilters = useMemo(() => {
        let newData = completedTests?.map((item) => {
            if(item.topic.includes(search)) {
                return item;
            }
        })
        let newDataWithFilters = newData?.map((item) => {
            if(filter === 'All') return item;
            if(filter === 'Successful' && (item?.count_right_answers * 100)/item?.count_tests === 100) return item;
            if(filter === 'Unsuccessful' && (item?.count_right_answers * 100)/item?.count_tests < 100) return item;
        })
        return newDataWithFilters;
    }, [completedTests, filter, search])

    console.log(completedTestsWithFilters)

    return (
        <div className='completed-works-page'>
            <div className='completed-works-wrapper'>
                <div className='search-wrapper'>
                    <TextField
                        className='search-wrapper--input'
                        placeholder={'Search test'}
                        type={"text"}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button>Done</button>
                </div>
                <div className='table-wrapper'>
                    <h1 className='table-wrapper--title'>Completed tests</h1>
                    <div className='filters-wrapper'>
                        <div className={`${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All</div>
                        <div className={`${filter === 'Successful' ? 'active' : ''}`} onClick={() => setFilter('Successful')}>Successful</div>
                        <div className={`${filter === 'Unsuccessful' ? 'active' : ''}`} onClick={() => setFilter('Unsuccessful')}>Unsuccessful</div>
                    </div>
                    { completedTestsWithFilters?.length && completedTestsWithFilters[0] ? <div className='table'>
                        {completedTestsWithFilters?.map((completedTest) => (
                            <div className='row'>
                                <div><p>{completedTest?.subject}</p></div>
                                <div><p>{completedTest?.topic}</p></div>
                                <div className={'progress-wrapper'}>
                                    <div className={'progress-bar'}>
                                        <div
                                            style={{width: `${(completedTest?.count_right_answers * 100) / completedTest?.count_tests}%`}}></div>
                                    </div>
                                    <p>{`${((completedTest?.count_right_answers * 100) / completedTest?.count_tests).toFixed(0)}%`}</p>
                                </div>
                            </div>
                        ))}
                    </div> : (
                        <div>Not results</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CompletedWorksPage;
