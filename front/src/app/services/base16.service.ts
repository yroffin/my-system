import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Base16Service {

    constructor() { }

    ascii_to_u8a(str: string): Uint8Array {
        const result = new Uint8Array(str.length).map(
            (_, i) => str.codePointAt(i) ?? 0
        );
        return result;
    }

    u8a_to_hex(u8a: Uint8Array) {
        let string = "";

        for (const byte of u8a) {
            string += byte.toString(16).padStart(2, "0");
        }
        return string;
    }

    hex_to_u8a(str: string): Uint8Array {
        if (str.length % 2) throw new Error("odd string length");
        const result = new Uint8Array(str.length / 2);

        for (let index = 0; index < result.length; index++) {
            const hex = str.slice(index * 2, index * 2 + 2);
            result[index] = parseInt(hex, 16);
        }
        return result;
    }

    u8a_to_ascii(u8a: Uint8Array) {
        let string = "";

        for (const byte of u8a) {
            string += String.fromCharCode(byte);
        }
        return string;
    }

    encode(value: string) {
        return this.u8a_to_hex(this.ascii_to_u8a(value))
    }

    decode(value: string) {
        return this.u8a_to_ascii(this.hex_to_u8a(value))
    }
}