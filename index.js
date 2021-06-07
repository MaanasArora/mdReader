const path = require("path");
const fs = require("fs");
const { app, ipcMain, BrowserWindow, dialog } = require("electron");
const showdown = require("showdown");

function createWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    width: 800,
    height: 600,
    frame: false,
  });

  win.loadFile("index.html");
}

ipcMain.on("open-file", function (event) {
  dialog
    .showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "Markdown", extensions: ["md"] }],
    })
    .then((result) =>
      event.reply("filename", { filename: result.filePaths[0] })
    );
});

ipcMain.on("load-file", function (event, filename) {
  let mdContents;

  fs.readFile(filename, "utf8", function (err, data) {
    if (err) return console.log(err);
    mdContents = data;

    let converter = new showdown.Converter();
    const htmlContents = converter.makeHtml(mdContents);

    event.reply("file-data", { filename: filename, contents: htmlContents });
  });
});

ipcMain.on("close", function (event) {
  app.quit();
});

app.whenReady().then(() => {
  createWindow();
});
