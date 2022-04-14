import { auth, db, storage } from "../firebase-config";
import { doc, getDocs, getDoc, query, collection, where, orderBy } from "firebase/firestore";

export const queries = {
    allPosts: async () => {
        const posts = await getDocs(
            query(
                collection(db, "posts"),
                where("deleted", "==", false),
                orderBy("timestamp", "desc"),
            )
        ).then(
            res => res.docs.map(
                doc => doc.data()
            )
        );
        return posts;
    },
    getPost: async (id) => {
        const post = await getDoc(
            doc(db, "posts", id)
        ).then(
            res => res.data()
        );
        return post;
    },
    getUserPosts: async (id) => {
        const posts = await getDocs(
            query(
                collection(db, "posts"),
                where("deleted", "==", false),
                where("author.id", "==", id),
                orderBy("timestamp", "desc"),
            )
        ).then(
            res => res.docs.map(
                doc => doc.data()
            )
        );
        return posts;
    },
    getPostsByDate: async (date) => {
        const posts = await getDocs(
            query(
                collection(db, "posts"),
                where("deleted", "==", false),
                where("timestamp", ">", date),
                orderBy("timestamp", "desc"),
            )
        ).then(
            res => res.docs.map(
                doc => doc.data()
            )
        );
        return posts;
    },
    query: query(
        collection(db, "posts"),
        where("deleted", "==", false),
        orderBy("timestamp", "desc"),
    )
}
