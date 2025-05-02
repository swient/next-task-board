'use client'; // 指示 Next.js 這是一個客戶端組件，可以使用 React hooks 和事件處理

// 引入必要的模組
import Image from "next/image"; // Next.js 的圖片優化組件
import { useState } from "react"; // React 的狀態管理 hook
import TaskList from "../components/TaskList"; // 引入自定義的 TaskList 組件

/**
 * Home 組件 - 應用程式的主頁面
 * 
 * 這個組件負責:
 * 1. 管理任務列表的狀態
 * 2. 提供新增任務的功能
 * 3. 渲染任務輸入表單和任務列表
 */
export default function Home() {
  // 狀態管理
  const [tasks, setTasks] = useState([]); // 儲存所有任務的陣列
  const [newTask, setNewTask] = useState(''); // 儲存新任務的輸入值

  /**
   * 新增任務的處理函數
   * 
   * 功能:
   * 1. 檢查輸入是否為空
   * 2. 將新任務添加到現有任務列表中
   * 3. 重置輸入欄位
   */
  const addTask = () => {
    if (newTask.trim() === '') return; // 如果輸入為空或只有空格，則不執行任何操作
    console.log("Before", tasks); // 記錄添加前的任務列表
    console.log("NewTask", newTask); // 記錄新任務內容
    const updatedTasks = [...tasks, newTask]; // 使用展開運算符創建包含新任務的新陣列
    setTasks(updatedTasks); // 更新任務列表狀態
    console.log("After", updatedTasks); // 記錄添加後的任務列表
    setNewTask(''); // 清空輸入欄位
  };

  // 渲染 UI
  return (
    <main className="p-4"> {/* 主容器，設定內邊距 */}
      <h1 className="text-2xl font-bold">Task Board</h1> {/* 頁面標題 */}

      {/* 任務輸入表單 */}
      <div className="flex gap-2 mb-4"> {/* 使用 flex 佈局，設定間距和底部邊距 */}
        <input
          className="flex p-2 flex-1" // 輸入框樣式，flex-1 使其佔據剩餘空間
          placeholder="Enter a task" // 輸入框提示文字
          value={newTask} // 綁定到 newTask 狀態
          onChange={(e) => setNewTask(e.target.value)} // 當輸入變化時更新 newTask 狀態
        />
        <button
          className="bg-blue-500 text-white px-4" // 按鈕樣式，設定背景色、文字顏色和水平內邊距
          onClick={addTask} // 點擊時調用 addTask 函數
        >
          Add
        </button>
      </div>

      {/* 渲染任務列表組件，並傳遞任務陣列作為 props */}
      <TaskList tasks={tasks}/>
    </main>
  );
}
