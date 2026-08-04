"use strict";

self.onmessage = async ({ data }) => {
    const bytes = new TextEncoder().encode(data.payload);
    const digestBuffer = await crypto.subtle.digest("SHA-256", bytes);
    const digest = Array.from(new Uint8Array(digestBuffer), (byte) => byte.toString(16).padStart(2, "0")).join("");
    self.postMessage({
        ok: typeof data.expected === "string" && data.expected.toLowerCase() === digest,
        algorithm: "SHA-256 pinned fixture integrity / Web Worker",
        digest,
        bytes: bytes.byteLength
    });
};
