
import Hero from "../components/home/Hero";
import SemiAbout from "../components/home/SemiAbout";

import LazyTopSections from "@/components/home/LazyTopSections";
import LazyHomeSections from "@/components/home/LazyHomeSections";
import HomePopupServer from "@/components/home/HomePopupServer";



export default function Home() {
	

	return (
		<>
			<HomePopupServer />
			<main>
				<Hero />
				<SemiAbout />
				<LazyTopSections />
				<LazyHomeSections />
			</main>
		</>
	);
}
