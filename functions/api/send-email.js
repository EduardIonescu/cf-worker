import "node:assert";
import "node:crypto";
import "node:util";
import "node:events";
import "node:http";
import "node:https";
import "node:buffer";
import "node:tls";
import "node:net";
import "node:url";
import "node:stream";
import "node:zlib";
import "node:querystring";
import "node:fs";
import "node:path";

import SibApiV3Sdk from "@sendinblue/client";

export async function onRequestPost({ request }) {
	const contentType = request.headers.get("content-type");
	if (!contentType.includes("application/json")) {
		return new Response("Illegal Content Type", { status: 422 });
	}

	const data = await request.json();
	const { lastName, firstName, email, phone, subject, message } = data;

	const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
	apiInstance.setApiKey(
		SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
		process.env.SENDINBLUE_API_KEY
	);

	let emailStatus;
	const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
	sendSmtpEmail.htmlContent = `<p>
	Last name: ${lastName} <br/>
	First name: ${firstName}<br/>
	Email: ${email}<br/>
	Phone: ${phone || "None"}<br/>
	Message: ${message}
	</p>`;
	sendSmtpEmail.subject = subject || "No subject";
	sendSmtpEmail.sender = { email: "noreply@deepsign.de" };
	sendSmtpEmail.to = [{ email: "eduardionescu23@gmail.com" }];

	apiInstance
		.sendTransacEmail(sendSmtpEmail)
		.then(() => {
			emailSent = true;
		})
		.catch((err) => {
			emailStatus = err;
		});

	if (emailSent === true) {
		return new Response(JSON.stringify({ message: "success" }), {
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
		});
	} else {
		console.log(emailStatus);
		return new Response(JSON.stringify({ message: "email error" }), {
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			status: 500,
		});
	}
}
