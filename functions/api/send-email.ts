export async function onRequestPost({ request }: { request: any }) {
	const contentType = request.headers.get("content-type");
	if (!contentType.includes("application/json")) {
		return new Response("Illegal Content Type", { status: 422 });
	}

	const data = await request.json();
	const { lastName, firstName, email, phone, subject, message } = data;

	const res = await fetch("https://api.brevo.com/v3/smtp/email", {
		method: "POST",
		headers: {
			accept: "application/json",
			"api-key": process.env.SENDINBLUE_API_KEY || "",
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
		.then((r) => r.json())
		.catch((err) => console.log(err));

	if (res.messageId) {
		return new Response(JSON.stringify({ message: "success" }), {
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
		});
	} else {
		return new Response(JSON.stringify({ message: res.message }), {
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			status: 500,
		});
	}
}
