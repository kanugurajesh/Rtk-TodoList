"use client";

import React, { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import type { RootState } from "@/lib/store";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  deleteAll,
  setTodo,
} from "@/lib/features/todo/todoSlice";

export function TodoList() {
  const [content, setContent] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const todoList = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();

  const AddTodo = (content: string) => {
    if (content == "") {
      toast.error("Please enter a task");
      return;
    }
    dispatch(addTodo(content));
    toast.success("Task is added");
    content = "";
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    const todoListString = localStorage.getItem("todoData");
    let todoList;

    if (todoListString) {
      try {
        todoList = JSON.parse(todoListString);
      } catch (error) {
        console.error("Error parsing todo list from localStorage:", error);
        // Handle parsing error (optional: set todoList to an empty array)
      }
    } else {
      todoList = []; // Set to empty array if no item found
    }

    dispatch(setTodo(todoList));
  }, []);

  return (
    <div className="flex flex-col items-center justify h-full">
      <Toaster />
      <h2 className="text-5xl font-extrabold mt-0 flex-start mt-[30px]">
        Todo <span className="font-semibold text-[#ffd731]">List</span>
      </h2>
      <div className="mt-[60px]">
        <div className="flex gap-2 items-center justify-center">
          <input
            type="text"
            placeholder="Enter the Task..."
            onChange={(e) => setContent(e.target.value)}
            ref={inputRef}
            className="border-[2.5px] border-black rounded-md h-10 w-[300px] pl-2 font-bold"
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                AddTodo(content || "");
              }
            }}
          />
          <button
            onClick={() => AddTodo(content || "")}
            className="border-[2.5px] border-black p-[8px] rounded-md w-10 bg-[#ffd731] hover:p-[7px] transition-all ease-in-out duration-100"
          >
            <Image
              src="/plus-symbol-button.png"
              alt="Add"
              width={20}
              height={20}
            />
          </button>
        </div>
        {/* Loop through the todoList */}
        <ul className="mt-20 flex flex-col gap-4">
          {todoList.map((todo) => (
            <li
              key={todo.id}
              className="flex gap-2 items-center justify-between border-[2.5px] border-black rounded-md relative h-[43px]"
            >
              <div className="flex gap-2 items-center justify-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTodo(todo.id))}
                  style={{ width: "20px", height: "20px" }}
                  className="ml-2 mr-2"
                />
                {/* Display todo content */}
                <p className="font-bold">{todo.content}</p>
              </div>
              {/* Add a button for deleting (optional) */}
              <button
                onClick={() => {
                  dispatch(deleteTodo(todo.id));
                  toast.success("Task is deleted");
                }}
                className="text-md font-semibold bg-red-600 text-white bg-[#ffd731] p-2 transition-all ease-in-out duration-100 rounded-md border-[2.5px] border-black absolute right-[-2.5px]"
              >
                <Image src="/delete.png" width={20} height={20} alt="delete" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      {todoList[0] && (
        <button
          className="bg-red-600 font-bold p-1 mt-10 text-lg text-white border-[2.5px] border-black rounded-md w-[345px] hover:text-red-600 hover:bg-white transition-all ease-in-out duration-300 hover:font-extrabold"
          onClick={() => {
            toast.success("All tasks are deleted");
            dispatch(deleteAll());
            const todoListString = JSON.stringify(todoList);
            localStorage.setItem("todoList", todoListString);
          }}
        >
          Delete All
        </button>
      )}
    </div>
  );
}
