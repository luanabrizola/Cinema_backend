import crypto from "crypto";

const algorithm = "aes-256-cbc";
const secretKey = process.env.CPF_SECRET_KEY;
const ivLength = 16;

export function encryptCPF(cpf) {
    const iv = crypto.randomBytes(ivLength);
    const cipher = crypto.createCipheriv(
        algorithm,
        Buffer.from(secretKey),
        iv
    );

    let encrypted = cipher.update(cpf, "utf8", "hex");
    encrypted += cipher.final("hex");

    return `${iv.toString("hex")}:${encrypted}`;
}

export function decryptCPF(cpfEncrypted) {
    const [ivHex, encrypted] = cpfEncrypted.split(":");
    const iv = Buffer.from(ivHex, "hex");

    const decipher = crypto.createDecipheriv(
        algorithm,
        Buffer.from(secretKey),
        iv
    );

    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
}
