import { useCounterStore } from "../../store/count";

export default {
  name: "index",
  setup() {
    const counter = useCounterStore();
    console.log("counter", counter);

    return { increment: counter.increment, count: counter.get("count") };
  },
};
