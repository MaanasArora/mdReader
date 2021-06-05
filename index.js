const path = require("path");
const fs = require("fs");
const { app, ipcMain, BrowserWindow } = require("electron");
const showdown = require("showdown");

function createWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    width: 800,
    height: 600,
  });

  win.loadFile("index.html");
}

ipcMain.on("load-file", function (event, filename) {
  let mdContents;
  let focusedWindow = BrowserWindow.getFocusedWindow();

  fs.readFile(filename, "utf8", function (err, data) {
    if (err) return console.log(err);
    mdContents = data;

    let converter = new showdown.Converter();
    const htmlContents = converter.makeHtml(mdContents);

    event.reply("file-data", { filename: filename, contents: htmlContents });
  });
});

app.whenReady().then(() => {
  createWindow();
});
