"use strict"

const http = require("http")

exports.handler = async (event, context) => {
    const res = await once(http.get("http://lorempixel.com/300/300/"), "response")
    const chunks = []
    let size = 0

    function receive(buf) {
        size += buf.length
        chunks.push(buf)
    }

    res.on("data", receive)

    try {
        await once(res, "end")
    } finally {
        res.removeListener("data", receive)
    }

    return {
        statusCode: res.statusCode,
        headers: {
            "cache-control": "no-cache, no-store",
            "access-control-allow-origin": "*",
            "access-control-expose-headers": "access-control-allow-origin",
            "content-type": res.headers["content-type"],
        },
        isBase64Encoded: true,
        body: Buffer.concat(chunks, size).toString("base64"),
    }
}

function once(emitter, event) {
    return new Promise((resolve, reject) => {
        function pass(arg) {
            emitter.removeListener("error", fail)
            resolve(arg)
        }
        function fail(arg) {
            emitter.removeListener(event, fail)
            reject(arg)
        }
        emitter.once(event, pass)
        emitter.once("error", fail)
    })
}
