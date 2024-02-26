import { Tag } from "../Tag";

export type Post = {
  title: string;
  content: string;
  dateCreated?: Date;
  category?: string;
  tags: Tag[];
};
