import Link from "next/link";
import { useEffect, useState } from "react";

export default function Posts() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const getPosts = async () => {
			const res = await fetch("/api/posts");
			const postsRes = await res.json();
			setPosts(postsRes);
		};

		getPosts();
	}, []);

	return (
		<div>
			<h1 className="text-3xl">Posts</h1>

			{posts &&
				posts.map((post) => (
					<div key={post.id}>
						<h2 className="text-2xl">
							<Link href={`/posts/${post.id}`}>{post.title}</Link>
						</h2>
					</div>
				))}
		</div>
	);
}
