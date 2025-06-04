export const HeroSection = () => {
	return (
		<section className="relative w-full  overflow-hidden bg-cover bg-center bg-[url('/Banner.png')]">
			{/* Overlay: behind content */}
			<div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>

			{/* Content wrapper: positioned above the overlay */}
			<div className="relative z-10 w-full px-[66px] py-[57px] max-md:px-5">
				<div className="flex  flex-col md:flex-row justify-center lg:justify-between  gap-5">
					<div className="flex flex-col my-auto">
						<div className="font-semibold ">
							<h1 className="text-white text-5xl md:text-5xl lg:text-6xl text-wrap">
								استمتع بتجربة الواقع المعزز في تطبيق مزار
							</h1>
							<br />
							
						</div>
						<div>
							<article className="shadow-[0px_4px_8px_-2px_rgba(17,24,39,0.10),0px_2px_4px_-2px_rgba(17,24,39,0.06)] overflow-hidden mt-[88px] p-6 rounded-[10px] border-4 border-solid border-white max-md:mt-10 max-md:px-5 inline-block">
								<div className="flex  max-w-full items-center gap-2 overflow-hidden text-2xl text-white font-bold leading-none">
									<img
										src="/bytesize_download.png"
										alt="App icon"
										className="aspect-[1] object-contain w-7 self-stretch shrink-0 my-auto"
									/>
									<h3 className="self-stretch my-auto">احصل على التطبيق</h3>
								</div>
								<div
									className="flex flex-col sm:flex-row gap-3 overflow-hidden mt-8"
									role="group"
									aria-label="Download app">
									<a
										href="https://onelink.to/yb2xky"
										className="flex w-[174px] shrink-0 h-[52px] bg-black rounded-lg items-center justify-center hover:bg-gray-800 transition-colors gap-4"
										aria-label="Get it on Google Play">
										<img src="Google_Play_logo.png" alt="" />
										<div className="flex flex-col">
											<span className="text-white text-xs font-medium">
											احصل عليه من
											</span>
											<span className="text-white text-lg font-medium">
												Google Play
											</span>
										</div>
									</a>
									<a
										href="https://onelink.to/yb2xky"
										className="flex w-[174px] shrink-0 h-[52px] bg-black rounded-lg items-center justify-center hover:bg-gray-800 transition-colors gap-4"
										aria-label="Download on the App Store">
										<img src="apple_logo.png" alt="" />
										<div className="flex flex-col">
											<span className="text-white text-xs font-medium">
												حمله من
											</span>
											<span className="text-white text-lg font-medium">
												App Store
											</span>
										</div>
									</a>
								</div>
							</article>
						</div>
					</div>
					<div className=" w-[50%] mx-auto md:mx-0 md:w-[40%] lg:w-[30%] relative">
						<img src="Phone_11.png" alt="" className="w-full" />
						<h1 className="absolute  text-black text-xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-center w-[80%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 [text-shadow:_2px_2px_4px_rgba(255,255,255,0.8)] tracking-wide leading-tight">
						تجربة الواقع المعزز
						</h1>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
