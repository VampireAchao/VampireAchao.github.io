---
title: Apache-ShenYu支持namespace功能
date: 2024-07-22 20:28:05
tags: 前端
---

> 健康的身体是灵魂的客厅，病弱的身体是灵魂的监狱。——培根

我主要完成前端部分对接，`pr`如下：

https://github.com/apache/shenyu-dashboard/pull/462

这里主要是结合`redux-saga`完成需求，例如`modal/global.js`

[shenyu-dashboard/src/models/global.js at 624a2afe74367b5c5a310627197d3622a8c896a4 · apache/shenyu-dashboard · GitHub](https://github.com/apache/shenyu-dashboard/blob/624a2afe74367b5c5a310627197d3622a8c896a4/src/models/global.js)

```javascript
/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { message } from "antd";
import { routerRedux } from "dva/router";
import {
  queryPlatform,
  getAllPlugins,
  getNamespaceList,
  asyncOnePlugin,
  getUserPermissionByToken,
} from "../services/api";
import { getIntlContent } from "../utils/IntlUtils";

export default {
  namespace: "global",

  state: {
    collapsed: false,
    platform: {},
    plugins: [],
    currentRouter: {},
    permissions: {},
    language: "",
    namespaces: [],
    currentNamespaceId: "649330b6-c2d7-4edc-be8e-8a54df9eb385",
  },

  effects: {
    *fetchPlatform(_, { call, put }) {
      const json = yield call(queryPlatform);
      if (json.code === 200) {
        yield put({
          type: "savePlatform",
          payload: json.data,
        });
      }
    },
    *fetchNamespaces(_, { call, put }) {
      const json = yield call(getNamespaceList);
      if (json.code === 200) {
        yield put({
          type: "saveNamespaces",
          payload: json.data,
        });
      }
    },
    *fetchPlugins({ payload }, { call, put }) {
      const { callback } = payload ?? {};
      const params = {
        currentPage: 1,
        pageSize: 50,
      };
      const json = yield call(getAllPlugins, params);
      if (json.code === 200) {
        let { dataList } = json.data;

        if (callback) {
          callback(dataList);
        }
        yield put({
          type: "savePlugins",
          payload: {
            dataList,
          },
        });
      }
    },
    *asyncPlugin(params, { call }) {
      const { payload } = params;
      const json = yield call(asyncOnePlugin, payload);
      if (json.code === 200) {
        message.success(getIntlContent("SHENYU.COMMON.RESPONSE.SYNC.SUCCESS"));
      } else {
        message.warn(json.message);
      }
    },
    *fetchPermission({ payload }, { call, put }) {
      const { callback } = payload;
      let permissions = { menu: [], button: [] };
      const token = window.sessionStorage.getItem("token");
      if (token) {
        const params = { token };
        const json = yield call(getUserPermissionByToken, params);
        if (json.code === 200) {
          let { menu, currentAuth } = json.data;
          permissions = { menu, button: currentAuth };
        } else {
          message.warn(getIntlContent("SHENYU.PERMISSION.EMPTY"));
          yield put(
            routerRedux.push({
              pathname: "/user/login",
            }),
          );
        }
      }

      yield put({
        type: "savePermissions",
        payload: { permissions },
      });
      callback(permissions);
    },
    *refreshPermission({ payload }, { call, put }) {
      const { callback } = payload ?? {};
      let permissions = { menu: [], button: [] };
      const token = window.sessionStorage.getItem("token");
      if (token) {
        const params = { token };
        const json = yield call(getUserPermissionByToken, params);
        if (json.code === 200) {
          let { menu, currentAuth } = json.data;
          permissions = { menu, button: currentAuth };
        }
      }

      yield put({
        type: "savePermissions",
        payload: { permissions },
      });
      if (callback) {
        callback(permissions);
      }
    },

    *resetPermission(_, { put }) {
      let permissions = { menu: [], button: [] };
      yield put({
        type: "savePermissions",
        payload: { permissions },
      });
    },
  },

  reducers: {
    changeLanguage(state, { payload }) {
      return {
        ...state,
        language: payload,
      };
    },
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    savePlatform(state, { payload }) {
      return {
        ...state,
        platform: payload,
      };
    },
    saveNamespaces(state, { payload }) {
      return {
        ...state,
        namespaces: payload,
      };
    },
    saveCurrentNamespaceId(state, { payload }) {
      return {
        ...state,
        currentNamespaceId: payload,
      };
    },
    savePlugins(state, { payload }) {
      return {
        ...state,
        plugins: payload.dataList,
      };
    },
    saveCurrentRoutr(state, { payload }) {
      return {
        ...state,
        currentRouter: payload.currentRouter,
      };
    },
    savePermissions(state, { payload }) {
      return {
        ...state,
        permissions: payload.permissions,
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== "undefined") {
          window.ga("send", "pageview", pathname + search);
        }
      });
    },
  },
};
```

其他代码不多贴了
