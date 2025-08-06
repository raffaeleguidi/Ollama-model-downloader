import fetch from 'node-fetch';

import { HttpsProxyAgent } from 'https-proxy-agent';
// import { stream } from 'stream/promises';

import fs from 'fs';

function proxyAgent(){
    return (process.env.HTTPS_PROXY || process.env.https_proxy ? new HttpsProxyAgent(process.env.HTTPS_PROXY || process.env.https_proxy) : undefined)
}

 

const downloadJson = async (what) => {
    const response = await fetch(what, {
        method: 'GET',
        "agent": proxyAgent(),
    });

    try {
        return await response.json();
    } catch (error) {
        console.log("apiCall error", what, response.status, response.statusText)
        return [];
    }
}

const downloadBlob = (async (url, fileName) => {
    const res = await fetch(url, {
        method: 'GET',
        "redirect": "follow",
        "agent": proxyAgent(),
    });

    const buffer = await res.buffer();
    fs.writeFileSync(fileName, buffer);
});


// import crypto from 'crypto';

// async function computeHash(filepath) {
//   const input = fs.createReadStream(filepath);
//   const hash = crypto.createHash('sha256');

//   // Connect the output of the `input` stream to the input of `hash`
//   // and let Node.js do the streaming
//   await stream.pipeline(input, hash);
//   return hash.digest('hex');
// }

const modelName = process.argv[2];
const version = process.argv[3];

const manifestUrl = `https://registry.ollama.ai/v2/library/${modelName}/manifests/${version}`;

const main = async () => {
    console.log(new Date(), `Ollama Model Downloader v0.1beta`)
    console.log(new Date(), `Downloading ${modelName}:${version}`)
    const manifest = await downloadJson(manifestUrl);

    try { fs.mkdirSync(`./models/manifests/registry.ollama.ai/library/${modelName}`);} catch (ex) {}
    fs.writeFileSync(`./models/manifests/registry.ollama.ai/library/${modelName}/${version}`, JSON.stringify(manifest))

    console.log(new Date(), "Manifest for", modelName +":" + version, "saved in", `./models/manifests/registry.ollama.ai/library/${modelName}/${version}`)
    console.log(new Date(), manifest)

 
    for (const layer of manifest.layers) {
        const fileName = `./models/blobs/sha256-${layer.digest.split(':')[1]}`;
        const fileUrl = `https://registry.ollama.ai/v2/library/${modelName}/blobs/${layer.digest}`;

        console.log(new Date(), `Downloading ${fileUrl}... (${Math.round(layer.size / 1024) } kb)`);
        await downloadBlob(fileUrl, fileName);
        console.log(new Date(), `Saved in ${fileName}`);
    }
    console.log(new Date(), `Done`);
}

main()


