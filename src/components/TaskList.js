"use client";

import Link from "next/link";

/**
 * TaskList 組件 - 顯示任務列表
 */
export default function TaskList({ tasks, onDelete }) {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="border p-2 rounded flex items-center justify-between"
        >
          <Link
            href={`/task/${task.id}`}
            className="text-blue-600 hover:underline"
          >
            <h2 className="text-lg font-bold">{task.title}</h2>
          </Link>
          <span className="flex-1 mx-4 text-gray-600">{task.description}</span>
          <button className="text-red-500" onClick={() => onDelete(task.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
