import LocalRepository from "../repository/LocalRepository.js";
import {jwtDecode} from "jwt-decode";

export class JwtService {
    constructor() {
        if (JwtService.instance) {
            return JwtService.instance;
        }
        this.localRepository = new LocalRepository();
        JwtService.instance = this;
    }

    /**
     * Decodifica un token JWT sin verificar la firma (solo lectura del payload)
     * @param {string} token - Token JWT
     * @returns {object|null} - Payload decodificado o null si inválido
     */
    decodeToken(token) {
        if (!token || typeof token !== 'string') return null;
        try {
            // jwt-decode lanza si no es válido; devuelve payload como objeto
            return jwtDecode(token);
        } catch (err) {
            console.error('[JwtService] Error al decodificar token:', err);
            return null;
        }
    }

    /**
     * Verifica si el token ha expirado
     * @param {string} token - Token JWT
     * @returns {boolean} - true si ha expirado, false si es válido
     */
    isTokenExpired(token) {
        const decoded = this.decodeToken(token);
        if (!decoded || !decoded.exp) {
            console.warn('[JwtService] Token sin campo exp, considerado expirado');
            return true;
        }
        const expiryTime = Number(decoded.exp) * 1000;
        const isExpired = Date.now() > expiryTime;
        if (isExpired) console.log('[JwtService] Token expirado');
        return isExpired;
    }

    /**
     * Extrae el ID del payload del token
     * @param {string} token - Token JWT
     * @returns {string|number|null} - ID extraído o null si no existe
     */
    getIdFromToken(token) {
        const decoded = this.decodeToken(token);
        if (!decoded) return null;
        console.log(decoded);
        const idField = decoded.payload.id;
        return idField || null;
    }

    /**
     * Obtiene el token del localStorage y lo limpia si ha expirado
     * @returns {string|null} - Token válido o null si expirado/no existe
     */
    getValidToken() {
        const token = this.localRepository.getFromLocalStorage('token');
        if (!token) return null;

        if (this.isTokenExpired(token)) {
            console.log('[JwtService] Limpiando token expirado');
            this.clearExpiredToken();
            return null;
        }

        return token;
    }

    /**
     * Limpia el token expirado y otros datos de sesión del localStorage
     */
    clearExpiredToken() {
        this.localRepository.removeFromLocalStorage('token');
        this.localRepository.removeFromLocalStorage('authorized');
        this.localRepository.removeFromLocalStorage('user');
        console.log('[JwtService] Token y datos de sesión eliminados');
    }

    /**
     * Obtiene el payload completo del token válido
     * @returns {object|null} - Payload decodificado o null si inválido/expirado
     */
    getTokenPayload() {
        const token = this.getValidToken();
        return token ? this.decodeToken(token) : null;
    }
    SetJwtToketInfoToLocalStorage(token){
        const payload = jwtDecode(token);
        this.localRepository.saveInLocalStorage('token', token);
        this.localRepository.saveInLocalStorage('user', payload);
        this.localRepository.saveInLocalStorage('authorized', true);
    }
}