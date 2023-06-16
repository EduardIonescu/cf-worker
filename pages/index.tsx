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
		let emailStatus = false;

		const res = await fetch("https://api.brevo.com/v3/smtp/email", {
			method: "POST",
			headers: {
				accept: "application/json",
				"api-key": process.env.SENDINBLUE_API_KEY || "",
				"content-type": "application/json",
			},

			body: JSON.stringify({
				sender: {
					email: "noreply@deepsign.de",
					name: "Mary from MyShop",
				},
				to: [{ email: "eduardionescu23@gmail.com", name: "Jimmy" }],
				htmlContent:
					"<!DOCTYPE html> <html> <body> <h1>Confirm you email</h1> <p>Please confirm your email address by clicking on the link below</p> </body> </html>",
				subject: "Login Email confirmation",
			}),
		})
			.then((r) => r.json())
			.catch((err) => (emailStatus = err.message));

		console.log(res?.message ? res?.message : res?.messageId);
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
