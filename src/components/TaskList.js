/**
 * TaskList 組件 - 顯示任務列表
 * 
 * 這個組件負責:
 * 1. 接收任務陣列作為 props
 * 2. 將任務陣列渲染為有序列表
 * 3. 為每個任務項目應用適當的樣式
 * 
 * @param {Object} props - 組件的屬性
 * @param {Array<string>} props.tasks - 包含所有任務文字的陣列
 * @returns {JSX.Element} 渲染的任務列表
 */
export default function TaskList({ tasks }) {
  return (
    <ul className="space-y-2"> {/* 無序列表容器，設定項目間垂直間距 */}
			{/* 使用 map 方法遍歷任務陣列，為每個任務創建列表項 */}
			{tasks.map((task, index) => (
				<li
					key={index} // 使用索引作為 React key，在列表項目不會重新排序的情況下是可行的
					className="border p-2 rounded" // 列表項樣式：邊框、內邊距和圓角
				>
					{task} {/* 顯示任務文字 */}
				</li>
			))}
    </ul>
  );
}