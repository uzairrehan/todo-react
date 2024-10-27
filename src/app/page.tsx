"use client";
import { allTodoType } from "@/types/types";
import { useState } from "react";

export default function Home() {
  const [todo, setTodo] = useState<string>("");
  const [allTodos, setAllTodos] = useState<allTodoType[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  function handleSubmit() {
    if (isEditing && editIndex !== null) {
      updateTodo();
    } else {
      saveTodo();
    }
  }

  function saveTodo() {
    const copyTodos = [...allTodos];
    copyTodos.push({ name: todo });
    setAllTodos(copyTodos);
    setTodo("");
  }

  function deleteTodo(index: number) {
    const copyTodos = [...allTodos];
    copyTodos.splice(index, 1);
    setAllTodos(copyTodos);
  }

  function editTodo(index: number) {
    setIsEditing(true);
    setEditIndex(index);
    setTodo(allTodos[index].name); 
  }

  function updateTodo() {
    if (editIndex !== null) {
      const copyTodos = [...allTodos];
      copyTodos[editIndex] = { name: todo };
      setAllTodos(copyTodos);
      setIsEditing(false);
      setEditIndex(null);
      setTodo("");
    }
  }

  return (
    <>
      <h1>Todo</h1>
      <input
        type="text"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
      <button onClick={handleSubmit}>
        {isEditing ? "Update" : "Add"}
      </button>
      <br />
      <br />
      <h3>All todos:</h3>
      <br />
      <p>
        {allTodos.map(({ name }, index) => (
          <b key={index}>
            Todo: {name}
            <br />
            <button onClick={() => deleteTodo(index)}>Delete</button>
            <br />
            <button onClick={() => editTodo(index)}>Edit</button>
            <br />
            <br />
          </b>
        ))}
      </p>
    </>
  );
}
