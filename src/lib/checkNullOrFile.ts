export function checkNullOrFile(v: FormDataEntryValue | null, fieldName = 'value') {
	if (v == null) {
		throw new TypeError(`${fieldName} should not be empty`);
	}
	if (v instanceof File) {
		throw new TypeError(`${fieldName} should not be a file`);
	}
	return v;
}
