import Link from "next/link";
const formInput = {
	lastName: "testo",
	firstName: "hero",
	email: "test@test.de",
	phone: "",
	subject: "hara",
	message: "harahara",
};
export default function Home() {
	const sendEmail = async () => {
		console.log("tried sending");
		const res = await fetch("api/send-email", {
			body: JSON.stringify(formInput),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		});
		const { message } = await res.json();
		if (message) {
			console.log(message);
			return;
		}
	};
	return (
		<main className="w-screen h-screen flex items-center flex-col justify-center">
			<Link href="/posts">Posts</Link>
			<button onClick={sendEmail} className="text-red-500 text-3xl">
				Send Email
			</button>
		</main>
	);
}
