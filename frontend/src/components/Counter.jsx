import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <p>
      <button
        className="button-para"
        type="button"
        onClick={() => setCount((oldCount) => oldCount + 1)}
      >
        <p>count is: {count}</p>
      </button>
    </p>
  );
}
