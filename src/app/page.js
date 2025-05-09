"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";

/**
 * Home 組件 - 應用程式的主頁面
 */
export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [nextTitle, setnextTitle] = useState("");
  const [nextDescription, setNextDescription] = useState("");

  // 新增任務
  const addTask = () => {
    if (nextTitle.trim() === "") return;
    const newTaskObj = {
      id: nextId,
      title: nextTitle.trim(),
      description: nextDescription.trim(),
    };
    const updatedTasks = [...tasks, newTaskObj];
    setTasks(updatedTasks);
    setnextTitle("");
    setNextDescription("");
    setNextId(nextId + 1);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // 刪除任務
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // 初始化：從 localStorage 載入任務
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
    const maxId = Math.max(...savedTasks.map((task) => task.id), 0);
    setNextId(maxId + 1);
  }, []);

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Task Board</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="flex p-2 flex-1"
          placeholder="Enter a Title"
          value={nextTitle}
          onChange={(e) => setnextTitle(e.target.value)}
        />
        <input
          className="flex p-2 flex-1"
          placeholder="Enter a Description"
          value={nextDescription}
          onChange={(e) => setNextDescription(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4" onClick={addTask}>
          Add
        </button>
      </div>
      <TaskList tasks={tasks} onDelete={deleteTask} />
    </main>
  );
}
