function loadFile(filename) {
  if (!filename) {
    return;
  }

  window.electron.loadFile(filename);

  window.electron.useData((data) => {
    console.log(data);
    document.getElementById("main").innerHTML = data.contents;
  });
}

function openFile() {
  window.electron.openFile();

  window.electron.useFile((data) => loadFile(data.filename));
}

function closeApp() {
  window.electron.closeApp();
}
