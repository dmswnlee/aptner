import { Suspense } from "react";
import { MoonLoader } from "react-spinners";

import FindIdPassword from "./_component/FindIdPassword";

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
