import { DownloadButtons } from "./DownloadButtons";

export const HeroSection = () => {
	return (
		<section className="relative w-full lg:h-screen overflow-hidden bg-cover bg-center bg-[url('/banner_2.png')]">
			<div className="relative z-10 w-full h-full px-4 sm:px-6 md:px-10 lg:px-[66px] py-6 sm:py-8 md:py-10 lg:py-[57px] flex items-center">
				<div className="flex flex-col md:flex-row justify-center lg:justify-between gap-5 w-full">
					<div
						className="flex flex-col justify-center items-center
 my-auto">
						<div className="font-semibold ">
							<h1 className="text-white text-3xl md:text-5xl lg:text-6xl text-wrap">
								استمتع بتجربة الواقع
							</h1>
							<h1 className="text-white text-3xl md:text-5xl lg:text-6xl text-wrap mt-6">
								المعزز في تطبيق مزار
							</h1>
							<br />
						</div>
						<DownloadButtons />
					</div>
					<div className=" w-[100%] md:w-[40%] lg:w-[30%] relative flex justify-center items-center">
						<div class="w-[250px] h-[510px] bg-black rounded-[2.5rem] border-[6px] border-gray-900 shadow-lg relative flex flex-col items-center justify-start overflow-hidden">
							<iframe
								className="absolute top-0 left-0 w-full h-full"
								src="https://www.youtube.com/embed/frw4Z53HxGc" // Replace with your video ID
								allow="accelerometer;clipboard-write;  gyroscope; picture-in-picture"
								allowFullScreen
								title="Embedded YouTube Video"></iframe>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
