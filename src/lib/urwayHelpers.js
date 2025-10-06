import crypto from "crypto";

/**
 * Generate URWAY request hash.
 * NOTE: Exact concatenation order may differ based on URWAY latest docs.
 * Common pattern (legacy examples): SHA256(terminalId|password|trackId|amount|currency|merchantKey)
 * Adjust the join order if your sandbox rejects with hash mismatch.
 */
export function buildUrwayRequestHash({
	terminalId,
	password,
	trackId,
	amount,
	currency,
	merchantKey,
}) {
	const base = `${trackId}|${terminalId}|${password}|${merchantKey}|${amount}|${currency}`;
  // console.log(`[Urway Hash Base 1]`, base);
	return crypto.createHash("sha256").update(base, "utf8").digest("hex");
}

/**
 * Generate URWAY response hash (if they send back hash fields to validate).
 * Placeholder: keep same order. Confirm with docs and adjust.
 */
export function buildUrwayResponseHash({
	terminalId,
	password,
	trackId,
	amount,
	currency,
	merchantKey,
}) {
	const base = `${trackId}|${terminalId}|${password}|${merchantKey}|${amount}|${currency}`;
	return crypto.createHash("sha256").update(base, "utf8").digest("hex");
}

export function isUrwaySuccess(resp) {
	const code = (
		resp?.responseCode ||
		resp?.ResponseCode ||
		resp?.code ||
		""
	).toString();
	const result = (resp?.result || resp?.Result || "").toString().toUpperCase();
	if (code === "000") return true; // typical success code
	if (result.includes("CAPTURED") || result.includes("SUCCESS")) return true;
	return false;
}
