import {
  LOCAL_STORAGE_KEY_PROFILE,
  Profile,
  ProfileLocal,
} from "@/models/Profile";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

/**
 * Generates a random UID.
 * @returns string
 */
export function generateRandomUid(): string {
  return uuidv4();
}

/**
 * Retrieves the user profile UID from local storage.
 */
export async function fetchProfileUidFromLocalStorage(): Promise<
  string | null
> {
  return new Promise((resolve) => {
    const uid = localStorage.getItem(LOCAL_STORAGE_KEY_PROFILE);
    if (uid) {
      resolve(uid);
    } else {
      resolve(null);
    }
  });
}

/**
 * Stores the user profile UID in local storage.
 * @param uid: string
 */
export async function storeProfileUidInLocalStorage(
  uid: string
): Promise<void> {
  return new Promise((resolve) => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PROFILE, uid);
    resolve();
  });
}

/**
 * Fetches the user profile from the server if available. Otherwise, returns null.
 * @returns ProfileLocal | null
 */
export async function fetchLocalProfile(): Promise<ProfileLocal | null> {
  // Step 1: Retrieve the user profile uid from local storage
  const profileUid = await fetchProfileUidFromLocalStorage();
  // Step 2: If the profile uid is not available, return null
  if (!profileUid) {
    return null;
  }
  // Step 3: Fetch the user profile from the server
  try {
    // const response = await axios.get(`/api/profile?uid=${profileUid}`);
    const response = await axios.get(`/api/profile?uid=${profileUid}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return null;
  }

  return null;
}

/**
 * Checks if the username is available.
 * @param username: string
 * @returns boolean: (true if available, false if not available)
 */
export async function checkIfUsernameIsAvailable(username: string) {
  if (username.length === 0) {
    return;
  }
  try {
    const response = await axios.get("/api/username", {
      params: { username },
    });
    if (response.status === 200) {
      return response.data.available;
    }
  } catch (error) {}
}

/**
 * Makes a POST request to create a new user profile on the server.
 * Creates a new profile on the server.
 * @param profile: Profile
 * @returns ProfileLocal | null
 */
export async function createNewProfileOnServer(
  profile: Profile
): Promise<ProfileLocal | null> {
  try {
    // query param of uid
    const response = await axios.post(
      `/api/profile`,
      {
        createdAt: profile.createdAt,
        username: profile.username,
        gender: profile.gender,
        ageGroup: profile.ageGroup,
        educationLevel: profile.educationLevel,
        employmentStatus: profile.employmentStatus,
        politicalAffiliation: profile.politicalAffiliation,
        locale: profile.locale,
        userAgent: profile.userAgent,
        screenResolution: profile.screenResolution,
        ipGeoLocation: "NA",
      },
      {
        params: {
          uid: profile.uid,
        },
      }
    );
    if (response.status === 200) {
      const createdLocalProfile = response.data as ProfileLocal;
      return createdLocalProfile;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
