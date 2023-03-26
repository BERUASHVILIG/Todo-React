import axios from "axios";
import { useState, useEffect } from "react";
import "./Todo.css";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editableTodo, setEditableTodo] = useState([
    {
      value: "",
      isCompleted: false,
      isBeingEdited: false,
    },
  ]);

  const handleAddvalue = (todo) => {
    setTodos((prev) => [
      ...prev,
      {
        title: todo,
        isCompleted: false,
        isBeingEdited: false,
      },
    ]);
    setInputValue("");
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(() => {
        const newTodos = [...todos].filter((todo) => todo.id !== id);
        setTodos(newTodos);
        alert(`delete  ${id} Todo`);
      });
  };

  const handleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const handleEditMode = (index) => {
    setEditableTodo({ ...todos[index] });
    const newTodos = [...todos];
    newTodos[index].isBeingEdited = true;
    setTodos(newTodos);
  };

  const handleEditTodo = (value) => {
    setEditableTodo({ ...editableTodo, title: value });
  };

  const handleDone = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1, editableTodo);
    setTodos(newTodos);
    alert(`You edit ${index + 1}`);
  };

  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/todos?_limit=50").then(
      (response) => {
        setTodos(response.data);
      }
    );
  }, []);

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo</h1>
      <div className="todo-main-container">
        <input
          className="input-value"
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button
          className="btn add-btn"
          onClick={() => handleAddvalue(inputValue)}
        >
          Add
        </button>
      </div>
      <div className="todo-task">
        {todos.map((todo, index) => {
          return todo.isBeingEdited ? (
            <div className="todo-update">
              <input
                type="text"
                key={todo.id}
                className="input-value"
                value={editableTodo.title}
                onChange={(event) => handleEditTodo(event.target.value)}
              />
              <button
                className="btn done-btn"
                onClick={() => handleDone(index)}
              >
                Done
              </button>
            </div>
          ) : (
            <ul className="todo-items">
              <li
                style={{ backgroundColor: todo.isCompleted ? "green" : "" }}
                className="todo-item"
                key={todo.id}
              >
                <span
                  style={{
                    textDecoration: todo.isCompleted ? "line-through" : "",
                  }}
                  onClick={() => handleComplete(index)}
                >
                  {todo.title}
                </span>
                <div className="action">
                  <button
                    className="btn dlt-btn"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn edit-btn"
                    onClick={() => handleEditMode(index)}
                  >
                    Edit
                  </button>
                </div>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}

export default Todo;
