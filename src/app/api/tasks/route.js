import { promises as fs } from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src", "data", "tasks.json");

export async function GET() {
  try {
    const data = await fs.readFile(DATA_PATH, "utf-8");
    // 檢查 JSON 格式
    try {
      JSON.parse(data);
    } catch {
      return new Response("資料格式錯誤", { status: 500 });
    }
    return new Response(data, { status: 200 });
  } catch (e) {
    // 檔案不存在時回傳空陣列
    return new Response("[]", { status: 200 });
  }
}

export async function POST(request) {
  try {
    const newTask = await request.json();
    // 資料驗證
    if (
      typeof newTask !== "object" ||
      typeof newTask.id !== "number" ||
      typeof newTask.title !== "string" ||
      typeof newTask.description !== "string"
    ) {
      return new Response("資料格式錯誤", { status: 400 });
    }
    let tasks = [];
    try {
      const data = await fs.readFile(DATA_PATH, "utf-8");
      tasks = JSON.parse(data);
    } catch {}
    tasks.push(newTask);
    await fs.writeFile(DATA_PATH, JSON.stringify(tasks, null, 2));
    return new Response(JSON.stringify(newTask), { status: 201 });
  } catch (e) {
    return new Response("儲存失敗", { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const updatedTasks = await request.json();
    // 驗證 updatedTasks 必須為陣列且每個元素格式正確
    if (
      !Array.isArray(updatedTasks) ||
      !updatedTasks.every(
        (task) =>
          typeof task === "object" &&
          typeof task.id === "number" &&
          typeof task.title === "string" &&
          typeof task.description === "string"
      )
    ) {
      return new Response("資料格式錯誤", { status: 400 });
    }
    await fs.writeFile(DATA_PATH, JSON.stringify(updatedTasks, null, 2));
    return new Response(JSON.stringify(updatedTasks), { status: 200 });
  } catch (e) {
    return new Response("更新失敗", { status: 500 });
  }
}
