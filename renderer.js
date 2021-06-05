function loadFile() {
  window.electron.loadFile("sample.md");

  window.electron.useData((data) => {
    console.log(data);
    document.getElementById("mainContainer").innerHTML = data.contents;
  });
}
