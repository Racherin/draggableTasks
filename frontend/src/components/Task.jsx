import { Draggable } from "react-beautiful-dnd"


export default function Task(props){
    return (
        <Draggable draggableId={props.task.id} key={props.task.id} index={props.index}>
            {
                (provided) => (
                    <p className="px-2 py-3 border-2 my-2 rounded text-black bg-white font-medium"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        key={props.task.id}>
                        <span className="flex flex-col">
                            <span className="mb-0.5">{props.task.content}</span>
                            
                            <span className="text-gray-600 font-normal mt-0.5 flex flex-col">
                                <span>Due Date : </span>
                                <span> {props.task.dueDate} - {props.task.dueTime}</span>
                               

                            </span>
                        </span>
                                 </p>
                            
                )
            }
        </Draggable>
    )
}