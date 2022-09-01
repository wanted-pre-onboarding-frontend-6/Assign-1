export default class TokenService {
    public static set({ key, value }: { key: string; value: any }) {
        localStorage.setItem(key, value);
    }
    public static get(key: string) {
        return localStorage.getItem(key);
    }
    public static remove(key: string) {
        localStorage.removeItem(key);
    }
}
