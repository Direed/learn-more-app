import React from 'react'
import TaskListItem from "./components/TasksListItem";

type IProps = {
    tasks: any,
}

const TasksList: React.FC<IProps> = ({tasks}: IProps) => {
    return tasks.map((item: any, index: number) => {
        return <TaskListItem nameTask={item.name} time={item.time} key={`${item.name}_${item.time}_${index}`}/>
    })
}

export default React.memo(TasksList)
