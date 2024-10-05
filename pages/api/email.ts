import { NextResponse, NextRequest } from 'next/server'
import nodemailer from 'nodemailer';
// Handles POST requests to /api


export default async function POST(request: NextRequest) {

    const username = "prabu.cybermindworks@gmail.com"
    const password = "Prabu017."
    const myEmail = "prabu.cybermindworks@gmail.com"


    const body = request.body as unknown as Record<string, string>
    const name = body['name']
    const email = body['email']
    const message = ['message']


    // create transporter object
    const transporter = nodemailer.createTransport({

        port: 587,
        auth: {

            user: username,
            pass: password
        },
        service: 'gmail',
    });

    try {

        const mail = await transporter.sendMail({
            from: username,
            to: myEmail,
            replyTo: email,
            subject: `Website activity from ${email}`,
            html: `
            <p>Name: ${name} </p>
            <p>Email: ${email} </p>
            <p>Message: ${message} </p>
            `,
        })

        console.log(mail)
        return NextResponse.json({ message: "Success: email was sent" })

    } catch (error) {
        console.log(error)
    }


}