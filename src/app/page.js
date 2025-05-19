"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import TaskList from "../components/TaskList";

/**
 * Home 組件 - 應用程式的主頁面
 */
export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [nextTitle, setnextTitle] = useState("");
  const [nextDescription, setNextDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const errorTimer = useRef(null);

  // 顯示錯誤訊息
  const showError = (msg) => {
    setError(msg);
    if (errorTimer.current) clearTimeout(errorTimer.current);
    errorTimer.current = setTimeout(() => setError(""), 5000);
  };

  // 新增任務
  const addTask = async () => {
    if (nextTitle.trim() === "") return;
    setLoading(true);
    setError("");
    const newTaskObj = {
      id: nextId,
      title: nextTitle.trim(),
      description: nextDescription.trim(),
    };
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTaskObj),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "新增失敗");
      }
      setnextTitle("");
      setNextDescription("");
      await fetchTasks();
    } catch (e) {
      showError(e.message || "新增失敗");
    }
    setLoading(false);
  };

  // 刪除任務
  const deleteTask = async (id) => {
    setLoading(true);
    setError("");
    const updatedTasks = tasks.filter((task) => task.id !== id);
    try {
      const res = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTasks),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "刪除失敗");
      }
      setTasks(updatedTasks);
    } catch (e) {
      showError(e.message || "刪除失敗");
    }
    setLoading(false);
  };

  // 取得任務
  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/tasks");
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "載入失敗");
      }
      const data = await res.json();
      setTasks(data);
      const maxId = Math.max(...data.map((task) => task.id), 0);
      setNextId(maxId + 1);
    } catch (e) {
      showError(e.message || "載入失敗");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main className="p-4 max-w-md mx-auto">
      <div className="flex items-center mb-2">
        <h1 className="text-2xl font-bold">Task Board</h1>
        {loading && <span className="text-gray-500 ml-4">Loading...</span>}
        {error && (
          <span className="text-red-500 ml-4 truncate flex-1" title={error}>
            {error}
          </span>
        )}
      </div>
      <div className="flex gap-2 mb-4">
        <input
          className="flex p-2 flex-1"
          placeholder="Enter a Title"
          value={nextTitle}
          onChange={(e) => setnextTitle(e.target.value)}
          disabled={loading}
        />
        <input
          className="flex p-2 flex-1"
          placeholder="Enter a Description"
          value={nextDescription}
          onChange={(e) => setNextDescription(e.target.value)}
          disabled={loading}
        />
        <button
          className="bg-blue-500 text-white px-4"
          onClick={addTask}
          disabled={loading}
        >
          Add
        </button>
      </div>
      <TaskList tasks={tasks} onDelete={deleteTask} />
    </main>
  );
}
