"use client";
import { useState } from "react";
import { allTodoType } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

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
    <div className="flex flex-col items-center p-4 space-y-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-center text-xl font-semibold">Todo</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Enter your todo"
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            className="w-full"
          />
          <Button onClick={handleSubmit} className="w-full">
            {isEditing ? "Update" : "Add"}
          </Button>
        </CardContent>
      </Card>

      <Card className="w-full max-w-md">
        <CardHeader>
          <h3 className="text-center text-lg font-medium">All Todos</h3>
        </CardHeader>
        <CardContent>
          {allTodos.length > 0 ? (
            <ul className="space-y-4">
              {allTodos.map(({ name }, index) => (
                <li key={index} className="flex items-center justify-between p-2 border rounded">
                  <span>{name}</span>
                  <div className="space-x-2">
                    <Button variant="secondary" size="sm" onClick={() => editTodo(index)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteTodo(index)}>
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No todos yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
