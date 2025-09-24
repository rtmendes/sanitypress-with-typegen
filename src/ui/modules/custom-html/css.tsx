'use client'

export default function CSS({ code }: { code?: string }) {
	if (!code) return null

	return (
		<style href={`custom-html-${encodeURIComponent(code)}`}>{`
			${code}
		`}</style>
	)
}
