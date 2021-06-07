const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  openFile: (func) => {
    ipcRenderer.send("open-file");
  },
  loadFile: (filename) => {
    ipcRenderer.send("load-file", filename);
  },
  useFile: (func) => {
    ipcRenderer.on("filename", (event, data) => func(data));
  },
  useData: (func) => {
    ipcRenderer.on("file-data", (event, data) => func(data));
  },
  closeApp: () => {
    ipcRenderer.send("close");
  },
});
