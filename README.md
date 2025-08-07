# Ollama-model-downloader

usage:

```
ollama-model-downloader-macos llama3.2 1b
```

and then move the blobs in ./models/blobs to $HOME/.ollama/models/blobs

output:

```
raffaele@localhost>ollama-model-downloader-macos llama3.2 1b
2025-08-06T20:41:31.659Z Ollama Model Downloader v0.1beta
2025-08-06T20:41:31.664Z Downloading llama3.2:1b
2025-08-06T20:41:32.055Z Manifest for llama3.2:1b saved in ./models/manifests/registry.ollama.ai/library/llama3.2/1b
2025-08-06T20:41:32.055Z {
  schemaVersion: 2,
  mediaType: 'application/vnd.docker.distribution.manifest.v2+json',
  config: {
    mediaType: 'application/vnd.docker.container.image.v1+json',
    digest: 'sha256:4f659a1e86d7f5a33c389f7991e7224b7ee6ad0358b53437d54c02d2e1b1118d',
    size: 485
  },
  layers: [
    {
      mediaType: 'application/vnd.ollama.image.model',
      digest: 'sha256:74701a8c35f6c8d9a4b91f3f3497643001d63e0c7a84e085bed452548fa88d45',
      size: 1321082688
    },
    {
      mediaType: 'application/vnd.ollama.image.template',
      digest: 'sha256:966de95ca8a62200913e3f8bfbf84c8494536f1b94b49166851e76644e966396',
      size: 1429
    },
    {
      mediaType: 'application/vnd.ollama.image.license',
      digest: 'sha256:fcc5a6bec9daf9b561a68827b67ab6088e1dba9d1fa2a50d7bbcc8384e0a265d',
      size: 7711
    },
    {
      mediaType: 'application/vnd.ollama.image.license',
      digest: 'sha256:a70ff7e570d97baaf4e62ac6e6ad9975e04caa6d900d3742d37698494479e0cd',
      size: 6016
    }
  ]
}
2025-08-06T20:41:32.056Z 4 blobs to download
2025-08-06T20:41:32.468Z 1260 mb left
2025-08-06T20:41:32.472Z 1260 mb left
2025-08-06T20:41:32.472Z 3 blobs to go
2025-08-06T20:41:32.475Z 1260 mb left
2025-08-06T20:41:32.475Z 2 blobs to go
2025-08-06T20:41:32.503Z 1260 mb left
2025-08-06T20:41:32.503Z 1 blobs to go
2025-08-06T20:41:43.419Z 1140 mb left
2025-08-06T20:41:54.685Z 1014 mb left
2025-08-06T20:42:06.179Z 888 mb left
2025-08-06T20:42:17.648Z 762 mb left
2025-08-06T20:42:29.127Z 636 mb left
2025-08-06T20:42:40.611Z 510 mb left
2025-08-06T20:42:52.343Z 384 mb left
2025-08-06T20:43:03.857Z 258 mb left
2025-08-06T20:43:15.334Z 132 mb left
2025-08-06T20:43:26.806Z 6 mb left
2025-08-06T20:43:26.806Z 0 blobs to go
raffaele@localhost>_
```


packaged with yao-pkg:

```
npm run package

> ollama-model-downloader@1.0.0 pack
> pkg ollama-model-downloader.js

> pkg@6.6.0
> Targets not specified. Assuming:
  node22-linux-x64, node22-macos-x64, node22-win-x64
```

