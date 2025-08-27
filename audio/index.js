const inp = document.getElementById("audioInp");

inp.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  const fileSize = file.size;
  const fileName = file.name;
  const chunkSize = 512 * 1024; // 500kb per chunk
  const totalChunks = Math.ceil(fileSize / chunkSize);

  for (let i = 0; i < totalChunks; i++) {
    let start = i * chunkSize;
    let end = start + chunkSize;
    let chunk = file.slice(start, end);
    let formData = new FormData();
    formData.append("test", chunk);
    formData.append("fileName", fileName);
    formData.append("index", i);
    await fetch("http://localhost:8082/upload", {
      method: "POST",
      body: formData,
    });
  }
});
