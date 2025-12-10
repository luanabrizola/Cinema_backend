import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,        
    port: process.env.EMAIL_PORT,       
    secure: process.env.EMAIL_SECURE === "true", 
    auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS     
    }
});

// Função para enviar e-mails
export async function enviarEmail(destinatario, assunto, mensagem) {
    try {
        await transporter.sendMail({
            from: `"Cinema AJL" <${process.env.EMAIL_USER}>`,
            to: destinatario,                                
            subject: assunto,                                
            text: mensagem,                                
            html: `<p>${mensagem.replace(/\n/g, "<br>")}</p>`
        });
        console.log(`Email enviado para ${destinatario}`);
    } catch (error) {
        console.error("Erro ao enviar email:", error);
        throw new Error("Não foi possível enviar o email.");
    }
}
