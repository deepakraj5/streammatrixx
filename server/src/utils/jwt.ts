export const stringToUnit8Array = (value: string): Uint8Array => {
    const buffer = new ArrayBuffer(value.length * 2); // 2 bytes per char
    const view = new Uint8Array(buffer);
    for (let i = 0, length = value.length; i < length; i++) {
        view[i] = value.charCodeAt(i);
    }
    return view;
}