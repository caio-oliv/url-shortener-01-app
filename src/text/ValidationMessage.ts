export function hasInvalidChars(field: string): string {
	return field + ' has invalid characters';
}

export function minOfNChars(n: number): string {
	return 'minimum of ' + n + (n === 1 ? ' character' : ' characters');
}

export function maxOfNChars(n: number): string {
	return 'maximum of ' + n + (n === 1 ? ' character' : ' characters');
}
