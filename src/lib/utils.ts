import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function slug(
	str: string,
	{
		removeLeadingNumberAndHyphen,
	}: { removeLeadingNumberAndHyphen?: boolean } = {},
) {
	const result = str
		.toLowerCase()
		.normalize('NFD') // Decompose combined characters (é → e + ´)
		.replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks (accents)
		.replace(/[^\w\s-]/g, '') // Remove non-word characters except spaces and hyphens
		.trim()
		.replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
		.replace(/-+/g, '-') // Collapse multiple hyphens
		.replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens

	if (removeLeadingNumberAndHyphen) return result.replace(/^\d+-/, '')

	return result
}

export function count(
	arr: any[] | number,
	singular: string = 'item',
	plural?: string,
) {
	const n = typeof arr === 'number' ? arr : (arr?.length ?? 0)
	return `${n || 0} ${n === 1 ? singular : plural || singular + 's'}`
}

export function debounce<T extends (...args: any[]) => void>(
	func: T,
	delay: number = 1000, // 1 sec
): (...args: Parameters<T>) => void {
	let timeoutId: NodeJS.Timeout | null = null

	return function (this: any, ...args: Parameters<T>) {
		if (timeoutId) {
			clearTimeout(timeoutId)
		}

		timeoutId = setTimeout(() => {
			func.apply(this, args)
		}, delay)
	}
}

export function getBlockText(
	block?: {
		children?: {
			text: string
		}[]
	}[],
	lineBreakChar: string = '↵ ',
) {
	return (
		block?.reduce((a, c, i) => {
			const text = c.children?.flatMap((c) => c.text).join('') || ''
			return a + text + (i !== block.length - 1 ? lineBreakChar : '')
		}, '') || ''
	)
}
