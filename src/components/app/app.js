import React, {useState} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

import './app.css';
import ItemAddForm from "../item-add-form";


const App = () => {

  const createTodoItem = (label) => {
    return {
      label: label,
      important: false,
      done: false,
      id: `${label} ${Date.now()}`
    }
  }

  const findId = (arr, id) => {
    return arr.findIndex(el => id === el.id)
  }

  const [todoData, setTodoData] = useState([
    createTodoItem('Drink Coffee'),
    createTodoItem('Make Awesome App'),
    createTodoItem('Have a lunch')
  ])

  const [term, setTerm] = useState('')

  const [filterStatus, setFilterStatus] = useState('all')

  const deleteItem = (id) => {setTodoData(todoData.filter(item => item.id !== id))}

  const addItem = (text) => {
    const newItem = createTodoItem(text)

    setTodoData(todoData => [...todoData, newItem])
  }

  const toggleProperty = (arr, id, propName) => {
    const idx = findId(arr, id)

    setTodoData((arr) => {
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, [propName]: !oldItem[propName]}

      return [
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1)
      ]
    })
  }

  const onToggleDone = (id) => {
    toggleProperty(todoData, id, 'done')
  }

  const onToggleImportant = (id) => {
    toggleProperty(todoData, id, 'important')
  }

  const search = (items, term) => {
    if(term.length === 0) {
      return items
    }

    return items.filter(item => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
    })
  }

  const filter = (items, filter) => {
    switch(filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.done)
      case 'done':
        return items.filter((item) => item.done)
      default:
        return items
    }
  }

  const onSearchChange = (term) => {
    setTerm(term)
  }

  const onFilterChange = (name) => {
    setFilterStatus(name)
  }

  const doneCount = todoData.filter(el => el.done).length;
  const todoCount = todoData.length - doneCount
  const visibleItems = filter(search(todoData, term), filterStatus)

  return (
    <div className="todo-app">
      <AppHeader toDo={todoCount} done={doneCount} />
      <div className="top-panel d-flex">
        <SearchPanel
          onSearchChange={onSearchChange }
        />
        <ItemStatusFilter
          filter={filterStatus}
          onFilterChange={onFilterChange}
        />
      </div>

      <TodoList
        todos={visibleItems}
        onDeleted={deleteItem}
        onToggleDone={onToggleDone}
        onToggleImportant={onToggleImportant}
      />
      <ItemAddForm  addItem={addItem}/>
    </div>
  );
};

export default App;
