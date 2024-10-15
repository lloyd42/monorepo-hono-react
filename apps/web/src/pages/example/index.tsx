import { Button } from "@mono/ui";
import { add } from "@mono/utils";
import { ChangeEvent, useState } from "react";
import { useTodoCreate, useTodoDel } from "./api";
import { Input, Space, message } from "antd";

const TodoList = () => {
  const [title, setTitle] = useState<string>("");
  const [todoList, setTodoList] = useState<string[]>([]);
  const { mutate: createTodo } = useTodoCreate();
  const { mutate: delTodo } = useTodoDel();

  const handleAdd = () => {
    if (!title) {
      message.warning("please input title");
      return;
    }
    createTodo(
      { title },
      {
        onSuccess: () => {
          setTodoList([...todoList, title]);
          setTitle("");
        },
      }
    );
  };

  return (
    <>
      <Space>
        <Input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button
          type="submit"
          onClick={handleAdd}
          style={{
            background: "#ffffff",
            height: 40,
            padding: "0px 16px",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #d9d9d9",
          }}
        >
          Add
        </button>
      </Space>
      <br />
      <br />
      <ul>
        {todoList.map((todo, i) => (
          <li key={i}>
            <Space>
              · {todo}
              <button
                onClick={async () => {
                  delTodo({
                    id: i.toString(),
                  });
                  setTodoList([...todoList.filter((item) => item != todo)]);
                }}
                style={{
                  background: "#ffffff",
                  height: 40,
                  padding: "0px 16px",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #d9d9d9",
                }}
              >
                Delete
              </button>
            </Space>
            <br />
            <br />
          </li>
        ))}
      </ul>
    </>
  );
};

function Example() {
  const [num, setNum] = useState({
    a: "",
    b: "",
  });

  const handleNumChange =
    (key: keyof typeof num) => (e: ChangeEvent<HTMLInputElement>) => {
      setNum((prevNum) => ({
        ...prevNum,
        [key]: e.target.value,
      }));
    };

  return (
    <>
      <Space>
        <Input type="text" value={num.a} onChange={handleNumChange("a")} />
        <Input type="text" value={num.b} onChange={handleNumChange("b")} />
        <Button
          onClick={() => {
            alert(add(Number(num.a), Number(num.b)));
          }}
          style={{
            background: "#ffffff",
            height: 40,
            padding: "0px 16px",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #d9d9d9",
          }}
        >
          Increase
        </Button>
      </Space>
      <br />
      <br />
      <TodoList />
    </>
  );
}

export default Example;
