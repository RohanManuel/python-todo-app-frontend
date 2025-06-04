import { useEffect, useState } from "react";
import axios from "axios";
import './App.css';
import TodoItem from "./components/TodoItem";

const baseURL = "https://todo-api-gj0x.onrender.com/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios.get(baseURL).then(res => setTodos(res.data));
  }, []);

  const handleAdd = () => {
    if (title.trim()) {
      axios.post(baseURL, { title, description }).then(res => {
        setTodos([...todos, res.data]);
        setTitle("");
        setDescription("");
      });
    }
  };

  const handleUpdate = (id, updatedTodo) => {
    axios.put(`${baseURL}/${id}`, updatedTodo).then(res => {
      setTodos(todos.map(todo => (todo.id === id ? res.data : todo)));
    });
  };

  const handleDelete = (id) => {
    axios.delete(`${baseURL}/${id}`).then(() => {
      setTodos(todos.filter(todo => todo.id !== id));
    });
  };

  return (
    <div className="app-container">
      <h1>✅ Todo App</h1>
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        type="text"
      />
      <input
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        type="text"
      />
      <button onClick={handleAdd}>Add Todo</button>

      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
export default App;
