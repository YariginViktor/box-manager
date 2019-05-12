export const humanFormateDate = (date) => {
	const lead0 = (num) => {
		return num < 10 ? '0' + num : num
	}
	const d = new Date(date)
	return lead0(d.getDate()) + '.' + lead0(d.getMonth() + 1) + '.' + d.getFullYear()
}
