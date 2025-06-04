import { useState } from "react";

export default function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const toggleComplete = () => {
    onUpdate(todo.id, {
      title: todo.title,
      description: todo.description,
      completed: !todo.completed,
    });
  };

  const saveUpdate = () => {
    onUpdate(todo.id, { title, description, completed: todo.completed });
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
  <input type="checkbox" checked={todo.completed} onChange={toggleComplete} />
  {isEditing ? (
    <>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <input value={description} onChange={e => setDescription(e.target.value)} />
      <div className="todo-actions">
        <button onClick={saveUpdate}>💾 Save</button>
      </div>
    </>
  ) : (
    <>
      <h3 style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.title}</h3>
      <p>{todo.description}</p>
      <div className="todo-actions">
        <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
        <button onClick={() => onDelete(todo.id)}>❌ Delete</button>
      </div>
    </>
  )}
</div>

  );
}
