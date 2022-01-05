import { useEffect, useState } from "react";
import Column from "./Column.jsx";
import { DragDropContext } from 'react-beautiful-dnd';



export default function DragArea(props) {



    const reOrder = async (column, taskIds) => {

       
        await fetch('http://127.0.0.1:8000/services/reorder/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "column" : column,
            "task_orders" : taskIds
        })
        })
        .then(res => props.fetchGroups())
        

        
    }

    const onDragEnd = (result) => {
        const {destination, source, draggableId} = result;

        if (!destination) {
            return
        }
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ){
            return
        }

        const start = props.data.columns[source.droppableId];
        const finish = props.data.columns[destination.droppableId];


        if(start===finish){
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0  , draggableId);

            const newColumn = {
                ...start,
                taskIds : newTaskIds
            }

            let onlyIds = []  ;
            newTaskIds.forEach((item) => {
                onlyIds.push(parseInt(item.split("-")[1]))
            })

            reOrder(newColumn.id.split("-")[1], onlyIds)

           
        }
        else {
            const startTaskIds  = Array.from(start.taskIds);
            startTaskIds.splice(source.index, 1) ;
    
            const newStart = {
                ...start,
                taskIds : startTaskIds
            }
    
            const finishTaskIds = Array.from(finish.taskIds);
            finishTaskIds.splice(destination.index, 0 , draggableId);
            const newFinish = {
                ...finish,
                taskIds : finishTaskIds,
            };
    
            const newData = {
                ...props.data,
                columns : {
                    ...props.data.columns,
                    [newStart.id] : newStart,
                    [newFinish.id] : newFinish
                }
            }

            let onlyStartIds = []  ;
            startTaskIds.forEach((item) => {
                onlyStartIds.push(parseInt(item.split("-")[1]))
            })

            let onlyFinishIds = []  ;
            finishTaskIds.forEach((item) => {
                onlyFinishIds.push(parseInt(item.split("-")[1]))
            })

            reOrder(newStart.id.split("-")[1], onlyStartIds)

            reOrder(newFinish.id.split("-")[1], onlyFinishIds)

            
        }

       

        


        

    }

    return (
        <DragDropContext
        onDragEnd={onDragEnd}
        >

        <div className="grid grid-cols-5 space-x-6"> 
            {props.data.columnOrder.map(columnId => {
                const column = props.data.columns[columnId];
                const tasks = column.taskIds.map(taskId => props.data.tasks[taskId]);
                return <Column key={column.id} column={column} tasks={tasks} handleGroupDelete={props.handleGroupDelete} setOpenTodoModal={props.setOpenTodoModal}
                setSelectedGroup={props.setSelectedGroup}  />
            })}
          
        </div>
        </DragDropContext>
    )
}