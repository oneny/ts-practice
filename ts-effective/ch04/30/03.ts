// null과 null이 아닌 값을 섞어서 사용하면 클래스에서도 문제가 생긴다.
// 사용자와 그 사용자의 포럼 게시글을 나타내는 클래스를 가정
interface UserInfo {
  name: string;
}

interface Post {
  post: string;
}

declare function fetchUser(userId: string): Promise<UserInfo>
declare function fetchPostsForUser(userId: string): Promise<Post[]>

class UserPosts {
  user: UserInfo | null;
  posts: Post[] | null;

  constructor() {
    this.user = null;
    this.posts = null;
  }

  async init(userId: string) {
    // 두 번의 네트워크 요청이 로드되는 동안 user와 posts 속성은 null 상태이다.
    // 어떤 시점에는 둘 다 null이거나, 둘 중 하나만 null이거나, 둘 다 null이 아닐 것이다.
    // 총 네 가지 경우가 존재한다.
    // 결국 null 체크가 난무하고 버그를 양산하게 된다.
    return Promise.all([
      async () => (this.user = await fetchUser(userId)),
      async () => (this.posts = await fetchPostsForUser(userId))
    ]);
  }

  getUserName() {
    // ... ?
  }
}

export default {}