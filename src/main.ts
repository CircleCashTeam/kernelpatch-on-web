import 'mdui/mdui.css'
import 'mdui'
import { Button, ButtonIcon, Card, dialog, Icon, ListItem, observeResize, Tab, TextField } from 'mdui'
import { alert } from 'mdui'
import { setColorScheme } from 'mdui/functions/setColorScheme.js'
import '@xterm/xterm/css/xterm.css'
import { Terminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'

setColorScheme('#63A002')

const aboutButton = document.querySelector<ButtonIcon>('[name=aboutButton]')
const addModuleButton = document.querySelector<Button>('#addModuleButton')
const moduleContainer = document.querySelector<HTMLDivElement>('#module-container')
const uploadBootImageButton = document.querySelector<Button>('#uploadBtn')
const patchButton = document.querySelector<Button>('#patchBtn')
const bootImgInput = document.querySelector<HTMLInputElement>('#bootImg')
const kpmInput = document.querySelector<HTMLInputElement>('#kpm')
const logTab = document.querySelector<Tab>('#log-tab')

if (aboutButton) {
  aboutButton.addEventListener('click', () => {
    dialog({
      closeOnOverlayClick: true,
      headline: "About this page",
      description: "This page written by affggh from CircleCashTeam",
      body: /*html*/`
        <div style="display: flex; flex-direction: column; gap: 10px">
          <mdui-card style="padding: 10px; width:100%;" href="https://github.com/affggh" target="_blank">
            <div class="pa-5" style="display: flex; flex-direction: row; align-items: center;">
              <mdui-avatar src="https://avatars.githubusercontent.com/u/46290091?v=4"></mdui-avatar>
              <p style="height:100%; padding-left: 20px">affggh</p>
              <div style="flex-grow:1;"></div>
              <div style="display: flex; padding-right:10px; align-items: center; height: 100%;">
                <mdui-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3h-7z" fill="currentColor"></path></svg>
                </mdui-icon>
              </div>
            </div>
          </mdui-card>

          <mdui-card style="padding: 10px; width:100%;" href="https://github.com/CircleCashTeam" target="_blank">
            <div class="pa-5" style="display: flex; flex-direction: row; align-items: center;">
              <mdui-avatar src="https://avatars.githubusercontent.com/u/191680867?v=4"></mdui-avatar>
              <p style="height:100%; padding-left: 20px">CircleCashTeam</p>
              <div style="flex-grow:1;"></div>
              <div style="display: flex; padding-right:10px; align-items: center; height: 100%;">
                <mdui-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3h-7z" fill="currentColor"></path></svg>
                </mdui-icon>
              </div>
            </div>
          </mdui-card>

          <mdui-card style="padding: 10px; width:100%;" href="https://www.mdui.org/" target="_blank">
            <div class="pa-5" style="display: flex; flex-direction: row; align-items: center;">
              <mdui-avatar>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><style>.b{fill:#1967d2;}.b,.c{stroke-width:0px;}.c{fill:#fff;}</style></defs><circle class="b" cx="20" cy="20" r="18"/><path class="c" d="m21.49,13.56h4.36c1.02,0,1.94.16,2.75.47.81.31,1.51.75,2.09,1.32.58.57,1.02,1.25,1.32,2.04s.46,1.66.46,2.61-.15,1.84-.46,2.63-.75,1.47-1.32,2.03c-.58.56-1.27,1-2.09,1.31-.82.31-1.73.47-2.75.47h-4.36v-12.89Zm4.25,10.58c.71,0,1.33-.1,1.87-.3.54-.2.99-.48,1.35-.84.36-.36.63-.79.81-1.3.18-.51.27-1.08.27-1.7s-.09-1.19-.27-1.7c-.18-.51-.45-.94-.81-1.31-.36-.36-.81-.64-1.35-.84-.54-.2-1.16-.3-1.87-.3h-1.82v8.28h1.82Z"/><path class="c" d="m7.26,13.56h2.39l3.94,6.82h.14l3.94-6.82h2.41v12.89h-2.41v-6.35l.14-2.16h-.14l-3.28,5.78h-1.46l-3.29-5.78h-.14l.14,2.16v6.35h-2.39v-12.89Z"/></svg>
              </mdui-avatar>
              <p style="height:100%; padding-left: 20px">MDUI</p>
              <div style="flex-grow:1;"></div>
              <div style="display: flex; padding-right:10px; align-items: center; height: 100%;">
                <mdui-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3h-7z" fill="currentColor"></path></svg>
                </mdui-icon>
              </div>
            </div>
          </mdui-card>
        </div>
      `,
      actions: [
        {
          text: "OK",
          onClick: () => {
            return true
          },
        }
      ]
    });
  });
}

function genModuleContainerItem(module: KernelPatchModule) {
  const container = new Card()
  container.style = "width: 100%;"
  const listItem = new ListItem()
  listItem.nonclickable = true
  listItem.textContent = module.name
  const button = new ButtonIcon()
  button.addEventListener('click', () => {
    dialog({
      headline: "About",
      body: `
<mdui-list">
  <mdui-list-item headline="Name" description="${module.name}"></mdui-list-item>
  <mdui-list-item headline="Version" description="${module.version}"></mdui-list-item>
  <mdui-list-item headline="License" description="${module.license}"></mdui-list-item>
  <mdui-list-item headline="Author" description="${module.author}"></mdui-list-item>
  <mdui-list-item headline="Description" description="${module.description}"></mdui-list-item>
</mdui-list>
`,
      actions: [
        {
          text: "OK",
          onClick: () => {
            return true
          }
        }
      ]
    })
  })
  const icon = new Icon()
  icon.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z" fill="currentColor"></path></svg>
  `
  button.appendChild(icon)
  button.slot = "icon"
  listItem.appendChild(button)

  const delButton = new ButtonIcon()
  delButton.slot = "end-icon"
  delButton.variant = "filled"
  const delIcon = new Icon()
  delIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 24 24">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                fill="currentColor"></path>
            </svg>
  `
  delButton.appendChild(delIcon)
  delButton.addEventListener('click', () => {
    moduleList = moduleList.filter(mod => mod.id !== module.id)
    if (moduleContainer) {
      moduleContainer.innerHTML = ``
      for (let i = 0; i < moduleList.length; i++) {
        moduleContainer.appendChild(genModuleContainerItem(moduleList[i]))
      }
    }
  })
  listItem.appendChild(delButton)

  container.appendChild(listItem)

  return container
}

interface KpmInfo {
  name?: string;
  version?: string;
  license?: string;
  author?: string;
  description?: string;
}

export class KernelPatchModule {
  id: number
  name: string = 'unknow'
  version: string = 'unknow'
  license: string = 'unknow'
  author: string = 'unknow'
  description: string = ''

  file: File

  constructor(id: number, info: KpmInfo, file: File) {
    this.id = id
    this.name = info.name ?? "unknow"
    this.version = info.version ?? "unknow"
    this.license = info.license ?? "unknow"
    this.author = info.author ?? "unknow"
    this.description = info.description ?? ""
    this.file = file
  }

  get() {
    return {
      id: this.id,
      info: {
        name: this.name,
        version: this.version,
        license: this.license,
        author: this.author,
        description: this.description
      },
      file: this.file
    }
  }
}

let moduleId = 0
let moduleList: KernelPatchModule[] = []
if (addModuleButton) {
  addModuleButton.addEventListener('click', () => {
    document.querySelector<HTMLInputElement>('#kpm')?.click()
  })
}

if (kpmInput) {
  kpmInput.addEventListener('change', async (e) => {
    const target = e.target as HTMLInputElement | null;
    if (!target) return;

    const files = target.files;
    if (!files) return;

    term.writeln('\x1b[33mWarn: This is no check for kpms, please ensure upload is kernelpatch module.\x1b[0m');

    // @ts-ignore
    const Module: any = await kptools({
      print: (msg: string) => { printLog(INFO, msg); },
      printErr: (msg: string) => { printLog(ERROR, msg); },
      noInitialRun: true
    });

    const promises: Promise<void>[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      printLog(INFO, "Upload module:", file.name);
      printLog(INFO, "Upload module size:", file.size, "bytes");

      promises.push(new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          const result = e.target?.result as ArrayBuffer | null;
          if (result) {
            try {
              Module.FS.writeFile(`/home/web_user/${file.name}`, new Uint8Array(result));
              const info = Module.getKpmInfo(`/home/web_user/${file.name}`) as KpmInfo;
              var skip_module = false
              moduleList.forEach((v) => {
                if (v.name === info.name) {
                  skip_module = true
                }
              })
              if (!skip_module) { // avoid same name module
                moduleList.push(new KernelPatchModule(moduleId++, info, file));
              }
              resolve();
            } catch (err) {
              reject(err);
            }
          } else {
            reject(new Error("FileReader result is null"));
          }
        };

        reader.onerror = (e) => reject(e);

        reader.readAsArrayBuffer(file);
      }));
    }

    try {
      await Promise.all(promises);
      if (moduleContainer) {
        console.log("Append module")
        moduleContainer.innerHTML = ''

        for (let i = 0; i < moduleList.length; i++) {
          console.log(moduleList[i])
          moduleContainer.appendChild(genModuleContainerItem(moduleList[i]))
        }
      }
      kpmInput.value = '' // clean input
    } catch (err) {
      printLog(ERROR, "文件处理出错:", err);
    }
  });
}

