import React, {useEffect, useState} from 'react'
import Calendar from "react-calendar";
import { collection, collectionGroup, getDocs, query } from "firebase/firestore";
import 'react-calendar/dist/Calendar.css';
import './Calendar.scss'
import './Home.scss'
import TasksList from "../../components/TasksList";


const HomePage: React.FC<any> = ({db}) => {
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

    const tasks = [
        {
            name: 'Math',
            time: new Date()
        },
        {
            name: 'Math',
            time: new Date()
        },
        {
            name: 'Math',
            time: new Date()
        },
        {
            name: 'Math',
            time: new Date()
        },
        {
            name: 'Math',
            time: new Date()
        },
        {
            name: 'Math',
            time: new Date()
        },
    ]

    return (
        <div className='Home'>
            <div className='Home__doneTasksWrapper'>
                <TasksList tasks={tasks}/>
            </div>
            <div className='Home__generalInformationWrapper'>
                <div className='Home__generalInformationWrapper__actionsWrapper'>
                    {/*<div className='Home__generalInformationWrapper__actionsWrapper--calendar'>*/}
                    {/*    <Calendar*/}
                    {/*        showFixedNumberOfWeeks={true}*/}
                    {/*        locale={"en"}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div className='Home__generalInformationWrapper__actionsWrapper--doHomework'>
                        <div className='Home__generalInformationWrapper__actionsWrapper--doHomework--header'>
                            <a>{`Hello, ${'Anton'}`}</a>
                            <div>www</div>
                        </div>
                       <a>Don’t forget to do
                           your homework!
                       </a>
                        <button>YOUR HOMEWORK</button>
                    </div>
                </div>
                <div className='Home__generalInformationWrapper--achievements'>

                </div>
            </div>
        </div>
    )
}

export default React.memo(HomePage)
