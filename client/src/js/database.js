import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const jatedb = await openDB('jate', 1);
  const tx = jatedb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.add({content: content});
  await request;
}

export const getDb = async () => {
  const jatedb = await openDB('jate', 1);
  const tx = jatedb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  result.length === 0 ? undefined : result[result.length - 1].content;
};

initdb();