const body = document.querySelector<HTMLBodyElement>("body")!
const term = new Terminal({
  fontFamily: "'Cascadia Code', 'Consolas', 'Courier New', monospace",
  fontSize: 14,
  letterSpacing: 0,
  theme: {
    background: `rgb(${getComputedStyle(body)
      .getPropertyValue("--mdui-color-surface-variant")
      .trim()})`,
    foreground: `rgb(${getComputedStyle(body)
      .getPropertyValue("--mdui-color-on-surface-variant")
      .trim()})`,
  },
  scrollOnUserInput: true,
})

if (uploadBootImageButton) {
  uploadBootImageButton.addEventListener('click', () => {
    bootImgInput?.click()
  })
}

if (bootImgInput) {
  bootImgInput.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement | null
    const result = target?.files
    if (!result || result.length === 0) {
      if (patchButton) {
        patchButton.disabled = true
      }
      return
    }

    if (result) {
      const file = result[0]
      const reader = new FileReader()

      reader.onload = (e) => {
        const result = e.target?.result as ArrayBuffer
        if (result) {
          const magic = result.slice(0, 8)
          const tdecoder = new TextDecoder('ascii')
          if (tdecoder.decode(magic) == 'ANDROID!') {
            term.writeln('Boot image upload successed!')
            term.writeln('Upload file name: ' + file.name)
            term.writeln('File size(bytes): ' + file.size.toString())
            if (patchButton) {
              patchButton.disabled = false
            }
          } else {
            term.writeln('Boot image upload failed, magic is not android boot image.')
            bootImgInput.files = null // clean
          }
        }
      }

      reader.onerror = (e) => {
        term.writeln('\x1b[33mError: ' + e.target?.result?.toString() + '\x1b[0m')
      }

      reader.readAsArrayBuffer(file)
    }
  })
}

