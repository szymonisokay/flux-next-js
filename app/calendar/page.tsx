import { ISearchParams } from '../../actions/getExercises'
import getWorkouts from '../../actions/getWorkouts'
import CalendarClient from './CalendarClient'

const CalendarPage = async ({
	searchParams,
}: {
	searchParams: ISearchParams
}) => {
	const workouts = await getWorkouts()

	return (
		<>
			<CalendarClient workouts={workouts} />
		</>
	)
}

export default CalendarPage
