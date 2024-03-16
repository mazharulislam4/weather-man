import { currentHandlerState } from "@/lib/ui";
import { hookstate } from "@hookstate/core";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { dbFireStore } from "./firebase";
/**
 * @typedef ChatData
 * @type {array}
 * @property {string} role - an user role
 * @property {string} content - content
 */

export const firestoreState = hookstate({ firestore: {} });


export const createHandlerDocRef = (handler) => {
  if (!handler) {
    throw new Error({ error: true, msg: "handler must need!" });
  }
  const docRef = collection(dbFireStore, "chats", "conversation", handler);
  firestoreState.set({ firestore: { docRef: docRef, handler: handler } });
  return docRef;
};

/**
 *
 * @param {string} handlerRef - a firestore doc ref
 * @param {ChatData} param1 - data to store [{role: string , content: string}]
 */

// add data on the handler doc
export const addData = async (docRef, data = [], user) => {
  if (!docRef) {
    throw new Error({ error: true, msg: "handlerRef must need!" });
  }

  if (!user) {
    throw new Error({ error: true, msg: "user must need!" });
  }

  if (!docRef?.docRef && docRef?.handler) {
    docRef.docRef = collection(
      dbFireStore,
      "chats",
      "conversation",
      docRef?.handler
    );
  }

  if (data?.length === 0) {
    throw new Error({
      error: true,
      msg: "Role and Content must need in an array of object",
    });
  }

  try {
    const userInput = data.find((value) => value.role === "user");

    const handlerList = await getSidebarAllData(user.uid);
    const handler = handlerList.find(
      (value) => value.handler === docRef.handler
    );

    // sidebar doc
    if (!handler) {
      const res = await addDoc(collection(dbFireStore, "sidebar"), {
        handler: docRef.handler,
        title: userInput?.content?.substring(0, 15) || "new chat",
        timestamp: serverTimestamp(),
        uid: user.uid,
      });

      //  get realtime sidebar and add to global state  handler data
      onSnapshot(doc(dbFireStore, "sidebar", res.id), (doc) => {
        // set data to global
        currentHandlerState.set({ handler: doc.data() });
      });
    }

    //   message data
    await addDoc(docRef.docRef, {
      message: [...data],
      timestamp: serverTimestamp(),
      uid: user.uid,
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};

// get all data by handler
export const getDataByHandler = async (handler, userUid) => {
  if (!handler) {
    throw Error("handler arg must need");
  }

  if (!userUid) {
    throw Error("user arg must need");
  }

  const ref = collection(dbFireStore, "chats", "conversation", handler);

  let data = { docRef: ref, handler: handler, list: [] };
  try {
    firestoreState.set({
      firestore: { docRef: ref, handler: handler },
    });

    const res = await getDocs(query(ref, where("uid", "==", userUid)));

    res.forEach((doc) => {
      if (doc.exists()) {
        data.list.push(doc.data());
      }
    });

    return data;
  } catch (err) {
    data.isError = true;
    data.error = err;
    return data;
  }
};

// get all sidebar data
export const getSidebarAllData = async (userUid) => {
  try {
    if (!userUid) {
      throw Error("user arg must need");
    }

    const querySnapshot = await getDocs(
      query(collection(dbFireStore, "sidebar"), where("uid", "==", userUid))
    );
    const data = [];
    querySnapshot.forEach((value) => {
      data.push(value.data());
    });

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// get  a handler

export const getHandler = async (userUid, handler) => {
  try {
    if (!userUid) {
      throw Error("user arg must need");
    }
    if (!handler) {
      throw Error("handler arg must need");
    }

    const querySnapshot = await getDocs(
      query(
        collection(dbFireStore, "sidebar"),
        where("uid", "==", userUid),
        where("handler", "==", handler)
      )
    );

    let res = [];

    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        res.push(doc.data());
      }
    });

    return res;
  } catch (err) {
    throw err;
  }
};
