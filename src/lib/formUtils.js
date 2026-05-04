export function scrollToFirstError(errors) {
	// errors: react-hook-form errors object
	if (!errors) return;
	let keys = Object.keys(errors);
	if (!keys.length) return;

	// If there are multiple errors and the first one is 'name', move it to the end.
	// This ensures we prioritize fields like date/time/vehicle which are higher up.
	// if (keys.length > 1 && keys[0] === "name") {
	// 	keys = keys.filter((k) => k !== "name");
	// 	keys.push("name");
	// }

	// Find all error elements in the DOM
	const errorElements = [];

	for (const key of keys) {
		const selectors = [
			`#${key}`,
			`[name="${key}"]`,
			`[name="${key.replace(/\./g, "][")}"]`,
			`[data-rhf="${key}"]`,
			`[data-error-for="${key}"]`,
			`[data-field="${key}"]`,
			`#${key}`,
		];

		for (const sel of selectors) {
			const el = document.querySelector(sel);
			if (el) {
				errorElements.push(el);
				break;
			}
		}
	}

	if (errorElements.length > 0) {
		// Sort elements by their position in the DOM to find the top-most one
		// errorElements.sort((a, b) => {
		// 	if (a === b) return 0;
		// 	// compareDocumentPosition returns a bitmask.
		// 	// DOCUMENT_POSITION_FOLLOWING (4) means b follows a.
		// 	return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
		// 		? -1
		// 		: 1;
		// });

		const firstEl = errorElements[0];
		firstEl.scrollIntoView({ behavior: "smooth", block: "center" });
		try {
			// preventScroll: true ensures the browser doesn't jerk the screen after we just smoothed scrolled
			firstEl.focus({ preventScroll: true });
		} catch (e) {}
	} else {
		// fallback to top
		window.scrollTo({ top: 0, behavior: "smooth" });
	}
}

export function handleInvalidForm(form, errors) {
	// We rely solely on scrollToFirstError because it sorts by DOM position.
	// The default setFocus uses the order of keys in 'errors', which is arbitrary and causes jumping.
	scrollToFirstError(errors);
}
