"use client";
import { allTodoType } from "@/types/types";
import { useState } from "react";

export default function Home() {
  const [todo, setTodo] = useState<string>("")
  const [allTodos, setAllTodos] = useState<allTodoType[]>([])
  function handleSubmit() {
    setTodo(todo)
    saveTodo()
  }
  function saveTodo() {
    const copyTodos = [...allTodos]
    copyTodos.push({ name: todo })
    setAllTodos(copyTodos)
    setTodo("")
  }
  function deleteTodo(index: number) {
    const copyTodos = [...allTodos]
    copyTodos.splice(index, 1)
    setAllTodos(copyTodos)
  }
  function editTodo(index: number) {
    const copyTodos = [...allTodos]
    copyTodos.splice(index, 1)
    setAllTodos(copyTodos)
  }
  return (
    <>
      <h1>Todo</h1>
      <input type="text"
        onChange={(e) => setTodo(e.target.value)}
        value={todo} />
      <button onClick={handleSubmit}>
        ADD
      </button>
      <br />
      <br />
      <h3>All todos : </h3>
      <br />
      <p>
        {allTodos.map(({ name }, index) => {
          return <b key={index}>
            Todo : {name}
            <br />
            <button onClick={() => deleteTodo(index)}>delete</button>
            <br />
            <button onClick={() => editTodo(index)}>edit</button>
            <br /><br />
          </b>
        })}
      </p>
    </>
  );
}
