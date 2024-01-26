/**
 * Function to fix numbers by replacing Persian and Arabic digits with their Latin equivalents
 */
export function fixNumbers(num: any): string {
    
    let persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
    let arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

    if (typeof num === 'string') {
        for (let i = 0; i < 10; i++) {
            num = num.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
    }

    return num.toString();

}

/**
 * Generates a two-factor authentication (2FA) code with expiration time.
 */
export function generate2FASCode(expirationMinutes: number) {

    const code = Math.floor((Math.random() * 9000) + 1000).toString();

    const expTime = new Date(new Date().getTime() + expirationMinutes * 60000);

    return {
        code,
        expTime
    };
}
