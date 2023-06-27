import { defineConfig } from 'yapi-to-typescript';

export default defineConfig([
  {
    serverUrl: 'http://yapi.sugonup.com/',
    typesOnly: false,
    target: 'typescript',
    reactHooks: {
      enabled: false
    },
    prodEnvName: 'production',
    outputFilePath: '../src/api/index.ts',
    requestFunctionFilePath: '../src/utils/http/request.ts',
    dataKey: 'data',
    getRequestFunctionName(interfaceInfo, changeCase) {
      // 去掉 path 中的ApiV1
      const path = interfaceInfo.path.replace('/api/v1', '');

      return changeCase.camelCase(`${interfaceInfo.method}_${path}`);
    },
    projects: [
      {
        token: '',
        categories: [
          {
            id: 0
          }
        ]
      }
    ]
  }
]);
