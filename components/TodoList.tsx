"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { RootState } from "@/lib/store";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, toggleTodo } from "@/lib/features/todo/todoSlice";

export function TodoList() {
  const [content, setContent] = useState<string>();
  const todoList = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();

  const AddTodo = (content: string) : any => {
    if (content == "") return;
    dispatch(addTodo(content));
    content = "";
  };

  return (
    <div className="flex flex-col items-center justify h-full">
      <h2 className="text-5xl font-extrabold mt-0 flex-start mt-[30px]">
        Todo <span className="font-semibold text-[#ffd731]">List</span>
      </h2>
      <div className="mt-[60px]">
        <div className="flex gap-2 items-center justify-center">
          <input
            type="text"
            placeholder="Enter the Task..."
            onChange={(e) => setContent(e.target.value)}
            className="border-[2.5px] border-black rounded-md h-10 w-[300px] pl-2"
          />
          <button
            onClick={() => AddTodo(content || "")}
            className="border-[2.5px] border-black p-[8px] rounded-md w-10 bg-[#ffd731] hover:p-[7px] transition-all ease-in-out duration-100"
          >
            <Image
              src="/plus-symbol-button.png"
              alt="Add"
              width={22}
              height={22}
            />
          </button>
        </div>
        {/* Loop through the todoList */}
        <ul>
          {todoList.map((todo) => (
            <li
              key={todo.id}
              className="flex gap-2 items-center justify-between border-2 border-black"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
                style={{ width: "18px", height: "18px" }}
              />
              {/* Display todo content */}
              <p>{todo.content}</p>
              {/* Add a button for deleting (optional) */}
              <button
                onClick={() => dispatch(deleteTodo(todo.id))}
                className="text-md font-semibold bg-red-600 text-white p-2 rounded-md"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
