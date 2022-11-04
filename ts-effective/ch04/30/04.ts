// 필요한 데이터가 모두 준비된 후에 클래스를 만들도록 바꾸기
interface UserInfo {
  name: string;
}

interface Post {
  post: string;
}

declare function fetchUser(userId: string): Promise<UserInfo>
declare function fetchPostsForUser(userId: string): Promise<Post[]>

// UserPosts는 완전히 null이 아니게 되었고, 메서드를 작성하기 쉬워졌다.
// 물론 이 경우에도 데이터가 부분적으로 준비되었을 때 작업을 시작해야 한다면,
// null과 null이 아닌 경우의 상태를 다루어야 한다.
class UserPosts {
  user: UserInfo;
  posts: Post[];

  constructor(user: UserInfo, posts: Post[]) {
    this.user = user;
    this.posts = posts;
  }

  static async init(userId: string): Promise<UserPosts> {
    const [user, posts] = await Promise.all([
      fetchUser(userId),
      fetchPostsForUser(userId)
    ]);

    return new UserPosts(user, posts);
  }

  getUserName() {
    return this.user.name;
  }
}

export default {};