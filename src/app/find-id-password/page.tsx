import { Suspense } from 'react'
import FindIdPassword from './_component/FindIdPassword'

const page = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<FindIdPassword />
		</Suspense>
	)
}

export default page