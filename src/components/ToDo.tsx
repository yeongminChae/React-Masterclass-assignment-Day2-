import React from "react";
import { Categories, IToDo, toDoState, categoriesState } from "../atoms";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

const Button = styled.button`
  align-items: center;
  text-shadow: #080808 5px 10px 25px;
  opacity: 0.68;
  cursor: pointer;
  border: none;
  outline: 0;
  font-weight: bold;
`;

const Ul = styled.ul`
  border-radius: 8px;
`;

const ToDoBoxWrapper = styled.div`
  flex: 1;
  background-color: white;
  opacity: 0.7;
  overflow-y: auto;
  border-radius: 8px 8px;
  border: 1px solid rgb(206, 205, 223);
  box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1);
  & > p {
    margin-bottom: 20px;
    text-align: center;
    font-size: 1.2em;
    font-weight: 500;
    @media screen and (max-width: 480px) {
      margin-bottom: 10px;
    }
  }
  @media screen and (max-width: 480px) {
    padding: 15px;
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      window.localStorage.setItem(
        "toDoitems",
        JSON.stringify([
          ...oldToDos.slice(0, targetIndex),
          newToDo,
          ...oldToDos.slice(targetIndex + 1),
        ])
      );

      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const onClickDelete = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const categories = useRecoilValue(categoriesState);
  return (
    <Ul className="list-group list-group-flush">
      <ToDoBoxWrapper>
        <li className="list-group-item">
          <span>{text}</span>
          {category !== Categories.DOING && (
            <Button
              type="button"
              className="btn btn-outline-success"
              name={Categories.DOING}
              onClick={onClick}
            >
              Doing
            </Button>
          )}
          {category !== Categories.TODO && (
            <Button
              type="button"
              className="btn btn-outline-success"
              name={Categories.TODO}
              onClick={onClick}
            >
              ToDo
            </Button>
          )}
          {category !== Categories.DONE && (
            <Button
              type="button"
              className="btn btn-outline-success"
              name={Categories.DONE}
              onClick={onClick}
            >
              Done
            </Button>
          )}
          <Button
            type="button"
            className="btn btn-outline-danger"
            onClick={onClickDelete}
          >
            Delete
          </Button>
          {categories?.map(
            (cate) =>
              category !== cate.category && (
                <Button
                  type="button"
                  className="btn btn-outline-primary"
                  key={cate.id}
                  name={cate.category}
                  onClick={onClick}
                >
                  {cate.text}
                </Button>
              )
          )}
        </li>
      </ToDoBoxWrapper>
    </Ul>
  );
}

export default ToDo;
