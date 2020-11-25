const host = '/api';

const commonOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const client = {
  user: {
    create: async (data) => await fetch(
      `${host}/user/create`,
      {
        ...commonOptions,
        method: 'POST',
        body: JSON.stringify(data),
      }
    ),
  },
};

export default client;
