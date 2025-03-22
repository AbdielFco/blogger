export interface Card {
    post_id: number;
    title: string;
    post_date?: string;
    description: string;
    content: string;
    image: string;
    post_author_id: number;
    like_count: number;
    view_count: number;
    comment_count: number;
  }

  //
  // export interface Card {
  //   id: number;
  //   title: string;
  //   date: string;
  //   description: string;
  //   content: string;
  //   image: string;
  //   author: {
  //     id: number;
  //     email: string;
  //   };
  //   views: {
  //     id: number;
  //     author: {
  //       id: number;
  //       email: string;
  //     };
  //       date: string;
  //   }[];
  //   likes: {
  //     id: number;
  //     author: {
  //       id: number;
  //       email: string;
  //     };
  //     date: string;
  //   }[];
  //   comments: {
  //     id: number;
  //     author: {
  //       id: number;
  //       email: string;
  //     };
  //     date: string;
  //     content: string;
  //   }[];
  // }