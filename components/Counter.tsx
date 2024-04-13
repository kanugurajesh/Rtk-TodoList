"use client";

import React from "react";
import type { RootState } from "@/lib/store";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "@/lib/features/counter/counterSlice";

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex items-center justify-center gap-4">
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
          className="w-100 bg-black text-white p-2 rounded-lg hover:text-black hover:bg-white border-2 border-black transition-all ease-in-out duration-300 font-medium flex gap-2"
        >
          Increment
        </button>
        <span className="font-medium text-xl">{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
          className="w-100 bg-black text-white p-2 rounded-lg hover:text-black hover:bg-white border-2 border-black transition-all ease-in-out duration-300 font-medium"
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
