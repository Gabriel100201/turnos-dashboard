// eslint-disable-next-line import/no-anonymous-default-export
export default {
  api: {
    input: './swagger.yaml',
    output: {
      target: './src/api/generated.ts',
      schemas: './src/api/schemas',
      client: {
        name: 'axios',
        customImport: 'import api from "@/api/axios"',
        override: {
          mutator: {
            path: './src/api/axios.ts',
            name: 'api'
          }
        }
      }
    },
  },
}