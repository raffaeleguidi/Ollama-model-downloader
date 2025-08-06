import fetch from 'node-fetch';
import download from 'download';

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

import {HttpsProxyAgent as HP} from 'hpagent';


const downloadBlob = (async (url, fileName) => {
    const stream = download(url, process.env.https_proxy ? {
        agent: {
            https: new HP({
                proxy: process.env.https_proxy
            })
        }
    } : {});

    stream.on('data', (chunk) => {
        totalSize -= chunk.length;
    });
    stream.on('downloadProgress', (progress) => {
        const percent = Math.round(progress.percent * 100);
        if (percent > 0 && (percent % 10 === 0 && percent !== stream._lastLoggedPercent)) {
            // console.log(new Date(), `progress for ${url}: ${Math.round(progress.percent * 100)}%`);
            // if (progress == 100) console.log(new Date(), 'completed')
            console.log(new Date(), `${Math.round(totalSize / 1024 / 1024)} mb left`);
            stream._lastLoggedPercent = percent;
        }
        if (percent === 100) {
            if (totalFiles >= 0)console.log(new Date(), (--totalFiles), "blobs to go");
        }
    });

    stream.pipe(fs.createWriteStream(fileName));

    // const res = await fetch(url, {
    //     method: 'GET',
    //     "redirect": "follow",
    //     "agent": proxyAgent(),
    // });

    // const buffer = await res.buffer();
    // fs.writeFileSync(fileName, buffer);
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

let totalSize = 0;
let totalFiles = 0;

const main = async () => {
    console.log(new Date(), `Ollama Model Downloader v0.1beta`)
    console.log(new Date(), `Downloading ${modelName}:${version}`)
    const manifest = await downloadJson(manifestUrl);

    try { fs.mkdirSync(`./models/manifests/registry.ollama.ai/library/${modelName}`);} catch (ex) {}
    fs.writeFileSync(`./models/manifests/registry.ollama.ai/library/${modelName}/${version}`, JSON.stringify(manifest))

    console.log(new Date(), "Manifest for", modelName +":" + version, "saved in", `./models/manifests/registry.ollama.ai/library/${modelName}/${version}`)
    console.log(new Date(), manifest)

    totalFiles = manifest.layers.length;
     console.log(new Date(), `${totalFiles} blobs to download`);
    for (const layer of manifest.layers) {
        totalSize += layer.size;
        const fileName = `./models/blobs/sha256-${layer.digest.split(':')[1]}`;
        const fileUrl = `https://registry.ollama.ai/v2/library/${modelName}/blobs/${layer.digest}`;

        // console.log(new Date(), `Downloading ${fileUrl}... (${Math.round(layer.size / 1024) } kb)`);
        await downloadBlob(fileUrl, fileName);
        // console.log(new Date(), `Saved in ${fileName}`);
    }
}

main()


