// This file is web_extra.cc call function
async function getIKConfig(module, file) {
    const array = await file.arrayBuffer();
    const u8 = new Uint8Array(array);

    const ptr = module._malloc(u8.length);
    module.HEAPU8.set(u8, ptr);
    try {
        return {
            success: true,
            content: module.getIKConfig(ptr, u8.length),
        }
    } finally {
        module._free(ptr);
    }
}

async function getKpmInfo(module, file) {
    const array = await file.arrayBuffer();
    const u8 = new Uint8Array(array);

    const ptr = module._malloc(u8.length);
    module.HEAPU8.set(u8, ptr);
    try {
        return {
            success: true,
            content: module.getKpmInfo(ptr, u8.length),
        };
    } finally {
        module._free(ptr);
    }
}

async function getVersion(module) {
    return module.getVersion();
}