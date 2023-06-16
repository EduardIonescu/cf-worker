import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Post() {
	console.log("asd");
	const [post, setPost] = useState({});

	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		const getPost = async () => {
			const res = await fetch(`/api/post/${id}`);
			const postRes = await res.json();
			setPost(postRes);
		};
		getPost();
	}, [id]);

	if (!Object.keys(post).length) return <div />;

	return (
		<div>
			<h1>{post.title}</h1>

			<p>{post.text}</p>
			<p>
				<em>
					Published {new Date(post.published_at).toLocaleString()}
				</em>
			</p>
			<p>
				<Link href="/">Go back</Link>
			</p>
		</div>
	);
}
