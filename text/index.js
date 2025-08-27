const fullBtn = document.getElementById("full-btn");
const chunkBtn = document.getElementById("chunk-btn");
const container = document.getElementById("container");
const totalLength = document.getElementById("length");
fullBtn.addEventListener("click", async () => {
  let res = await fetch("http://localhost:8081/full_data");
  res = await res.text();
  container.textContent = res;
  totalLength.textContent = res.length;
});

chunkBtn.addEventListener("click", async () => {
  let res = await fetch("http://localhost:8081/chunk_data");
  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let result = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const newElement = document.createElement("span");
    let decodedString = decoder.decode(value, { stream: true });
    newElement.textContent = decodedString;
    container.appendChild(newElement);
    result += decodedString;
    totalLength.textContent = result.length;
  }
  console.log("Stream ended");
});
