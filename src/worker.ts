// worker.ts
/// <reference lib="webworker" />

interface KpmInfo {
  name?: string;
  version?: string;
  license?: string;
  author?: string;
  description?: string;
}

class KernelPatchModule {
  id: number;
  name: string = 'unknown';
  version: string = 'unknown';
  license: string = 'unknown';
  author: string = 'unknown';
  description: string = '';
  file: File;

  constructor(id: number, info: KpmInfo, file: File) {
    this.id = id;
    this.name = info.name ?? "unknown";
    this.version = info.version ?? "unknown";
    this.license = info.license ?? "unknown";
    this.author = info.author ?? "unknown";
    this.description = info.description ?? "";
    this.file = file;
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
    };
  }
}

declare global {
  interface Window {
    kptools: any;
    magiskboot: any;
  }
}

self.addEventListener('message', async (e: MessageEvent) => {
  const data = e.data;

  const print = (msg: string) => {
    self.postMessage({
      act: 'print',
      message: msg
    });
  };

  const printErr = (msg: string) => {
    self.postMessage({
      act: 'printErr',
      message: msg
    });
  };

  try {
    const bootImg = data.bootImg as File;
    const kpms = data.kpms as KernelPatchModule[];
    const superkey = data.superkey as string;

    print('Use superkey: ' + superkey);

    print('Loading external scripts...');
    (self as any).importScripts('/kptools.js', '/magiskboot.js');

    if (typeof (self as any).kptools !== 'function' || typeof (self as any).magiskboot !== 'function') {
      throw new Error('kptools or magiskboot modules not found');
    }

    print('Initializing modules...');

    const module1 = await (self as any).magiskboot({
      print: print,
      printErr: printErr,
      noInitialRun: true,
      locateFile: (path: string) => {
        if (path.endsWith('.wasm')) {
          return `/${path}`;
        }
        return path;
      }
    });

    const module2 = await (self as any).kptools({
      print: print,
      printErr: printErr,
      noInitialRun: true,
      locateFile: (path: string) => {
        if (path.endsWith('.wasm')) {
          return `/${path}`;
        }
        return path;
      }
    });



    if (module2.PROXYFS && module1.FS) {
      module2.FS.mount(
        module2.PROXYFS,
        {
          root: "/home/web_user",
          fs: module1.FS
        },
        "/home/web_user"
      );
    }

    module1.FS.chdir('/home/web_user');
    const bootImgBuffer = new Uint8Array(await bootImg.arrayBuffer());
    module1.FS.writeFile('/home/web_user/boot.img', bootImgBuffer);

    try {
      const kpimgResponse = await fetch('/kpimg-android');
      if (kpimgResponse.ok) {
        const kpimgBuffer = new Uint8Array(await kpimgResponse.arrayBuffer());
        module1.FS.writeFile('/home/web_user/kpimg-android', kpimgBuffer);
        print('- kpimg-android loaded successfully');
      } else {
        printErr('- Failed to load kpimg-android: ' + kpimgResponse.status);
      }
    } catch (fetchError) {
      printErr('- Error fetching kpimg-android: ' + (fetchError as Error).message);
    }

    var continue_patch = true
    const kpmWritePromises = kpms.map(async (kpm) => {
      try {
        const arrayBuffer = await kpm.file.arrayBuffer();
        module1.FS.writeFile(`/home/web_user/${kpm.name}.kpm`, new Uint8Array(arrayBuffer));
        print(`- Written kpm file: ${kpm.name}.kpm`);
      } catch (writeError) {
        printErr(`- Failed to write ${kpm.name}.kpm: ${(writeError as Error).message}`);
        continue_patch = false
      }
    });

    if (!continue_patch) {
      return
    }

    await Promise.all(kpmWritePromises);

    print('- Unpacking boot image...');
    const unpackResult = module1.callMain(['unpack', '/home/web_user/boot.img']);
    print(`- Unpack result: ${unpackResult}`);

    if (module1.FS.analyzePath('/home/web_user/kernel').exists) {
      module1.FS.rename('/home/web_user/kernel', '/home/web_user/kernel.bak')
    } else {
      printErr('- Could not found kernel file from boot image.')
      return
    }

    const kpmCommands = kpms.flatMap(m => [
      '-M', `/home/web_user/${m.name}.kpm`,
      '-V', 'pre-kernel-init',
      '-T', 'kpm'
    ])
    const patchCommands = [
      '-p',
      '-i', '/home/web_user/kernel.bak',
      '-s', superkey,
      '-k', '/home/web_user/kpimg-android',
      '-o', '/home/web_user/kernel',
      ...kpmCommands
    ]
    print('- Patch with command:' + patchCommands.join(' '))
    // patch
    const patchResult = module2.callMain(patchCommands)
    print(`- Patch result: ${patchResult}`)

    try {
      const kernelExists = module1.FS.analyzePath('/home/web_user/kernel').exists;
      if (!kernelExists) {
        throw new Error("Boot image seems not to contain kernel!");
      }
      print('Kernel found in boot image');
    } catch (analyzeError) {
      self.postMessage({
        status: false,
        message: "Boot image seems not to contain kernel!",
        error: (analyzeError as Error).message
      });
      return;
    }

    // 重新打包 boot image
    print('Repacking boot image...');
    const repackResult = module1.callMain(['repack', '/home/web_user/boot.img']);
    print(`Repack result: ${repackResult}`);

    // 检查新的 boot image 是否存在
    try {
      const newBootExists = module1.FS.analyzePath('/home/web_user/new-boot.img').exists;
      if (!newBootExists) {
        throw new Error("Repack failed - new-boot.img not found");
      }

      // 读取新的 boot image
      const newBootData = module1.FS.readFile('/home/web_user/new-boot.img');

      self.postMessage({
        status: true,
        message: "Successfully repacked boot image",
        newBootImage: newBootData.buffer
      });

    } catch (error) {
      self.postMessage({
        status: false,
        message: "Repack failed via magiskboot",
        error: (error as Error).message
      });
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    printErr('Unhandled error: ' + errorMessage);

    self.postMessage({
      status: false,
      message: "Unexpected error occurred",
      error: errorMessage
    });
  }
});