---
title: suno-api
date: 2024-04-19 09:20:02
tags: ai
---

> 从远处看，每个人都显得格外善良。——李璐璐

这个项目

https://github.com/gcui-art/suno-api/

可以用 API 调用 suno.ai 的音乐生成 AI，并且可以轻松集成到 GPTs 等 agent 中

文档：

https://suno.gcui.art/

#### 本地运行

[](https://github.com/gcui-art/suno-api/blob/main/README_CN.md#%E6%9C%AC%E5%9C%B0%E8%BF%90%E8%A1%8C)

```shell
git clone https://github.com/gcui-art/suno-api.git
cd suno-apinpm install
```

或者，你也可以使用 [Docker Compose](https://docs.docker.com/compose/)

```shell
docker compose build && docker compose up
```

### 3. 配置 suno-api

[](https://github.com/gcui-art/suno-api/blob/main/README_CN.md#3-%E9%85%8D%E7%BD%AE-suno-api)

- 如果部署到了 Vercel，请在 Vercel 后台，添加环境变量 `SUNO_COOKIE`，值为第一步获取的 cookie。
- 如果在本地运行，请在 .env 文件中添加：

```shell
SUNO_COOKIE=<your-cookie>
```

### 4. 运行 suno api

[](https://github.com/gcui-art/suno-api/blob/main/README_CN.md#4-%E8%BF%90%E8%A1%8C-suno-api)

- 如果部署到了 Vercel：
  - 请在 Vercel 后台，点击 `Deploy`，等待部署成功。
  - 访问 `https://<vercel分配的域名>/api/get_limit` API 进行测试
- 如果在本地运行：
  - 请运行 `npm run dev`
  - 访问 `http://localhost:3000/api/get_limit` API 进行测试
- 如果返回以下结果：

```json
{  "credits_left": 0,  "period": "string",  "monthly_limit": 0,  "monthly_usage": 0
}
```

则已经正常运行。

### 5. 使用 Suno API

[](https://github.com/gcui-art/suno-api/blob/main/README_CN.md#5-%E4%BD%BF%E7%94%A8-suno-api)

你可以在 [suno.gcui.art](https://suno.gcui.art/docs)查看详细的 API 文档，并在线测试。

## API 说明

[](https://github.com/gcui-art/suno-api/blob/main/README_CN.md#api-%E8%AF%B4%E6%98%8E)

Suno API 目前主要实现了以下 API:

```shell
- `/api/generate`: 创建音乐- `/v1/chat/completions`: 创建音乐 - 用OpenAI API 兼容的格式调用 generate API- `/api/custom_generate`: 创建音乐（自定义模式，支持设置歌词、音乐风格、设置标题等）- `/api/generate_lyrics`: 根据Prompt创建歌词- `/api/get`: 根据id获取音乐信息。获取多个请用","分隔，不传ids则返回所有音乐- `/api/get_limit`: 获取配额信息
```

详细文档请查看演示站点: [suno.gcui.art/docs](https://suno.gcui.art/docs)

## API 集成代码示例

[](https://github.com/gcui-art/suno-api/blob/main/README_CN.md#api-%E9%9B%86%E6%88%90%E4%BB%A3%E7%A0%81%E7%A4%BA%E4%BE%8B)

### Python

[](https://github.com/gcui-art/suno-api/blob/main/README_CN.md#python)

```python
import time
import requests

# replace your vercel domain
base_url = 'http://localhost:3000'


def custom_generate_audio(payload):    url = f"{base_url}/api/custom_generate"
    response = requests.post(url, json=payload, headers={'Content-Type': 'application/json'})    return response.json()


def generate_audio_by_prompt(payload):    url = f"{base_url}/api/generate"
    response = requests.post(url, json=payload, headers={'Content-Type': 'application/json'})    return response.json()


def get_audio_information(audio_ids):    url = f"{base_url}/api/get?ids={audio_ids}"
    response = requests.get(url)    return response.json()


def get_quota_information():    url = f"{base_url}/api/get_limit"
    response = requests.get(url)    return response.json()


if __name__ == '__main__':    data = generate_audio_by_prompt({        "prompt": "A popular heavy metal song about war, sung by a deep-voiced male singer, slowly and melodiously. The lyrics depict the sorrow of people after the war.",        "make_instrumental": False,        "wait_audio": False
    })    ids = f"{data[0]['id']},{data[1]['id']}"
    print(f"ids: {ids}")    for _ in range(60):        data = get_audio_information(ids)        if data[0]["status"] == 'streaming':            print(f"{data[0]['id']} ==> {data[0]['audio_url']}")            print(f"{data[1]['id']} ==> {data[1]['audio_url']}")            break
        # sleep 5s
        time.sleep(5)
```

### Js

[](https://github.com/gcui-art/suno-api/blob/main/README_CN.md#js)

```js
const axios = require("axios");

// replace your vercel domain
const baseUrl = "http://localhost:3000";

async function customGenerateAudio(payload) {
  const url = `${baseUrl}/api/custom_generate`;
  const response = await axios.post(url, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

async function generateAudioByPrompt(payload) {
  const url = `${baseUrl}/api/generate`;
  const response = await axios.post(url, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

async function getAudioInformation(audioIds) {
  const url = `${baseUrl}/api/get?ids=${audioIds}`;
  const response = await axios.get(url);
  return response.data;
}

async function getQuotaInformation() {
  const url = `${baseUrl}/api/get_limit`;
  const response = await axios.get(url);
  return response.data;
}

async function main() {
  const data = await generateAudioByPrompt({
    prompt:      "A popular heavy metal song about war, sung by a deep-voiced male singer, slowly and melodiously. The lyrics depict the sorrow of people after the war.",
    make_instrumental: false,
    wait_audio: false,
  });

  const ids = `${data[0].id},${data[1].id}`;
  console.log(`ids: ${ids}`);

  for (let i = 0; i < 60; i++) {
    const data = await getAudioInformation(ids);
    if (data[0].status === "streaming") {
      console.log(`${data[0].id} ==> ${data[0].audio_url}`);
      console.log(`${data[1].id} ==> ${data[1].audio_url}`);
      break;
    }
    // sleep 5s
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}

main();
```
