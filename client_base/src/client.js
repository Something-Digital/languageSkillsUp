const host = '/api';

const commonOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const client = {
  user: {
    create: async ({ username }) => await fetch(
      `${host}/user/create`,
      {
        ...commonOptions,
        method: 'POST',
        body: JSON.stringify({
          username
        }),
      }
    ),
  },
};

export default client;
