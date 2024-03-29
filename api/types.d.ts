export interface Post {
  id: number;
  title: string;
  text: string;
  image: string | null;
  date: string;
}
export interface Comment {
  id: number;
  post_id: number;
  author: string | null;
  comment: string;
}
