import React from 'react';
import logo from './logo.svg';
import './App.css';
import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers';

function App() {
  const [todos, setTodos] =React.useState([])
  const [todo, setTodo] =React.useState("")
  const [todoEditing,setTodoEditing] =React.useState(null)
  const [editingText, setEditingText] =React.useState("")

  React.useEffect(() => {
    const temp = localStorage.getItem(todos)
    const loadedTodos = JSON.parse(temp)

    if(loadedTodos) {
        setTodos(loadedTodos);
       }
    
  }, []);
   
  React.useEffect(() =>{
    const temp = JSON.stringify(todos)
    localStorage.setItem("todos", temp)
  }, [todos]);

  function handleSubmit(e)  {
    e.preventDefault();

    const newTodo = {

      id: new Date().getTime(),
      text: todo,
      completed: false,
    }

    setTodos([...todos].concat(newTodo));
    setTodo("");
    }
  
  function deleteTodo(id){
    const updatedTodos = [...todos].filter((todo)=> todo.id !== id)
    setTodos (updatedTodos);
  }
  
  function togglecompleted(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    })
    setTodos(updatedTodos);
  }

  function editTodo (id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id){
        todo.text = editingText;
      }
      return todo;
    })
    setTodos(updatedTodos)
    setTodoEditing(null);
    setEditingText("");

  }
  
  
  return (
    <div id = "todo-list">
      <h1> Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type ="text" 
        onChange= {(e) => setTodo (e.target.value)} 
        value = {todo}/>
        <button type=""> Add ToDo</button>
      </form>
      {todos.map((todo) => <div key={todo.id} className = "todo">
        {todoEditing === todo.id ? 
        (<input type ="text" onChange = {(e) => setEditingText (e.target.value)} value = {editingText}/>) 
        : 
        (<div>{todo.text}</div>)}

      
      
      
      <button onClick={ () => deleteTodo(todo.id)}>Delete</button>
      <input type = "checkbox" onChange={() => togglecompleted(todo.id)} checked ={todo.completed}/>

      {todoEditing === todo.id ? 
      (<button onClick={() => editTodo(todo.id)}>submit Edits</button>)
      :
      (  <button onClick ={() => setTodoEditing(todo.id)}>Edit Todo</button>)}
    
      </div>  )}
      
    </div>
  );
}

export default App;
