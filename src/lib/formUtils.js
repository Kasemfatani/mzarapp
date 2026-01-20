export function scrollToFirstError(errors) {
	// errors: react-hook-form errors object
	if (!errors) return;
	const keys = Object.keys(errors);
	if (!keys.length) return;

	// Find all error elements in the DOM
	const errorElements = [];

	for (const key of keys) {
		const selectors = [
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
			firstEl.focus();
		} catch (e) {}
	} else {
		// fallback to top
		window.scrollTo({ top: 0, behavior: "smooth" });
	}
}

export function handleInvalidForm(form, errors) {
	// prefer react-hook-form setFocus (handles nested fields/dot paths)
	console.log("handleInvalidForm errors:", errors);
	try {
		if (form?.setFocus) {
			const k = Object.keys(errors)[0];
			console.log("first error key:", k);
			console.log("errors:", errors);
			if (k) form.setFocus(k);
		}
	} catch (e) {}
	// then DOM scroll/focus fallback
	scrollToFirstError(errors);
}
