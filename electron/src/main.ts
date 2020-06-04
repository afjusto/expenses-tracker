import * as path from "path";
import { app, BrowserWindow } from "electron";
import "./channels/entity";
import "./channels/transaction";

let mainWindow: Electron.BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 1024,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(`file://${path.join(__dirname, "../ui/index.html")}`);

  if (process.argv.includes("--devtools")) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
  mainWindow.on("closed", () => (mainWindow = null));
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
