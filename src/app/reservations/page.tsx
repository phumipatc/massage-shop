import ReservationList from "@/components/ReservationList";
import UserDashboard from "@/components/UserDashboard";

export default function reservations() {

	return (
		<div className="mt-28">
			<UserDashboard />
			<ReservationList />
		</div>
	);
}