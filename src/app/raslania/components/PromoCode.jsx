export const PromoCode = () => {
	return (
		<section className="w-full overflow-hidden bg-cover bg-center bg-[url('/mobile-bg-L.png')] sm:bg-[url('/bg-promo.png')]">
			<div className="w-full px-[66px] py-[57px] max-md:px-5">
			<div className="w-full flex justify-end">
					<div className="flex gap-4 w-[80%] justify-center sm:justify-between flex-col sm:flex-row">
						<div className="my-auto w-[100%] sm:w-[70%] lg:w-[50%]">
							<div className="flex flex-col gap-4 text-right w-fit">
								<h1
									className="text-gray-900 text-xl sm:text-2xl md:text-5xl  lg:text-6xl text-wrap
 font-bold leading-[72px] tracking-[-1.5px] max-md:max-w-full max-md:text-[40px] max-md:leading-[53px]">
									الضغط على زر تجرب الواقع المعزز:
								</h1>
								<br />
								<p
									className="text-[#000000] text-[20px] leading-[24px] text-wrap w-[80%] sm:w-full">
									يمكنك اختيار احد القصص المتاحة في التطبيق
								</p>
							</div>
						</div>
						<div>
							<img src="/shared-image3.jpg" alt="" />
						</div>
					</div>
				</div>


				<br />
				<br />
				<br />
				<br />

		    <div className="flex mx-auto sm:mx-0 gap-8 w-[80%] sm:w-[90%] flex-col sm:flex-row">
					<div className="order-2 sm:order-1 w-[100%] sm:w-[50%] ">
						<img src="/shared-image4.jpg" alt=""/>
					</div>
					<div className="my-auto order-1 sm:order-2">
						<div className="flex flex-col gap-2 text-right ">
							<h1 className="text-gray-900 text-wrap text-1xl sm:text-2xl md:text-5xl  lg:text-6xl font-bold leading-[72px] tracking-[-1.5px] max-md:max-w-full max-md:text-[40px] max-md:leading-[53px]">
							إدخال الرمز الترويجي (raslania) :
							</h1>
              <br />
							<p className="text-[#000000] text-[20px] leading-[24px] text-wrap">
							بعد إدخال الرمز الترويجي سيتم خصم المبلغ كامل وبعد ذلك يرجى الضغط على الدفع للاستمتاع بالقصة
							</p>
						</div>
					</div>
				</div>


			</div>
			
		</section>
	);
};

export default PromoCode;
