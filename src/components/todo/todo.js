import "./todo.scss"
import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import CheckLogo from "../../assests/group.svg";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { ScrollPanel } from "primereact/scrollpanel";
function Todo(props) {
  const user = props.user;
  const [todoTitle, setTodoTitle] = useState(null);
  const [todoList, setTodoList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(0);

  const dialogHeader = <img src={CheckLogo} />;

  useEffect(() => {
    getTodoList(selectedStatus);
  }, [selectedStatus]);

  const getTodoList = (state) => {
    debugger;
    let url = "http://localhost:8888/listTodos";
    if (state) {
      url += "?statusId=" + state;
    }
    fetch(url, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const res = JSON.parse(data);
        if (res) {
          setTodoList(res);
        } else {
          // showError();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const updateTodoItem = (id, state) => {
    let url = "http://localhost:8888/";
    if (state) {
      url += "markTodoCompleted";
    } else {
      url += "markTodoUncompleted";
    }
    fetch(url, {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => response.json())
      .finally(() => {
        getTodoList(selectedStatus);
      });
  };

  const deleteTodoItem = (id) => {
    let url = "http://localhost:8888/deleteTodo?id=" + id;
    fetch(url, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    }).finally(() => {
      getTodoList(selectedStatus);
    });
  };

  const footer = (
    <div className="flex flex-wrap justify-content-start gap-2">
      <p>Show:</p>
      <Button
        label="All"
        link
        onClick={() => {
          setSelectedStatus(0);
        }}
        size="small"
        className="p-0"
      />
      <Button
        label="Completed"
        link
        onClick={() => {
          setSelectedStatus(1);
        }}
        size="small"
        className="p-0"
      />
      <Button
        label="Incompleted"
        link
        onClick={() => {
          setSelectedStatus(2);
        }}
        size="small"
        className="p-0"
      />
    </div>
  );

  const createTodo = () => {
    const tmpTodoItem = {
      title: todoTitle,
    };
    fetch("http://localhost:8888/createTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tmpTodoItem),
    })
      .then((response) => response.json())
      .then((data) => {
        const res = JSON.parse(data);
        if (res) {
          setTodoList([...todoList, res]);
        } else {
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const TodoList = (props) => {
    const tmpChildComponent = [];
    for (let i = 0; i < props.todoList.length; i++) {
      tmpChildComponent.push(
        <div className="p-inputgroup mt-1">
          <span className="p-inputgroup-addon">
            <Checkbox
              style={{ display: "inline-block" }}
              onChange={(e) =>
                props.updateTodoItem(props.todoList[i].id, e.checked)
              }
              checked={props.todoList[i].status_id == 1 ? true : false}
            ></Checkbox>
          </span>
          <InputText disabled value={props.todoList[i].title}></InputText>
          <Button
            icon="pi pi-times"
            className="p-button-danger"
            onClick={() => props.deleteTodoItem(props.todoList[i].id)}
          />
        </div>
      );
    }
    return tmpChildComponent;
  };

  return (
    <div>
      <Dialog
        header={dialogHeader}
        visible={props.visibility}
        onHide={() => props.setVisibility(false)}
        dismissableMask={true}
      >
        <div className="card flex justify-content-center">
          <Card title="Todo List" footer={footer} className="md:w-25rem">
            <div className="p-inputgroup">
              <InputText
                id="todoItem"
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
                className="w-full"
                placeholder="Add a new todo"
              />
              <Button
                icon="pi pi-plus"
                className="p-button-success"
                onClick={createTodo}
              />
            </div>
            <ScrollPanel style={{ width: "100%", height: "150px" }} className="custombar1">
              <TodoList
                todoList={todoList}
                updateTodoItem={updateTodoItem}
                deleteTodoItem={deleteTodoItem}
              ></TodoList>
            </ScrollPanel>
          </Card>
        </div>
      </Dialog>
    </div>
  );
}

export default Todo;
