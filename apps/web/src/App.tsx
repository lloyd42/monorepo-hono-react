import { ChangeEvent, useState } from "react";
import "./App.css";
import { Button } from "@mono/ui";
import { add } from "@mono/utils";
import { hcWithType } from "api/hc";

const client = hcWithType("http://localhost:3000");

function App() {
  const [num, setNum] = useState({
    a: "",
    b: "",
  });

  const [todoList, setTodoList] = useState<string[]>([]);

  const handleNumChange =
    (key: keyof typeof num) => (e: ChangeEvent<HTMLInputElement>) => {
      setNum((prevNum) => ({
        ...prevNum,
        [key]: e.target.value,
      }));
    };

  return (
    <>
      <div>
        <input type="text" value={num.a} onChange={handleNumChange("a")} />
        <input type="text" value={num.b} onChange={handleNumChange("b")} />
        <Button
          onClick={() => {
            alert(add(Number(num.a), Number(num.b)));
          }}
        >
          Add
        </Button>
      </div>
      <div>
        <input type="text" id="title" />
        <button
          type="submit"
          onClick={() => {
            const title = (document.getElementById("title") as HTMLInputElement)
              .value;
            if (title) {
              setTodoList([...todoList, title]);
              client.todo.$post({
                form: {
                  title,
                },
              });
            }
          }}
        >
          Add
        </button>
      </div>
      <ul>
        {todoList.map((todo, i) => (
          <li key={i}>
            {todo}
            <button
              onClick={async () => {
                setTodoList([...todoList.filter((item) => item != todo)]);
                client.todo[":id"].$delete({
                  param: {
                    id: i.toString(),
                  },
                });
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
