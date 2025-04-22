// eslint-disable-next-line import/no-anonymous-default-export
export default {
  api: {
    input: './swagger.yaml',
    output: {
      target: './src/api/generated.ts',
      schemas: './src/api/schemas',
      client: 'axios',
      baseUrl: 'http://localhost:5000/api/v1',
    },
    override: {
      mutator: {
        path: './src/api/api.axios.ts',
        name: 'api',
      },
      operations: {
        default: {
          mutator: {
            path: './src/api/api.axios.ts',
            name: 'api',
          },
        },
      },
    },
  },
};
