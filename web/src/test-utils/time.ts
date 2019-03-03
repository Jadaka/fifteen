// Returns a promise which always resolves after 'timeout' miliseconds.
export const wait = async (timeout: number): Promise<undefined> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
};
