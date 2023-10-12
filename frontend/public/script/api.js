const BACKEND_URL = "http://localhost:4000";

export async function createTodo(item) {
    console.log(item)
  await fetch(`${BACKEND_URL}/item/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}
