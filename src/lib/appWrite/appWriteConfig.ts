import { Account, Avatars, Client, Databases, Storage } from 'appwrite';

export const appwriteConfig = {
  url: import.meta.env.VITE_AW_URL,
  projectId: import.meta.env.VITE_AW_PROJECT_ID,
  databaseId: import.meta.env.VITE_AW_DATABASE_ID,
  storageId: import.meta.env.VITE_AW_STORAGE_ID,
  userCollectionId: import.meta.env.VITE_AW_USER_COLLECTION_ID,
  postCollectionId: import.meta.env.VITE_AW_POST_COLLECTION_ID,
  savesCollectionId: import.meta.env.VITE_AW_SAVES_COLLECTION_ID,
};
export const client = new Client();

client.setEndpoint(appwriteConfig.url).setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

export { ID } from 'appwrite';
