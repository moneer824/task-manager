const PRIORITY_OPTIONS = [
  { value: "all", label: "All" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const PRIORITY_COLORS = {
  high: {
    theme: "red",
    borderColor: "#f8d7da",
    backgroundColor: "#fff0f1",
  },
  medium: {
    theme: "#00a5d8",
    borderColor: "#b3edff",
    backgroundColor: "#e8faff",
  },
  low: {
    theme: "#009b5f",
    borderColor: "#009b5f40",
    backgroundColor: "#effffa",
  },
  High: {
    theme: "red",
    borderColor: "#f8d7da",
    backgroundColor: "#fff0f1",
  },
  Medium: {
    theme: "#00a5d8",
    borderColor: "#b3edff",
    backgroundColor: "#e8faff",
  },
  Low: {
    theme: "#009b5f",
    borderColor: "#009b5f40",
    backgroundColor: "#effffa",
  },
  all: {
    theme: "#009b5f",
    borderColor: "#009b5f40",
    backgroundColor: "#effffa",
  },
}

export { PRIORITY_OPTIONS, PRIORITY_COLORS };