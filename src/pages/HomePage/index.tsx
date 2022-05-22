import React, {useEffect, useState} from 'react'
import Calendar from "react-calendar";
import { collection, collectionGroup, getDocs, query } from "firebase/firestore";
import 'react-calendar/dist/Calendar.css';
import './Calendar.scss'
import './Home.scss'
import TasksList from "../../components/TasksList";
import {useSelector} from "react-redux";
import {getUser} from "../../store/selectors/auth";
import RecentlyComponent from "./RecentlyComponent";


const HomePage: React.FC<any> = ({db}) => {
    const user = useSelector(getUser)
    const [querySnapshot, setQuerySnapshot] = useState<any>(null)
    console.log(db, 'db')

    // useEffect(async () => {
    //     const querySnapshot = await getDocs(collection(db, "users"));
    //     querySnapshot.forEach((doc) => {
    //         console.log(`${doc.id} => ${doc.data()}`);
    //     });
    //     setQuerySnapshot(querySnapshot)
    // }, [])

    async function fetchData () {
        const MathTest_grade = query(collectionGroup(db, 'MathTests_grade1'))
        const querySnapshot = await getDocs(MathTest_grade);
        console.log(' querySnapshot after request', querySnapshot)
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            console.log('doc', doc)
            console.log('doc.data()', doc.data())
        });
        setQuerySnapshot(querySnapshot)
    }

    useEffect(() => {
        fetchData()
    }, [])

    console.log('querySnapshot', querySnapshot)

    const recentlyList = [
        {
            subject: 'Math',
            topic: 'Addition',
            progress: '80%',
        },
        {
            subject: 'English',
            topic: 'Past Simple',
            progress: '20%',
        },
        {
            subject: 'Biology',
            topic: 'Brain',
            progress: '50%',
        },
    ]

    return (
        <div className='Home'>
            <div className='LeftHomeWrapper'>
                <div className='TitleWrapper'>
                    <div className='TitleWrapper--firstRow'>
                        <a>{`Hello ${user?.first_name}`}</a>
                        <div>
                            <a>{'0 points'}</a>
                            <img src={process.env.PUBLIC_URL + '/images/Star.svg'} />
                        </div>
                    </div>
                    <a className='TitleWrapper--secondRow'>Don’t forget to do your homework!</a>
                    <button className='TitleWrapper--thirdRow' type={"button"}>
                        Your homework
                    </button>
                </div>
                <RecentlyComponent recentlyItems={recentlyList} />
                <div>
                </div>
            </div>
            <div className='RightHomeWrapper'>

            </div>
            {/*<div className='Home__doneTasksWrapper'>*/}
            {/*    <TasksList tasks={tasks}/>*/}
            {/*</div>*/}
        </div>
    )
}

export default React.memo(HomePage)
