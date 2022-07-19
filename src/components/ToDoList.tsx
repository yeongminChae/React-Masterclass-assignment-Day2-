import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useRecoilState } from "recoil";
import styled from "styled-components";
import {
  Categories,
  categoriesState,
  categoryState,
  ICategory,
  toDoSelector,
} from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Header = styled.header`
  margin-bottom: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 30px;
  max-width: 650px;
  font-size: 14px;
  height: 100vh;
  overflow: hidden;
  @media screen and (max-width: 480px) {
    padding: 20px 0;
  }
`;

const Button = styled.button`
  align-items: center;
  opacity: 0.68;
  cursor: pointer;
  border: none;
  outline: 0;
  margin-left: 8px;
  background-color: transparent;
  font-weight: bold;
  color: #937dc2;
`;

const Input = styled.input`
  flex: 1 1 0%;
  padding: 20;
  height: 36px;
  flex-direction: column;
  align-items: center;
  padding: 0px 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Roboto", sans-serif;
  color: #3d3d3d;
  background: #fff;
  border: 1px solid rgb(206, 205, 223);
  box-shadow: 0px 0.5px 0.5px rgba(0, 0, 0, 0.1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  opacity: 0.7;
  font-size: 20px;
`;

const H1 = styled.h1`
  text-align: center;
  font-size: 48px;
  font-weight: bold;
`;

const ToDoFormWrapper = styled.div`
  flex: 0 0 auto;
  border-bottom: white;
  border-radius: 8px 8px 0 0;
  & > * {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  & > * + * {
    margin-top: 16px;
  }
  label {
    min-width: 105px;
  }
  span {
    margin-top: 8px;
    width: 100%;
    font-size: 0.9em;
    font-weight: 200;
    text-align: right;
    letter-spacing: 1px;
    opacity: 0.6;
  }
`;

const ToDoBoxWrapper = styled.div`
  flex: 1;
  background-color: white;
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

const Select = styled.select`
  opacity: 0.7;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const [categories, setCategories] = useRecoilState(categoriesState);
  const { register, handleSubmit, setValue } = useForm<ICategory>();
  const AddToCategoryFn = ({ addCategory }: ICategory) => {
    setCategories((oldCategories) => {
      window.localStorage.setItem(
        "addedCategories",
        JSON.stringify([
          ...oldCategories,
          {
            text: addCategory,
            id: Date.now(),
            category: addCategory.toUpperCase().replace(" ", "_"),
          },
        ])
      );

      return [
        ...oldCategories,
        {
          text: addCategory,
          id: Date.now(),
          category: addCategory.toUpperCase().replace(" ", "_"),
        },
      ];
    });
    setValue("addCategory", "");
  };

  return (
    <Container className="container-fluid">
      <Header>
        <H1>To Dos</H1>
        <hr />
      </Header>
      <CreateToDo />
      <ToDoFormWrapper>
        <form onSubmit={handleSubmit(AddToCategoryFn)}>
          <div className="input-group mb-3">
            <Input
              type="text"
              className="form-control"
              id="aCtg"
              {...register("addCategory", {
                required: "Please wirte Category",
              })}
              placeholder="Add to Category"
            />
            <Button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
            >
              Add &rarr;
            </Button>
          </div>
        </form>
      </ToDoFormWrapper>
      <Select
        className="form-select form-select-sm"
        aria-label=".form-select-sm example"
        id="ctg"
        value={category}
        onInput={onInput}
      >
        <option value={Categories.TODO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
        {categories?.map((category) => (
          <option key={category.id} value={category.category}>
            {category.text}
          </option>
        ))}
      </Select>
      <br />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
      <ToDoBoxWrapper />
    </Container>
  );
}
export default ToDoList;
