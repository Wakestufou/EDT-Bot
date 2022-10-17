declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
            TOKEN_DEV: string;
            APP_ID: string;
            APP_ID_DEV: string;
            GUILD_DEV: string;
            URL_ICS: string;
            CHANNEL_ID_DEV: string;
            CHANNEL_ID: string;
        }
    }
}

export {};
