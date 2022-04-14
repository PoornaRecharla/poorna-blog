import { auth, db, storage } from "../firebase-config";
import { doc, getDocs, onSnapshot } from "firebase/firestore";

export const allPosts = async () => {
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
}

export const getPost = async (id) => {
    const post = await getDocs(
        query(
            doc(db, "posts", id),
        )
    ).then(
        res => res.docs.map(
            doc => doc.data()
        )
    );
    return post;
}

export const getUserPosts = async (id) => {
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
}

export const getPostsByDate = async (date) => {
    const posts = await getDocs(
        query(
            collection(db, "posts"),
            where("deleted", "==", false),
            where("timestamp", ">" , date),
            orderBy("timestamp", "desc"),
        )
    ).then(
        res => res.docs.map(
            doc => doc.data()
        )
    );
    return posts;
}

export const getUserPostsByPage = async (id, page, postsPerPage) => {
    const posts = await getDocs(
        query(
            collection(db, "posts"),
            where("deleted", "==", false),
            where("author.id", "==", id),
            orderBy("timestamp", "desc"),
            limit(postsPerPage),
            startAfter(page * postsPerPage),
        )
    ).then(
        res => res.docs.map(
            doc => doc.data()
        )
    );
    return posts;
}

export const getUserPostsByPageAndSearch = async (id, page, postsPerPage, search) => {
    const posts = await getDocs(
        query(
            collection(db, "posts"),
            where("deleted", "==", false),
            where("author.id", "==", id),
            orderBy("timestamp", "desc"),
            limit(postsPerPage),
            startAfter(page * postsPerPage),
            where("title", "==", search),
        )
    ).then(
        res => res.docs.map(
            doc => doc.data()
        )
    );
    return posts;
}

export const getUserPostsByPageAndSearchAndCategory = async (id, page, postsPerPage, search, category) => {
    const posts = await getDocs(
        query(
            collection(db, "posts"),
            where("deleted", "==", false),
            where("author.id", "==", id),
            orderBy("timestamp", "desc"),
            limit(postsPerPage),
            startAfter(page * postsPerPage),
            where("title", "==", search),
            where("category", "==", category),
        )
    ).then(
        res => res.docs.map(
            doc => doc.data()
        )
    );
    return posts;
}

export const getUserPostsByPageAndSearchAndCategoryAndTag = async (id, page, postsPerPage, search, category, tag) => {
    const posts = await getDocs(
        query(
            collection(db, "posts"),
            where("deleted", "==", false),
            where("author.id", "==", id),
            orderBy("timestamp", "desc"),
            limit(postsPerPage),
            startAfter(page * postsPerPage),
            where("title", "==", search),
            where("category", "==", category),
            where("tags", "array-contains", tag),
        )
    ).then(
        res => res.docs.map(
            doc => doc.data()
        )
    );
    return posts;
}

export const getUserPostsByPageAndSearchAndCategoryAndTagAndAuthor = async (id, page, postsPerPage, search, category, tag, author) => {
    const posts = await getDocs(
        query(
            collection(db, "posts"),
            where("deleted", "==", false),
            where("author.id", "==", id),
            orderBy("timestamp", "desc"),
            limit(postsPerPage),
            startAfter(page * postsPerPage),
            where("title", "==", search),
            where("category", "==", category),
            where("tags", "array-contains", tag),
            where("author.id", "==", author),
        )
    ).then(
        res => res.docs.map(
            doc => doc.data()
        )
    );
    return posts;
}

export const getUserPostsByPageAndSearchAndCategoryAndTagAndAuthorAndDate = async (id, page, postsPerPage, search, category, tag, author, date) => {
    const posts = await getDocs(
        query(
            collection(db, "posts"),
            where("deleted", "==", false),
            where("author.id", "==", id),
            orderBy("timestamp", "desc"),
            limit(postsPerPage),
            startAfter(page * postsPerPage),
            where("title", "==", search),
            where("category", "==", category),
            where("tags", "array-contains", tag),
            where("author.id", "==", author),
            where("date", "==", date),
        )
    ).then(
        res => res.docs.map(
            doc => doc.data()
        )
    );
    return posts;
}