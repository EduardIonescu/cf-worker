export async function onRequestPost({ request }: { request: any }) {
	const contentType = request.headers.get("content-type");
	if (!contentType.includes("application/json")) {
		return new Response("Illegal Content Type", { status: 422 });
	}

	const data = await request.json();
	const { lastName, firstName, email, phone, subject, message } = data;

	let emailStatus = false;

	const res = await fetch("https://api.brevo.com/v3/smtp/email", {
		method: "POST",
		headers: {
			accept: "application/json",
			"api-key":
				"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",
			"content-type": "application/json",
		},

		body: JSON.stringify({
			sender: { email: "noreply@deepsign.de", name: "Mary from MyShop" },
			to: [{ email: "eduardionescu23@gmail.com", name: "Jimmy" }],
			htmlContent:
				"<!DOCTYPE html> <html> <body> <h1>Confirm you email</h1> <p>Please confirm your email address by clicking on the link below</p> </body> </html>",
			subject: "Login Email confirmation",
		}),
	})
		.then(() => (emailStatus = true))
		.catch((err) => (emailStatus = err.message));
	const { message2 } = await res.json();
	const message3 = JSON.stringify(message2);
	if (res.ok) {
		return new Response(JSON.stringify({ message: "success" }), {
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
		});
	} else {
		console.log(emailStatus);
		return new Response(JSON.stringify({ message: message3 }), {
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			status: 500,
		});
	}
}
