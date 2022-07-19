import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

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
  box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  opacity: 0.7;
  font: bold;
  font-size: 20px;
`;

const Form = styled.form`
  margin: 0px;
  padding: 0px;
  border: 0px;
  font: inherit;
  vertical-align: baseline;
`;

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const hadleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <Form onSubmit={handleSubmit(hadleValid)}>
      <div className="input-group mb-3">
        <Input
          type="text"
          className="form-control"
          {...register("toDo", {
            required: "Please write ToDOs",
          })}
          placeholder="Write a To Do"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        />
        <Button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          Add &rarr;{" "}
        </Button>
      </div>
    </Form>
  );
}

export default CreateToDo;
