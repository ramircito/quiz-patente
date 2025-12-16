
export enum Language {
    EN = 'en',
    IT = 'it',
    ES = 'es',
    FR = 'fr',
}

export class Settings {
    darkMode: boolean;
    language: string;

    constructor(
        darkMode: boolean = false,
        language: string = Language.EN,
    ) {
        this.darkMode = darkMode;
        this.language = language;
    }
}