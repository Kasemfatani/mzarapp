export const RegisterApp = () => {
	return (
		<section className="w-full overflow-hidden bg-cover bg-center bg-[url('/mobile-bg-r.png')] sm:bg-[url('/regBg.png')]">
			<div className="w-full px-[66px] py-[57px] max-md:px-5">
				<div className="flex mx-auto sm:mx-0 gap-2 w-[70%] flex-col sm:flex-row ">
					<div className="order-2 sm:order-1">
						<img src="/Mobile.png" alt="" />
					</div>
					<div className="my-auto order-1 sm:order-2">
						<div className="flex flex-col gap-2 text-left w-fit">
							<h1 className="text-gray-900 text-wrap text-1xl sm:text-2xl md:text-5xl  lg:text-6xl font-bold leading-[72px] tracking-[-1.5px] max-md:max-w-full max-md:text-[40px] max-md:leading-[53px]">
								Register in the app
							</h1>

							<p className="text-[#000000] text-[16px] leading-[24px] text-wrap">
								Lorem Ipsum is simply dummy text of the printing and typesetting
								industry.Lorem Ipsum is simply dummy.
							</p>
						</div>
					</div>
				</div>

				<br />
				<br />

				<div className="w-full flex justify-end">
					<div className="flex gap-4 w-[80%] justify-center sm:justify-between flex-col sm:flex-row">
						<div className="w-[100%] sm:w-[70%] lg:w-[50%]">
							<div className="flex flex-col gap-4 text-left w-fit">
								<h1
									className="text-gray-900 text-xl sm:text-2xl md:text-5xl  lg:text-6xl text-wrap
 font-bold leading-[72px] tracking-[-1.5px] max-md:max-w-full max-md:text-[40px] max-md:leading-[53px]">
									The Augmented Reality
								</h1>
								<p
									className="text-[#000000] text-[16px] leading-[24px] text-wrap w-[80%] sm:w-full">
									Lorem ipsum dolor sit, amet consectetur adipisicing elit.
									Nobis consectetur, consequuntur
								</p>

								<button className="w-[70%] md:w-[60%] lg:w-[50%] px-8 py-4 text-white text-sm sm:text-lg md:text-xl font-semibold rounded-lg bg-gradient-to-r from-blue-600 via-cyan-400 to-green-300">
									Get Started
								</button>
							</div>
						</div>
						<div>
							<img src="/Mobile.png" alt="" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default RegisterApp;
