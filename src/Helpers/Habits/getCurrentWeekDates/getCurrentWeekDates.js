export default function getCurrentWeekDates() {
	const daysWithDates = [];
	const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

	weekdays.map((day, index) => {
		const date = new Date();
		if (index <= date.getDay()) {
			date.setDate(date.getDate() - (date.getDay() - index));
			daysWithDates.push({
				day,
				date: `${String(date).split(" ")[1]}-${String(date).split(" ")[2]}-${
					String(date).split(" ")[3]
				}`,
			});
		} else {
			date.setDate(date.getDate() + (index - date.getDay()));
			daysWithDates.push({
				day,
				date: `${String(date).split(" ")[1]}-${String(date).split(" ")[2]}-${
					String(date).split(" ")[3]
				}`,
			});
		}
	});

    return daysWithDates;
}
