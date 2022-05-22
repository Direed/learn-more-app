import React, {useMemo} from 'react'

import './TasksListItem.scss'

type IProps = {
    nameTask: string,
    time: Date,
}

const TaskListItem: React.FC<IProps> = ({nameTask, time}: IProps) => {
    const timeToTask = useMemo(() => {
        if(new Date().getTime() >= time.getTime()) return `${time.getMinutes()} minutes ago`
        else if(new Date().getTime() <= time.getTime()) return `${time.getMinutes()} minutes to starting task`
        else return null
    }, [time, new Date])
    console.log(timeToTask)
    return (
        <div className='TasksListItem'>
            <div className={'TasksListItem__nameWrapper'}>
                <a>{nameTask}</a>
            </div>
            <div className={'TasksListItem__timeWrapper'}>
                <div className={'TasksListItem__timeWrapper--timeToTask'}>
                    <a>{timeToTask}</a>
                </div>
                <div className={'TasksListItem__timeWrapper--time'}>
                    <a>{time.getMinutes()}</a>
                </div>
            </div>
        </div>
    )
}

export default React.memo(TaskListItem)
