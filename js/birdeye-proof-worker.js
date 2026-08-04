"use strict";

self.onmessage = async ({ data }) => {
    const bytes = new TextEncoder().encode(data.payload);
    const digestBuffer = await crypto.subtle.digest("SHA-256", bytes);
    const digest = Array.from(new Uint8Array(digestBuffer), (byte) => byte.toString(16).padStart(2, "0")).join("");
    self.postMessage({
        ok: data.expected === "fixture" && digest.length === 64,
        algorithm: "SHA-256 fixture integrity / Web Worker",
        digest
    });
};
