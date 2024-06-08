import { Suspense } from "react";
import FindIdPassword from "./_component/FindIdPassword";
import { MoonLoader } from "react-spinners";

const page = () => {
	return (
		<Suspense
			fallback={
				<div>
					<MoonLoader color="#05A8FF" />
				</div>
			}>
			<FindIdPassword />
		</Suspense>
	);
};

export default page;
