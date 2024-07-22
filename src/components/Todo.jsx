import { useState } from "react";

const Todo = () => {
  const [task, setTask] = useState([]);
  const [input, setInput] = useState("");
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addTask = () => {
    if (input.trim() !== "") {
      const newTask = {
        id: new Date().getTime(),
        text: input,
        time: new Date().toLocaleTimeString(),
      };
      setTask([...task, newTask]);
      setInput("");
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = task.filter((tasks) => tasks.id !== id);
    setTask(updatedTasks);
  };

  const editTask = (id, text) => {
    setEdit(true);
    setEditId(id);
    setEditValue(text);
  };

  const updateTask = (id) => {
    const updatedTasks = task.map((tasks) =>
      tasks.id === id
        ? {
            ...tasks,
            text: editValue,
            updateTime: new Date().toLocaleTimeString(),
          }
        : tasks
    );
    setTask(updatedTasks);
    setEdit(false);
    setEditId(null);
    setEditValue("");
  };

  return (
    <div className=" min-h-screen font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4">Huỳnh Vĩnh Tiến <br/>TODO LIST</h1>
        <div className="flex mb-4">
          <input
            className="flex-grow border-b-2 max-w-full w-[200px] lg:w-[400px] border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1"
            type="text"
            value={input}
            // onChange={(e) => setInput(e.target.value)}
            onChange={(e) => {
            if (e.target.value.length <= 40) {
              setInput(e.target.value);
            }}}
            placeholder="Thêm Công Việc"
          />
          <button
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={addTask}
          >
            Thêm
          </button>
        </div>
        <ul className="space-y-4">
          {task.map((tasks) => (
            <li
              key={tasks.id}
              className=" shadow-md rounded-md px-4 py-2 flex items-center justify-between border-[2px] border-blue-500 border-dashed"
            >
              {edit && editId === tasks.id ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    // onChange={(e) => setEditValue(e.target.value)}
                    onChange={(e) => {
                    if (e.target.value.length <= 40) {
                      setEditValue(e.target.value);
                    }}}
                    className="flex-grow border-b-2 max-w-full w-[200px] border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1"
                  />
                  <button
                    onClick={() => updateTask(tasks.id)}
                    className="ml-2 bg-blue-500 text-[7px] lg:text-[16px] hover:bg-blue-600 text-white px-2 py-2 rounded"
                  >
                    Cập Nhật
                  </button>
                </>
              ) : (
                <>
                  <div className="flex ">
                  <p className="p-2 max-w-full w-[200px] text-[10px] lg:text-[16px] lg:w-[400px]">{tasks.text}</p><br/><br/><br/><br/>
                  </div>
                  <div className="flex flex-row justify-center items-center absolute ml-[30px] lg:ml-0 lg:w-full lg:right-[5px] mt-[40px]">
                    <small className="text-white p-2 rounded m-3 border hidden lg:block">
                      {tasks.updateTime
                        ? `Đã Cập Nhật Lúc : ${tasks.updateTime}`
                        : `Đã Thêm Lúc : ${tasks.time}`}
                    </small>
                    <div>
                      <button
                        onClick={() => deleteTask(tasks.id)}
                        className="mr-2 text-red-500 hover:text-red-600"
                      >
                        Xóa
                      </button>
                      <button
                        onClick={() => editTask(tasks.id, tasks.text)}
                        className="text-green-500 hover:text-blue-600"
                      >
                        Chỉnh Sửa
                      </button>
                    </div>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <img className="fixed w-[400px] top-0 left-0 ml-[60px] mt-[190px] hidden lg:block" src="logo_1.png" alt=""/>
      <p className="text-transparent text-stroke fixed text-[260px] top-0 mt-[150px] right-0 mr-[20px] hidden lg:block">Tiến</p>
    </div>
  );
};

export default Todo;
