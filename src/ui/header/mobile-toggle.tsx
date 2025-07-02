export default function () {
	return (
		<label className="[grid-area:toggle] md:hidden">
			<input id="header-open" type="checkbox" hidden />

			<span className="header-open:hidden">Open</span>
			<span className="header-not-open:hidden">Close</span>
		</label>
	)
}
