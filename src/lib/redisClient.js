// Lightweight Redis client wrapper for server route handlers
// Uses ioredis and a singleton to avoid creating multiple connections in dev.
// Ensure you set REDIS_URL in your environment (e.g. rediss://default:password@host:port)

import Redis from "ioredis";

// ---- Redis Singleton Strategy ----
// In Next.js (especially on Vercel) each serverless invocation can create a fresh
// JS context. Within a warm container though, globals persist. In dev mode, HMR
// can re-run module code causing multiple clients unless we pin a global ref.
// We store the instance on globalThis to survive reloads & avoid exceeding the
// Redis Cloud connection cap.

// Using a symbol-like property name to avoid collisions.
const GLOBAL_KEY = "__MZARAPP_REDIS_CLIENT__";
const GLOBAL_CREATED_FLAG = "__MZARAPP_REDIS_CLIENT_CREATED__";

function createClient() {
	const url = process.env.REDIS_URL;
	if (!url) throw new Error("REDIS_URL env var is not set");
	const client = new Redis(url, {
		lazyConnect: true, // connect only when first command is issued
		enableAutoPipelining: true,
		maxRetriesPerRequest: 3,
		retryStrategy: (times) => Math.min(times * 50, 2000),
	});
	client.on("error", (err) => {
		// Log once per error type to avoid noise
		if (process.env.NODE_ENV !== "production") {
			console.warn("[Redis] error", err?.message);
		}
	});
	return client;
}

// Reuse existing or create new
const globalAny = globalThis;
if (!globalAny[GLOBAL_KEY]) {
	globalAny[GLOBAL_KEY] = createClient();
	globalAny[GLOBAL_CREATED_FLAG] = Date.now();
	if (process.env.NODE_ENV !== "production") {
		console.log("[Redis] New client instance created (dev hot reload safe)");
	}
}

let redisInstance = globalAny[GLOBAL_KEY];

export function getRedis() {
	return redisInstance;
}

export async function setJson(key, value, ttlSeconds) {
	const redis = getRedis();
	const json = JSON.stringify(value);
	if (ttlSeconds) {
		await redis.set(key, json, "EX", ttlSeconds);
	} else {
		await redis.set(key, json);
	}
}

export async function getJson(key) {
	const redis = getRedis();
	const data = await redis.get(key);
	if (!data) return null;
	try {
		return JSON.parse(data);
	} catch (e) {
		return null;
	}
}

export async function delKey(key) {
	const redis = getRedis();
	await redis.del(key);
}

// Optional graceful close (not for serverless runtime; useful in scripts/tests)
export async function closeRedis() {
	if (redisInstance) {
		try {
			await redisInstance.quit();
		} catch (_) {}
	}
}
