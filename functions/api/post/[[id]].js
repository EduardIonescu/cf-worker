import posts from "./data";

export function onRequestGet(context) {
	const id = context.params.id;
	console.log(id, "asd");
	if (!id) {
		return new Response("Not Found", { status: 404 });
	}

	const post = posts.find((post) => post.id === Number(id));

	if (!post) {
		return new Response("Not Found", { status: 404 });
	}

	return Response.json(post);
}
