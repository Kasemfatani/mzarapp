export const RegisterApp = () => {
	return (
		<section className="w-full overflow-hidden bg-cover bg-center bg-[url('/mobile-bg-r.png')] sm:bg-[url('/regBg.png')]">
			<div className="w-full px-[66px] py-[57px] max-md:px-5">
				<div className="flex mx-auto sm:mx-0 gap-2 w-[70%] flex-col sm:flex-row ">
					<div className="order-2 sm:order-1">
						<img src="/Mobile.png" alt="" />
					</div>
					<div className="my-auto order-1 sm:order-2">
						<div className="flex flex-col gap-2 text-right w-fit">
							<h1 className="text-gray-900 text-wrap text-1xl sm:text-2xl md:text-5xl  lg:text-6xl font-bold leading-[72px] tracking-[-1.5px] max-md:max-w-full max-md:text-[40px] max-md:leading-[53px]">
							تنزيل التطبيق:
							</h1>
							<br />
							<p className="text-[#000000] text-[20px] leading-[24px] text-wrap">
							يمكن تنزيل التطبيق عبر متجر جوجل أو أبل
							</p>
						</div>
					</div>
				</div>

				<br />
				<br />

				<div className="w-full flex justify-end">
					<div className="flex gap-4 w-[80%] justify-center sm:justify-between flex-col sm:flex-row">
						<div className="w-[100%] sm:w-[70%] lg:w-[50%]">
							<div className="flex flex-col gap-4 text-right w-fit">
								<h1
									className="text-gray-900 text-xl sm:text-2xl md:text-5xl  lg:text-6xl text-wrap
 font-bold leading-[72px] tracking-[-1.5px] max-md:max-w-full max-md:text-[40px] max-md:leading-[53px]">
									التسجيل في التطبيق:
								</h1>
								<br />
								<p
									className="text-[#000000] text-[20px] leading-[24px] text-wrap w-[80%] sm:w-full">
									بخطوات بسيطة يمكنكم التسجيل في تطبيق مزار
								</p>
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
