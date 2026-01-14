export function scrollToFirstError(errors) {
	// errors: react-hook-form errors object
	if (!errors) return;
	const keys = Object.keys(errors);
	if (!keys.length) return;
	const first = keys[0];

	// try to find common selectors (supports dot paths too)
	const selectors = [
		`[name="${first}"]`,
		`[name="${first.replace(/\./g, "][")}"]`,
		`[data-rhf="${first}"]`,
		`[data-error-for="${first}"]`,
		`[data-field="${first}"]`,
		`#${first}`,
	];

	for (const sel of selectors) {
		const el = document.querySelector(sel);
		if (el) {
			el.scrollIntoView({ behavior: "smooth", block: "center" });
			try {
				el.focus();
			} catch (e) {}
			return;
		}
	}

	// fallback to top
	window.scrollTo({ top: 0, behavior: "smooth" });
}

export function handleInvalidForm(form, errors) {
	// prefer react-hook-form setFocus (handles nested fields/dot paths)
	try {
		if (form?.setFocus) {
			const k = Object.keys(errors)[0];
			if (k) form.setFocus(k);
		}
	} catch (e) {}
	// then DOM scroll/focus fallback
	scrollToFirstError(errors);
}
