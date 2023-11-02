import { ID } from 'appwrite';

import { INewUser } from '@/types';
import { account, appwriteConfig, avatars, databases } from './appWriteConfig';

export const userSignUp = async (user: INewUser) => {
  try {
    const newAcc = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newAcc) throw Error;

    const avatarUrl = avatars.getInitials(user.name);
    const newUser = await saveUserToDB({
      accountId: newAcc.$id,
      name: newAcc.name,
      email: newAcc.email,
      imageUrl: avatarUrl,
      username: user.username,
    });
    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function userSignIn(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log(error);
  }
}
