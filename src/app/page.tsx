import Hero from "../components/home/Hero";
// import SemiAbout from "../components/home/SemiAbout";

import LazyTopSections from "@/components/home/LazyTopSections";
import LazyHomeSections from "@/components/home/LazyHomeSections";
// import HomePopupServer from "@/components/home/HomePopupServer";

import Trips from "@/components/home/Trips";
// import Why from "@/components/home/Why";

export default function Home() {
	return (
		<>
			{/* <HomePopupServer /> */}
			<main>
				<Hero />
				{/* <SemiAbout /> */}
				<Trips />
				{/* <Why /> */}
				<LazyTopSections />
				<LazyHomeSections />
			</main>
		</>
	);
}
