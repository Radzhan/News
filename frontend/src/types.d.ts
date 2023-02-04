export interface PostApi {
    id: string;
    title: string;
    text: string;
    image: File | null;
    date: string;
}

export interface Post{
    author: string;
    id: string;
    text: string;
}

export interface PostComment{
    author: string;
    post_id: string;
    text: string;
}


export interface Comment{
    title: string;
    text: string;
    image: File | null;
}



