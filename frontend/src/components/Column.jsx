import Task from './Task.jsx';
import { Droppable } from 'react-beautiful-dnd';
import { PlusSmIcon as PlusSmIconSolid , MinusIcon} from '@heroicons/react/solid'

export default function Column(props) {
    return (
      <div className="bg-white px-4 py-5 border-b border-gray-200 rounded sm:px-6 m-5">

        <div className='flex justify-between mb-2'>
        <h3 className="text-xl text-left leading-6 font-medium text-gray-900">{props.column.title}</h3>
        <div className='flex justify-start'>
        <button
        onClick={() => {
          props.setSelectedGroup(props.column.id.split("-")[1])
          props.setOpenTodoModal(true)
        }}
        type="button"
        className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <PlusSmIconSolid className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        onClick={() => props.handleGroupDelete(props.column.id.split("-")[1])}
        type="button"
        className="inline-flex mx-2 items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <MinusIcon className="h-5 w-5" aria-hidden="true" />
      </button>

        </div>
       

        </div>

        

        <Droppable droppableId={props.column.id}>
        
          { provided =>(
             <div className="mt-1 p-3 text-sm text-left rounded"
             {...provided.droppableProps}
             ref={provided.innerRef}
             
             >
             {props.tasks.map((task,index) => <Task key={task.id} task={task} index={index} />)}
             {provided.placeholder}
             </div>
          )
          }
       
        </Droppable>
      </div>
    )
  }
  