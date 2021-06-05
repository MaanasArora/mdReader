const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  loadFile: (filename) => {
    ipcRenderer.send("load-file", filename);
  },
  useData: (func) => {
    ipcRenderer.on("file-data", (event, data) => func(data));
  },
});