function downloadArrayBuffer(arrayBuffer: ArrayBuffer, filename: string, mimeType: string = 'application/octet-stream') {
  const blob = new Blob([arrayBuffer], { type: mimeType });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

var isPasswordValid = false;
if (patchButton) {
  patchButton.addEventListener('click', () => {
    const div = document.createElement('div')
    div.style = "max-width: 300px;"
    const passwordField = new TextField()
    passwordField.label = "Password"
    passwordField.type = 'password'
    passwordField.togglePassword = true
    passwordField.maxlength = 20
    passwordField.counter = true
    passwordField.clearable = true
    div.appendChild(passwordField)

    passwordField.addEventListener('input', (ev) => {
      const target = ev.target as TextField | null
      if (target) {
        const value = target.value
        if (value.length == 0) {
          passwordField.helper = ""
          isPasswordValid = false
          return
        }

        const hasLetter = /[a-zA-Z]/.test(value);
        const hasNumber = /\d/.test(value);

        if (hasLetter && hasNumber && value.length > 7) {
          isPasswordValid = true
          passwordField.helper = ""
          return
        }

        isPasswordValid = false
        passwordField.helper = "Must contain both letters and numbers, at least 8 characters long."
      }
    })

    var doPatch = false

    dialog({
      headline: "Please set a password",
      description: "It is nesseary to set a password for security.",
      body: div,
      onClose: () => {
        isPasswordValid = false; // reset
      },
      onClosed: () => {
        if (doPatch) {
          const worker = new Worker(new URL('./worker.ts', import.meta.url), {
            type: 'classic'
          })

          worker.onmessage = (e) => {
            const data = e.data
            const act = data.act
            const status = data.status
            if (act) {
              switch (act) {
                case 'print':
                  term.writeln(data.message)
                  break
                case 'printErr':
                  term.writeln(data.message)
                  break
              }
            } else {

              if (status) {
                printLog(SUCCESS, data.message)
                downloadArrayBuffer(data.newBootImage, 'new-boot.img')
              } else {
                printLog(ERROR, data.message)
              }
            }
          }

          worker.onerror = (e) => {
            printLog(ERROR, e.message)
          }

          if (logTab) {
            logTab.click()
          }
          worker.postMessage({
            bootImg: bootImgInput!.files![0], // FIXME: disable patch button before upload boot image
            superkey: passwordField.value,
            kpms: moduleList,
          })
        }
      },
      actions: [
        {
          text: 'Cancel'
        },
        {
          text: 'Submit',
          onClick: () => {
            if (isPasswordValid) {
              doPatch = true
              return true
            }
            alert({
              headline: "Invalid",
              description: "Your password is invalid, please check."
            })
            return false
          },
        },

      ]
    })
  })
}

const fitAddon = new FitAddon()

term.loadAddon(fitAddon)
term.open(document.getElementById('terminal-container')!)

document.getElementById('log-tab')?.addEventListener('click', () => {
  setTimeout(() => {
    fitAddon.fit()
  }, 50);
})

term.writeln("\x1b[32mKernelPatch on WEB by affggh from \x1b[33mCircleCashTeam\x1b[0m")

observeResize(document.getElementById('terminal-container-tab')!, () => {
  fitAddon.fit()
})

const INFO = 0
const WARN = 1
const ERROR = 2
const SUCCESS = 3

function printLog(logtype: number, ...msg: any[]) {
  var color: string
  switch (logtype) {
    case INFO:
      color = '\x1b[34mINFO: '
      break
    case WARN:
      color = '\x1b[33mWARN: '
      break
    case ERROR:
      color = '\x1b[31mERROR: '
      break
    case SUCCESS:
      color = '\x1b[32mSUCCESS: '
      break
    default:
      color = '\x1b[36mLOG: '
      break
  }

  term.writeln(`${color}${msg.join(' ')}\x1b[0m`)
}