import { useStore } from "zustand-q";

const TestComponent = () => {
  const [count] = useStore<number>("count", 0);

  return <div>{count}</div>;
};

export default TestComponent;
