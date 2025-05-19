"use client";

// 匯入 Next.js 路由與 React hooks
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

// 任務詳細頁元件，接收 params 取得任務 id
export default function TaskDetail({ params }) {
  const router = useRouter();
  const { id } = React.use(params);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // 儲存按鈕事件，更新伺服器資料並導回首頁
  const handleSave = async () => {
    if (title.trim() === "" || description.trim() === "") return;

    // 取得所有任務，找到對應 id 的任務並更新
    const res = await fetch("/api/tasks");
    const saveTasks = await res.json();
    const updatedTasks = saveTasks.map((task) =>
      task.id === Number(id) ? { ...task, title, description } : task
    );
    await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTasks),
    });
    router.push("/");
  };

  // 載入時根據 id 透過 fetch API 取得任務資料並設置狀態
  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch("/api/tasks");
      const saveTasks = await res.json();
      const task = saveTasks.find((task) => task.id === Number(id));
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
      }
    };
    fetchTask();
  }, [id]);

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Task Details</h1>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 w-full mb-4"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        row-s={4}
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleSave}>
        Save
      </button>
    </main>
  );
}
