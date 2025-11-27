import { registerAs } from "@nestjs/config";


export default ()=> ({
    port: 3000,
    db: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        type: process.env.DATABASE_TYPE as 'mariadb' | 'postgres'|'mysql',
        synchronize: process.env.DATABASE_SYNCHRONIZE
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN
    },
    frontendUrl: process.env.FRONTEND_URL,
    allowedMethods: process.env.ALLOWED_METHODS
});