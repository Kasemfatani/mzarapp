
export default function getMashair(isAr) {
	return {
		id: 45,
		title: isAr
			? "تجربة زيارة المشاعر المقدسة"
			: "Experience Visiting the Holy Sites",
		description: isAr
			? "مسار المشاعر رحلة إيمانية تاريخية عبر المشاعر المقدسة ابتداءً من عرفات مروراً بمزدلفة ومن ثم منى وانتهاءً بجبل النور وحي حراء الثقافي. "
			: "The Holy Sites Path is a spiritual and historical journey through the holy sites starting from Arafat, passing through Muzdalifah, then Mina, and ending at Jabal al-Noor and the cultural district of Hira.",
		image: "/trip-detail/water-bottles.webp",
		capacity: 45,
		duration: isAr ? "4 ساعات" : "4 hours",
		rating: 4.7,
		reviewCount: 512,
		price: 89,
		availability: isAr ? "متاحة يومياً" : "Available daily",
		times: isAr ? " 6:00 ص - 5:00 م" : " 6:00 AM - 5:00 PM",
		meetingPoint: "-",
		highlights: [
			{
				icon: "map-pin",
				title: isAr ? "نقطة الانطلاق" : "Starting Point",
				detail: isAr
					? "السائق يصل إلى موقعك في أي مكان"
					: "Driver arrives at your location anywhere",
			},
			{
				icon: "compass",
				title: isAr ? "تحقق ذكي " : "Smart Tracking",
				detail: isAr
					? "تحقق من الوصول للوجهة تلقائياً"
					: "Smart destination arrival verification",
			},
			{
				icon: "globe",
				title: isAr ? "محتوى بعدة لغات" : "Multilingual Content",
				detail: isAr
					? "محتوى إثرائي متوفر ب6 لغات عالمية"
					: "Enriching content available in 6 global languages",
			},
			{
				icon: "calendar",
				title: isAr ? "حجز مرن" : "Flexible Booking",
				detail: isAr
					? "إلغاء مجاني حتى 24 ساعة قبل الموعد"
					: "Free cancellation up to 24 hours before the appointment",
			},
			{
				icon: "shield",
				title: isAr ? "روايات موثوقة" : "Trusted Narrations",
				detail: isAr
					? "قصص إثرائية معتمدة تُحكى لأول مرة"
					: "Accredited enriching stories told for the first time",
			},
		],
		about: {
			desc: isAr
				? "نأخذكم في رحلة إيمانية تاريخية، نسير فيها معكم عبر المشاعر المقدسة ابتداءً من عرفات مروراً بمزدلفة ومن ثم منى وانتهاءً بجبل النور وحي حراء الثقافي."
				: "We take you on a spiritual and historical journey, walking with you through the holy sites starting from Arafat, passing through Muzdalifah, then Mina, and ending at Jabal al-Noor and the cultural district of Hira.",
			list: isAr
				? [
						"عرفات ــ ثلاث وجهات رئيسية: جبل الرحمة ومسجد نمرة وخاصرة عين زبيدة.",
						"مزدلفة ــ وفيها مسجد المشعر الحرام.",
						"منى ــ حيث نطوف بكم بين: جسر الجمرات ومسجد الخيف.",
						"وفي نهاية الرحلة يمكنكم زيارة جبل النور وحي حراء الثقافي، والاستمتاع بجولة معرفية وإثرائية بين جنبات متاحفه.",
						"في هذه الرحلة نمزج بين السير في أراضي المشاعر والتحليق في سموّ المشاعر، وإثراء التجربة. ",
				  ]
				: [
						"Arafat — Three main destinations: Jabal al-Rahma, Namira Mosque, and the Zubaida Spring Basin.",
						"Muzdalifah — Home to the Sacred Mosque of Muzdalifah.",
						"Mina — Where we tour between: the Jamarat Bridge and Al-Khaif Mosque.",
						"At the end of the journey, you can visit Jabal al-Noor and the cultural district of Hira, and enjoy an informative and enriching tour among its museums.",
						"In this journey, we blend walking through the lands of the holy sites with soaring in the heights of spirituality, enriching the experience.",
				  ],
		},
		included: isAr
			? [
					"مرشد ذكي صوتي ونصي موثوق وبعدة لغات.",
					"نقل آمن ومريح عبر مركبات مكيفة.",
					"دخول جميع المواقع والأماكن المقدسة. ",
					"وسائل الراحة: واي فاي، كيابل الشحن، مياه معدنية.",
					"مواقف مهيأة بجوار جبل الرحمة تسهل لك الوصول بدون مشي ومشقة. ",
			  ]
			: [
					"Smart audio and text guide in multiple languages.",
					"Comfortable and safe transportation via air-conditioned vehicles.",
					"Entry to all holy sites and places",
					"Comfort amenities: Wi-Fi, charging cables, mineral water.",
					"Parking facilities near Jabal al-Rahma for easy access without walking or hardship.",
			  ],
		notIncluded: isAr
			? [
					"المشتريات والهدايا الشخصية.",
					"الوجبات.",
					"تذاكر المتاحف (يمكنك شراؤها عبر التطبيق). ",
			  ]
			: [
					"Personal purchases and gifts",
					"Meals",
					"Museum tickets (can be purchased through the app).",
			  ],
		// Locations for Destinations section, need to add eng ver
		locations: isAr
			? [
					{
						id: 17,
						name: "عرفات",
						is_favorite: false,
						cover:
							"https://app.mzarapp.com/storage/location/17/actkgq0recnA65vFuNMhlod8rNas0fjeXwL8At71.jpg",
						lat: "21.331467729460517",
						lng: "39.96897995939424",
						duration: "مرور فقط",
						has_ticket: false,
						description:
							'لما أهبط الله أبانا آدم عليه السلام وأمنا حواء من الجنة، تفرقا في الأرض سنين طويلة، وظلا يبحثان عن بعضهما البعض، حتى التقيا أخيرا في عرفات وتعارفا، فسميت بذلك عرفات.(1)\r\nوالوقوف بعرفة هو أهم أركان الحج، ولا يتم الحج إلا بالوقوف فيها لقوله ﷺ: ( الحج عرفة ) .(2)\r\n\r\nعرفات هي المشعر الأبعد من مشاعر الحج، على الطريق بين مكة والطائف طريق الهدا، وهي تبعد حوالي ثلاثة وعشرين كيلو مترا شرق مكة، ومساحتها تغطي عدة كيلو مترات، وهي أرض فسيحة واسعة تحفها الجبال من الشرق والجنوب والشمال الشرقي، ومن جهة جبل سعد إلى الشمال، يقع سوق ذي المجاز أحد أسواق العرب القديمة، أما في وسط سهلها فنشاهد جبل الرحمة الذي يتوسط هذا السهل.(3)\r\n\r\nعن سفيان الثوري - رحمه الله - يقول : قدمت مكة فإذا أنا، بجعفر ابن محمد قد أناخ بالأبطح، فسألته: لم جعل الموقف من وراء الحرم ( يقصد عرفة ) ، ولم يصير في المشعر الحرام؟\r\nفقال : الكعبة بيت الله، والحرم حجابه، والموقف بابه ، فلما قصدوه أوقفهم بالباب يتضرعون، فلما أذن لهم بالدخول، أدناهم من الباب الثاني، وهو المزدلفة، فلما نظر إلى كثرة تضرعهم وطول اجتهادهم رحمهم ، فلما رحمهم أمرهم بتقريب قربانهم، فلما قربوا قربانهم، وقضوا تفثهم ، وتطهروا من الذنوب، أمرهم بالزيارة لبيته.(4)\r\n\r\nعن ابن عباس رضي الله عنهما قال : " إنما سميت عرفة، لأن جبريل عليه السلام أتى إبراهيم عليه السلام، فأراه بقاع مكة ومشاهدها ، فكان يقول : يا إبراهيم، هذا موضع كذا وهذا موضع كذا ، فيقول: قد عرفت، قد عرفت " ، فسميت عرفات .(5)\r\n\r\n❖المصادر:\r\n1- تاريخ الطبري ١ / ٨٩ والبداية والنهاية ١ / ١٠٢ والكامل لابن الاثير ١ / ٥٥. \r\n2- اخرجه الترمذي حديث رقم (889). \r\n3- كتاب معالم مكة التأريخية والأثرية(عاتق البلادي) ص: (182). \r\n4- كتاب سير أعلام النبلاء - ط الرسالة(شمس الدين الذهبي) (6/264). \r\n5- رواه الطبري في جامع البيان( ٢/ ٢٨٦).',
						short_description:
							"عرفات: البقعة التي يجتمع فيها المسلمون في كلّ عام لأداء فريضة الحج، حيث أن الوقوف بها ركن الحجّ الأكبر الذي لا يتمّ الحجّ إلا به، تعرّفوا على قصة عرفات التي نرويها لكم عند زيارة الوجهة.",
						category_icon:
							"https://app.mzarapp.com/storage/location/17/GrkgP89SKGhb1ZxlJRsMwayrO6PcSEPxpsHdse7v.png",
						distance: "4.94 km",
					},
					{
						id: 15,
						name: "جبل الرحمة",
						is_favorite: false,
						cover:
							"https://app.mzarapp.com/storage/location/15/JV9CGY6VG2lVcggdlN12qd9E3R8gJaF1D0KyFXFS.png",
						lat: "21.352920780061662",
						lng: "39.98482033610344",
						duration: "30 دقيقة",
						has_ticket: false,
						description:
							"أعوذ بالله من الشيطان الرجيم: \r\n﴿الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي وَرَضِيتُ لَكُمُ الْإِسْلَامَ دِينًا﴾.(1)\r\nصدق الله العظيم\r\n\r\nهنا في جبل الرحمة، وفي حجة الوداع، أنزل الله على نبيه هذه الآية الكريمة، إخبارا منه جل وتعالى بتمام الرسالة، وكمال الدين والمنة، حيث أن المصطفى ﷺ، وقف عند صخرات كبار في سفحه الشرقي، وجعل نحر ناقته مستقبلا القبلة، وقال ﷺ: وقفت هنا، وعرفة كلها موقف. ولم يزل واقفا على جبل الرحمة حتى غاب قرص الشمس.(2)\r\n\r\nجبل الرحمة جبل صغير يتوسط سهل عرفات، لا يزيد ارتفاعه عن ثلاثين مترا، بني عليه فيما بعد شاخص حجري، بارتفاع أربعة أمتار ليكون علما يستدل عليه، لذلك عرف عند العامة بجبل القرين، وأطلق على الجبل أيضا اسم جبل الرحمة، تفاؤلا بما ينزل من الرحمات على حجاج بيت الله الحرام، ويحيط بجبل الرحمة أحواض عين زبيدة لقناة عرفات.\r\n\r\nونظرا لوعورة الصعود إليه، بنيت فيه درجات توصلك إلى أعلاه قريبا من الشاخص، وقد بلغت أكثر من إحدى وتسعين درجة، وتعرفه كتب الجغرافيا بجبل إلال أو النابت، وربما أطلق هذا الاسم الأخير على الصخرات التي وقف عندها المصطفى ﷺ.\r\n\r\nعن هارون بن عنترة، عن أبيه قال : لما نزلت ﴿اليوم أكملت لكم دينكم﴾، وذلك يوم الحج الأكبر، بكى عمر ، فقال له النبي ﷺ: ما يبكيك؟ قال : أبكاني أنا كنا في زيادة من ديننا، فأما إذا أكمل ؛ فإنه لم يكمل شيء إلا نقص، فقال : صدقت . (3)\r\n\r\n❖المصادر:\r\n1- سورة المائدة: آية رقم: (3). \r\n2- كتاب شرح النووي على مسلم (النووي) (8/185). \r\n3-  تفسير الطبري -جامع البيان (6/107-108).",
						short_description:
							"هو الجبل الذي يقف عليه الحجاج والمعتمرون يوم الحجّ حيث تتنزّل رحمات الله، تعرفوا على جبل الرحمة وحكايات أخرى عنه عند زيارة الوجهة.",
						category_icon:
							"https://app.mzarapp.com/storage/location/15/ejRLtLQCwUfgtGvKVxsil0MzVLCHiMSVYQr8BvVF.png",
						distance: "4.89 km",
					},
					{
						id: 19,
						name: "مسجد نمرة",
						is_favorite: false,
						cover:
							"https://app.mzarapp.com/storage/location/19/VKs31yhICWRIzbDPfa0KihVfoK8nYY3wgRZw9zHy.png",
						lat: "21.353019454568614",
						lng: "39.96620178222656",
						duration: "5 دقائق",
						has_ticket: false,
						description:
							'" أَيُّهَا الناسْ، إِنَّ رَبَّكَمْ واحِدْ، وإنَّ أباكُمْ واحِدْ، كُلُّكُمْ لآدمْ، وآدمُ مِنْ تُرابْ، إنَّ أكْرَمَكُمْ عَنْدَ اللهِ أتْقاكُمْ، لَيْسَ لِعَربيٍّ فَضْلٌ على أعْجَمِيٍّ إلا بِالتَقْوى، ألا هَلْ بَلَّغْتْ؟ اللَّهُمَّ فاشْهَدْ.\r\n\r\nأَيُّهَا الناسْ: إنَّ دِماءَكُمْ وأمْوالَكُمْ عَلَيْكُمْ حَرامٌ إلى أَنْ تَلْقُوا رَبَّكُمْ ، كَحُرْمَةِ يَوْمِكُمْ هذا في شَهْرِكُمْ هذا ، في بَلَدِكُمْ هذا ، وإنَّكُمْ سَتَلْقَونَ رَبَّكُمْ فَيَسْألُكُمْ عَنْ أعْمَالِكُمْ ، وقَدْ بَلَّغْتْ ، فَمَنْ كانتْ عِنْدَهُ أمانَةً فَلْيَرُدَّها لِمَنْ إِئْتَمَنَهُ عَلَيْها"(1)\r\n\r\nهنا في عرفات، في هذا الموضع المبارك، وقف رسول الله ﷺ وألقى خطبة الوداع، وضربت له قبة وصلى الظهر والعصر، وبني فيه هذا المسجد: مسجد نمرة، وبعضهم يسميه مسجد عرفة، وهو ليس ببعيد عن وادي عرنة.(2)\r\n\r\nويعتبر مسجد نمرة ثاني أكبر المساجد مساحة بمنطقة مكة المكرمة بعد المسجد الحرام، وقد شهد اهتماما من الملك المؤسس، الملك عبد العزيز رحمه الله، ووصلت مساحته إلى ثلاثمائة وأربعين مترا من الشرق إلى الغرب، وبعرض مئتين وأربعين مترا من الشمال، وتوجد خلف المسجد مساحة مظللة تقدر مساحتها بحوالي ثمانية آلاف متر إلى الجنوب، وللمسجد ست مآذن ارتفاع كل منها ستين مترا، وثلاث قباب وعشرة مداخل رئيسية تحتوي على أربعة وستين بابا .\r\n\r\nويعتبر وادي عرنة القريب من هذا المسجد خارج حدودها، ولا يجوز الوقوف فيه لقوله ﷺ: عرفة كلها موقف، وارتفعوا عن بطن عرنة.(3)\r\nوفي هذا الوادي أهلك الله أبرهة عندما قدم بنية هدم الكعبة. وهو يفصل بين عرفة ومشعر مزدلفة.(4)\r\n\r\n❖المصادر:\r\n1- رواه مسلم حديث رقم (1218). \r\n2-رواه مسلم في حديث مطول رقم (1218). \r\n3-رواه مسلم حديث رقم (1218). \r\n4- كتاب معالم مكة التأريخية والأثرية (عاتق البلادي) ص:283.',
						short_description:
							"مسجد نمرة، هو المسجد الذي يصلّي فيه الحجاج صلاتي الظهر والعصر يوم الوقوف بعرفة، تعرف على قصته وخطبة رسول الله ﷺ فيه، وقصص أكثر نرويها لكم عند زيارتكم الوجهة.",
						category_icon:
							"https://app.mzarapp.com/storage/location/19/1dcZx0fy1CxTyp6lNgmourjBXkNruCXNjFPVFKxM.png",
						distance: "4.83 km",
					},
					{
						id: 27,
						name: "عين زبيدة",
						is_favorite: false,
						cover:
							"https://app.mzarapp.com/storage/location/27/4KTSlmhCFdjEdsrAh8do3MseZFLlE1ujjBr88nno.png",
						lat: "21.36356345473334",
						lng: "39.929977079608534",
						duration: "10 دقائق",
						has_ticket: false,
						description:
							'في عام مئة وثمانية وستين هجري قدمت السيدة زبيدة بنت أبي الفضل جعفر المنصور، زوجة الخليفة هارون الرشيد إلى الحج، ورأت حاجة مكة للماء، وما يعانيه أهلها والحجاج والمعتمرون للحصول عليه، فمكة بلد قفر لا ماء ولا زرع حتى أكرمها المولى تبارك وتعالى بزمزم، ولكنها ظلت تعتمد على بعض الآبار لتوفير المياه لسكانها والحجاج والمعتمرين التي لاتسدّ حاجتهم.\r\nحينها أمرت السيدة زبيدة بتوفير المياه لمكة ولو من خارجها، ورغم العوائق الطبيعية التي كادت تحول دون تحقيق الهدف،اتجه المهندسون والعمال إلى وادي النعمان ( أسفل جبل الكر اليوم) وعمل العمال جهدهم حتى سلك الماء من أرض الحل إلى أرض الحرم، \r\nوعين زبيدة لها رافدان، الأول من وادي نعمان، والثاني من حنين (ما يلي الشرائع اليوم).حيث تنبع هذه العين من قرية الصدر وجبالها الشامخة مثل طاد وكنثيل من ديار هذيل، ويسيل الصدر من وادي حنين حيث المزارع والنخيل، وفي هذه المنطقة ينتهي جريان الماء في مكان يسمى حائط حنين، فاشترت السيدة زبيدة هذا الحائط وشقت له القناة من هناك حتى أدخلتها مكة.(1) \r\n\r\nوعندما علمت أن مياه حنين لا تسد حاجة أهل مكة، اتجهت همتها إلى وادي نعمان قرب عرفة، تأخذ مياهه من جبال كرا وتستمر عبر قنوات حتى عرفات، ثم أديرت هذه القناة حول جبل الرحمة وعُملت البرك في عرفات واستمرت عبر المشاعر وطريق ضب (خاصرة عين زبيدة) إلى العزيزية حتى أوصلتها مكة.(2)\r\n\r\nولا تزال آثار القنوات المائية قائمة في سفوح الجبال، حيث حرص منفذو المشروع على وضع فتحات لقنوات فرعية في المواضع التي يكون من المتوقع تجمع مياه السيول فيها، لتكون هذه القنوات مصدرا من مصادر تجميع المياه عبر القناة الرئيسية، ويصل عمق هذه القنوات في بعض المناطق إلى 40 مترا تحت الأرض، وتعتمد في تجميع المياه على خزانات تحت الأرض تسمى "بازانات". وظلت هذه العين توفر الماء لأهل مكة حتى بداية العهد السعودي، وعندما دخل الملك عبد العزيز رحمه الله مكة أمر بصيانة هذه العين فجرى الماء من خلالها مرة أخرى.(3) \r\n\r\nأعوذ بالله من الشيطان الرجيم: \r\n(أَوَلَمْ نُمَكِّن لَّهُمْ حَرَمًا آمِنًا يُجْبَىٰ إِلَيْهِ ثَمَرَاتُ كُلِّ شَيْءٍ رِّزْقًا مِّن لَّدُنَّا وَلَٰكِنَّ أَكْثَرَهُمْ لَا يَعْلَمُونَ). (4)\r\n\r\n❖المصادر:\r\n1-أخبار مكة للأزرقي (2/230-232). \r\n2-كتاب شفاء الغرام بأخبار البلد الحرام (التقي الفاسي) (1/449-450). \r\n3- الهيئة العامة للأوقاف (وقف عين زبيدة). \r\n4- سورة القصص آية رقم (57).',
						short_description:
							"تعرف على قصّة عين زبيدة: أحد أعظم المشاريع المائية التي أنشئت لخدمة حجاج بيت الله الحرام، واطلع على الوجهة واسمع قصصا أخرى عند زيارتك لها.",
						category_icon:
							"https://app.mzarapp.com/storage/location/27/LP0tU80lGz7OasiRdNGwSXlDCCxycHjmMLZqkRqp.png",
						distance: "4.77 km",
					},
					{
						id: 25,
						name: "مزدلفة",
						is_favorite: false,
						cover:
							"https://app.mzarapp.com/storage/location/25/Tn1N5PVH9V8LMYfLkWkJzV4wKtMz42MUoGlHpnk7.png",
						lat: "21.38463784637225",
						lng: "39.91283507388772",
						duration: "مرور فقط",
						has_ticket: false,
						description:
							'أعوذ بالله من الشيطان الرجيم: \r\n(فَإِذَا أَفَضْتُم مِّنْ عَرَفَاتٍ فَاذْكُرُوا اللَّهَ عِندَ الْمَشْعَرِ الْحَرَامِ ۖ وَاذْكُرُوهُ كَمَا هَدَاكُمْ وَإِن كُنتُم مِّن قَبْلِهِ لَمِنَ الضَّالِّينَ) (1)\r\n\r\nوالمشعر الحرام هو "مزدلفة" وهو ثالث المشاعر المقدسة التي يمر بها الحجاج لأداء مناسك الحج حيث أنها تقع بين منى وعرفات، ويفصل بينها وبين عرفات وادي محسر خارج حدود الحرم، وهو الموقع الذي حسر المولى تبارك وتعالى فيه فيل أبرهة من التقدم نحو الكعبة المشرفة، وكان عليه الصلاة والسلام إذا أقبل عليه حرك ناقته وأسرع في السير.\r\n\r\nومزدلفة من ازدلاف الناس إليها أي تتابعهم إليها فسميت مزدلفة أو جُمع، وقيل أن سبب تسميتها كون الناس يدفعون منها زلفة واحدة أي دفعة واحدة، وقيل لأن الناس تنزل بها في زلف الليل.(2)\r\n\r\nيفد إليها الحجاج بعد مغرب يوم التاسع ويصلون في مسجدها المغرب والعشاء ويبيتون فيها حتى صلاة الفجر بعد أن يجمعوا الحصوات حيث ينطلقون إلى منى.(3)\r\n\r\nوتقدر مساحة مزدلفة كاملة بأكثر من ثلاثة عشر كيلومترا، وتقع بين واديين، محسر يفصلها عن عرفات ووادي عرنة من الشرق.\r\n\r\n❖المصادر:\r\n1- سورة البقرة آية رقم (198). \r\n2- كتاب إعلام الساجد بأحكام المساجد (بدر الدين الزركشي) ص: (71). \r\n3- فعل النبي عليه السلام كما ورد في حديث رواه مسلم رقم (1218).',
						short_description:
							"تعرف على مزدلفة المشعر الذي يفيض الحجاج إليه من عرفة عند مغيب شمس اليوم التاسع، وقصصا أخرى مرتبطة بهذا المشعر عند زيارتك لهذه الوجهة.",
						category_icon:
							"https://app.mzarapp.com/storage/location/25/xUTJqyhGZI2JUWGd6vs5MPEy7EIavHA5EBWl6GKl.png",
						distance: "4.72 km",
					},
					{
						id: 26,
						name: "مسجد المشعر الحرام",
						is_favorite: false,
						cover:
							"https://app.mzarapp.com/storage/location/26/AidsXgec6GB4IZKJFnpDtweuW4QgpME0YK2V61tt.png",
						lat: "21.386270226826056",
						lng: "39.91230010986328",
						duration: "5 دقائق",
						has_ticket: false,
						description:
							'عن علي بن أبي طالب -رضي الله تعالى عنه- قال: فلما أصبح رسول الله ﷺ -يعني في حجة الوداع- ووقف على قزح فقال: هذا قزح، وهو الموقف، وجمع كلها موقف.(1)\r\n\r\nفي هذا الموضع وقف رسول الله ﷺ أثناء حجة الوداع لما أفاض من عرفة إلى مزدلفة والتي هي المشعر الحرام وتسمى: جمع ، فبني المسجد مكان موقفه ﷺ، وسمي بمسجد المشعر الحرام.(29\r\n\r\nويفد إليه الحجاج بعد مغرب اليوم التاسع للحج ويؤدون فيه صلاتي المغرب والعشاء، ويعرف أيضا بمسجد مزدلفة.\r\nكان بناء المسجد متواضعا عبر التاريخ حتى كان العهد السعودي، ففي عام ألف وثلاثمئة وتسعة وخمسين من الهجرة، أصبحت مساحة المسجد ستة الاف متر ويتسع لأكثر من اثني عشر ألف مصل.(3)\r\n\r\nوقد روعي في تصميمه المعمار الإسلامي وأضيفت إليه مئذنتان بارتفاع أربعين مترا، ومداخل في الجهات الشمالية والجنوبية والشرقية، كما زينت جدرانه من الأعلى بشرفات جصية بأشكال هندسية بلغ عددها ستمائة وأربعون، ويبلغ ارتفاع محراب المسجد إلى أكثر من أربعة أمتار.\r\n\r\nعن ابن عمر -رضي الله تعالى عنهما -، قال: خطبنا رسول الله ﷺ غداة جمع -مزدلفة- فقال: " أيها الناس، إن الله قد تطول عليكم في مقامكم هذا، فقبل من محسنكم، ووهب مسيئكم لمحسنكم، والتبعات بينكم عوضها من عنده أفيضوا على اسم الله.".\r\n\r\n❖المصادر:\r\n1- اخرجه أحمد (2/454). \r\n2- وردت في حديث جابر بن عبد الله في صحيح مسلم حديث رقم (1218). \r\n3-أخبار العربية',
						short_description:
							"يُصلّي الحجاج والمعتمرون في مسجد المشعر الحرام صلاتي المغرب والعشاء جمعا وقصرا، تعرّف على تفاصيل هذا المسجد وحكايته عند زيارتك لهذه الوجهة.",
						category_icon:
							"https://app.mzarapp.com/storage/location/26/rjkSjtlwYjcEMSnWS5H5FUn428qCqpCBq1FEUBuS.png",
						distance: "4.67 km",
					},
					{
						id: 30,
						name: "منى",
						is_favorite: false,
						cover:
							"https://app.mzarapp.com/storage/location/30/ervDqVJFtZkVPEPZmlCft01ZT86eR6GoHl6vwikG.png",
						lat: "21.395614311877967",
						lng: "39.90018898892243",
						duration: "مرور فقط",
						has_ticket: false,
						description:
							"أعوذ بالله من الشيطان الرجيم: \r\n(فَلَمَّا بَلَغَ مَعَهُ ٱلسَّعْىَ قَالَ يَٰبُنَىَّ إِنِّىٓ أَرَىٰ فِى ٱلْمَنَامِ أَنِّىٓ أَذْبَحُكَ فَٱنظُرْ مَاذَا تَرَىٰ ۚ قَالَ يَٰٓأَبَتِ ٱفْعَلْ مَا تُؤْمَرُ ۖ سَتَجِدُنِىٓ إِن شَآءَ ٱللَّهُ مِنَ ٱلصَّٰبِرِينَ)(1)\r\n\r\nهنا في الغرب من منى على جبل ثبير نزل جبريل عليه السلام إلى إبراهيم عليه السلام بالكبش ليفتدي به الذبيح إسماعيل عليه السلام.\r\nفعن ابن عباس -رضي الله عنه- قال : الصخرة التي بمنى بأصل ثبير هي الصخرة التي ذبح عليها إبراهيم فداء ابنه، هبط عليه من ثبير كبش أعين أقرن له ثغاء ، فذبحه ، وهو الكبش الذي قربه ابن آدم فتقبل منه ، فكان مخزونا حتى فدي به.(2)\r\n\r\nومنى أحد مشاعر الحج الثلاثة والتي يفد إليها الحجاج مرتين أيام الحج، ففي يوم التروية الثامن من شهر ذي الحجة يفد إليها الحجاج ويبيتون فيها تلك الليلة، ويعودون إليها صبيحة يوم العاشر لرمي الجمرات ثم المبيت فيها ليالي التشريق. (3)\r\n\r\nوفي مشعر منى الجمرات، والمنحر، ومسجد الخيف، ومسجد الكبش، ومسجد المرسلات، وشعب الأنصار الذي أصبح يعرف فيما بعد بمسجد البيعة.(4)\r\n\r\nوتبعد منى عن المسجد الحرام بنحو ستة كيلومترات فقط. \r\nأما سبب تسميتها بمنى فقيل: لما يمنى فيها من دماء الأضاحي والفدو\r\n\r\n❖المصادر:\r\n1- سورة الصافات آية رقم (102). \r\n2- كتاب شفاء الغرام بأخبار البلد الحرام (التقي الفاسي)، (2/12). \r\n3-ذكر في صحيح مسلم حديث رقم (1218). \r\n4- كتاب معالم مكة التأريخية والأثرية (عاتق البلادي)، ص:(290). \r\n5- كتاب مثير العزم الساكن إلى أشرف الأماكن(ابن الجوزي)، ص: (206).",
						short_description:
							"تعرف على منى، المشعر الذي يقصده الحجاج مرتين أثناء الحج، ومعالم أخرى تحويها هذه البقعة المباركة عند زيارتك لهذه الوجهة.",
						category_icon:
							"https://app.mzarapp.com/storage/location/30/TtE3r5Ud51b7IbnJPLUecDImuDGDMTGBxNm5ebPS.png",
						distance: "4.62 km",
					},
					{
						id: 43,
						name: "جسر الجمرات",
						is_favorite: false,
						cover:
							"https://app.mzarapp.com/storage/location/43/WbZ2saJu37PypV6Txs9d2xqq8HXjEy2d05twojy8.png",
						lat: "21.421099441824918",
						lng: "39.86796707147425",
						duration: "مرور فقط",
						has_ticket: false,
						description:
							"عن ابن عباس -رضي الله عنه ، عن رسول الله صلى الله عليه وسلم قال: لمَّا أَتَى إبراهيمُ خَلِيلُ اللهِ المَناسِكَ عرضَ لهُ الشَّيْطَانُ عندَ جَمْرَةِ العقبةَ ، فَرَماهُ بِسبعِ حصياتٍ حتى ساخَ في الأرضِ ، ثُمَّ عرضَ لهُ عندَ الجمرةِ الثانيةِ ، فَرَماهُ بِسبعِ حصياتٍ حتى ساخَ في الأرضِ ، ثُمَّ عرضَ لهُ عِنْدِ الجمرةِ الثالثةِ ، فَرَماهُ بِسبعِ حصياتٍ حتى ساخَ في الأرضِ. قال ابْنُ عباسٍ : الشيطانَ تَرْجُمُونِ ، ومِلَّةَ أَبيكُمْ إبراهيمَ تَتَّبِعُونَ(1) . \r\n\r\nرمي الجمرات من مناسك الحج، وهو اتباع لسنة خليل الله إبراهيم عليه السلام، والجمرات ثلاثة: جمرة العقبة، والجمرة الوسطى، والجمرة الصغرى. \r\n\r\nوكانت جمرة العقبة لا تُرمى إلا من جهة واحدة فقط، وهي الجهة الجنوبية الغربية لوجود جبل خلفها تستند إليه، وقد أزيل هذا الجبل عام ألف وثلاثمئة وستة وسبعين هجري لتوسعة المنطقة، وأقيم بناء مكانه لعدم الرمي من تلك الجهة. \r\n\r\nولقد عنيت الحكومة السعودية بتيسير أداء المناسك والتسهيل على الحجاج فأنشأت جسر الجمرات الذي يمتد من الشرق إلى الغرب، وروعي في تصميمه ارتفاعه الانسيابي صعودا ونزولا ليكون سهلا على الحجاج من كبار السن وأصحاب العربات، وجعلت فتحات ثلاث للجمرات ينفذ من خلالها بناء الجمرة وتسقط الحجارة من خلال قصبة حول الجمرة. \r\n\r\nوفي عهد خادم الحرمين الشريفين الملك عبد الله بن عبد العزيز -رحمه الله- أصبحت منطقة الجمرات منشأة بحالها تبلغ خمسة أدوار،مع عدد كبير من المداخل والمخارج للدخول والخروج منها لتقليل الازدحام، كما أن هناك سلالم كهربائية ومصاعد لكبار السن وذوي الاحتياجات  الخاصة(2). \r\n\r\n❖ المصادر:\r\n1-اخرجه الحاكم  حديث رقم(1713)، والبهيقي حديث رقم(9975). \r\n2-دارة الملك عبدالعزيز",
						short_description:
							"تعرف على منشأة جسر الجمرات التي تحتوي على الجمرات الثلاث التي يرتادها الحجاج أيام الحج، وقصص أخرى نرويها لك عند زيارة الوجهة.",
						category_icon:
							"https://app.mzarapp.com/storage/location/43/utJYxZUcmA8H16nRHzLzXozywR4GYkLHrSphqnGP.png",
						distance: "4.57 km",
					},
					{
						id: 23,
						name: "مسجد الخيف",
						is_favorite: false,
						cover:
							"https://app.mzarapp.com/storage/location/23/1nRvbtrKJDoawWoVEIyT0g8pUxMwLKvhp2JGoDHX.png",
						lat: "21.415038835840903",
						lng: "39.87813949584961",
						duration: "4 دقائق",
						has_ticket: false,
						description:
							"عن عبدالله بن عباس -رضي الله عنه- قال: قال رسول الله ﷺ: (صلَّى في مَسجِدِ الخَيْفِ سَبْعونَ نَبِيًّا؛ مِنهم موسى، كأنِّي أَنظُرُ إليه).(1)\r\n\r\nومسجد الخيف أو مسجد الأنبياء هو مسجد منى، وهو موضع صلى فيه الرسول ﷺ كما صلى فيه الأنبياء من قبله، ، وعرف بمسجد الخيف لأنه يقع في خيف جبل الصابح، والخيف في اللغة ما انحدر من الجبل وارتفع عن الوادي.(2)\r\n\r\n وفي جبل الصابح هذا ما عرف بغار المرسلات، وهو الموضع الذي جلس فيه الرسول ﷺ ونزلت عليه سورة المرسلات.(3)\r\n\r\nوالمسجد ليس ببعيد عن موقع الجمرات، ويبعد عن المسجد الحرام مسافة سبعة كيلومترات، وشهد أول عمارة له في العصر العباسي في العام مئتين وستة وخمسين هجري، ثم تعاهد خلفاء المسلمين حتى كانت العمارة السعودية في العام ألف وأربع مائة واثنين هجري، حيث أخذ المسجد شكله المعماري الحديث بمآذنه الأربعة، وأصبحت مساحته الإجمالية خمسة وعشرين ألف متر مربع، ويستوعب نحو خمسة و أربعين ألف مصل.\r\n\r\n❖المصادر:\r\n1-رواه الطبراني في المعجم الأوسط (5407). \r\n2- كتاب إعلام الساجد بأحكام المساجد (بدر الدين الزركشي)، ص (68). \r\n3- كتاب شفاء الغرام بأخبار البلد الحرام (التقي الفاسي)، (1/373).",
						short_description:
							"مسجد الخيف هو موضع صلى فيه الرسول ﷺ وصلى فيه الأنبياء من قبله، تعرف على قصة هذا المسجد عند زيارتك للوجهة.",
						category_icon:
							"https://app.mzarapp.com/storage/location/23/u9TSMfnfpxFYf4iy7TPUkVRTC4qPs6GGDSdabsZA.png",
						distance: "4.52 km",
					},
					{
						id: 13,
						name: "جبل حراء (النور) وحي حراء الثقافي",
						is_favorite: false,
						cover:
							"https://app.mzarapp.com/storage/location/13/c3Jl5GHdhAVReV1rveR7enDwWqWcnxzdMQahBJKi.png",
						lat: "21.4560480306944",
						lng: "39.86900255084038",
						duration: "90 دقيقة",
						has_ticket: true,
						description:
							"انقطع وحي السماء ستمائة عام بعد أن رفع الله نبيه عيسى عليه السلام إليه، وبقي الناس في جاهلية على فترة من الرسل، تائهين في ضلالهم، زائغين في أهوائهم، عدا نبي الله محمد بن عبدالله، اصطفاه الله واختاره، وطهره من شرك الجاهلية وضلالها، وهداه إلى نور الحق والفطرة، كان يعتزل قومه في كل عام شهرًا كاملاً، في خلوة مع ربه، يقضي الليل والنهار، ويجلس في غار حراء بجبل النور، وهو جبل يقع في الشمال الشرقي من مكة، ويبعد قرابة سبعة كيلو مترات عن الكعبة،  ويمتاز جبل حراء بشكله المتميز فكأن قمته سنام جمل أو قبة ملساء، يقف شامخا بارتفاع ستمائة وأربعة وثلاثين مترا عن سطح البحر، والغار في قمته إلى ناحية الجنوب متجها إلى القبلة، وفي الغار شقٌّ يمكن منه رؤية الكعبة المشرفة، ويمثل هذا الجبل ضفة وادي إبراهيم الغربية، ويطلق عليه العامة جبل النور تيمنا بالنور الذي نزل على المصطفى ﷺ، وذلك بنزول آيات القرآن الكريم عليه في هذا المكان المبارك. \r\n\r\nمكث ﷺ يعتزل قومه في كل عام، حتى إذا كان شهر رمضان من السنة الثالثة من عزلته ﷺ، شاء المولى تبارك وتعالى أن يفيض عليه من رحمته على أهل الأرض فنزل عليه الوحي في غار حراء وقد بلغ عمره أربعين سنة. \r\n\r\nعن عائشة رضي الله عنها قالت: أول ما بدئ به رسول الله ﷺ من الوحي، الرؤيا الصالحة في النوم، فكان لا يرى رؤيا إلا جاءت مثل فلق الصبح، ثم حبب إليه الخلاء، وكان يخلو بغار حراء، فيتحنث فيه – وهو التعبد – الليالي ذوات العدد قبل أن ينزع إلى أهله، ويتزود لذلك، ثم يرجع إلى خديجة فيتزود لمثلها، حتى جاءه الحق وهو في غار حراء، فجاءه الملك فقال: اقرأ ، قال:( ما أنا بقارئ ). قال : ( فأخذني فغطني حتى بلغ مني الجهد، ثم أرسلني فقال : اقرأ ، قلت ما أنا بقارئ، فأخذني فغطني الثانية حتى بلغ مني الجهد، ثم أرسلني فقال: اقرأ، فقلت: ما أنا بقارئ، فأخذني فغطني الثالثة، ثم أرسلني فقال:\r\nاقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ (1) خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ (2) اقْرَأْ وَرَبُّكَ الْأَكْرَمُ (3). (1)\r\n\r\n❖المصادر:\r\n1- أخرجه البخاري رقم(6982).",
						short_description:
							"ما من جبل ولا وادي ولا شعب في مكة إلا وله مع رسول الله ﷺ قصة، وجبل النور واحد من هذه المعالم التي شهدت مع رسول الله ﷺ قصصا نرويها لك عند زيارة الوجهة.",
						category_icon:
							"https://app.mzarapp.com/storage/location/13/Xe2hYmwsKoKFcrLVBSYjA2JENnW1Plx7CsVw6gor.png",
						distance: "4.48 km",
					},
			  ]
			: [
					{
						id: 17,
						name: "Arafat",
						is_favorite: false,
						cover:
							"https://app.mzarapp.com/storage/location/17/actkgq0recnA65vFuNMhlod8rNas0fjeXwL8At71.jpg",
						lat: "21.331467729460517",
						lng: "39.96897995939424",
						duration: "Just passing through",
						has_ticket: false,
						description:
							"When Allah sent down our father Adam and our mother Eve from Paradise, they were separated on the earth for many long years, and they kept searching for each other until they finally met in Arafat and recognized each other, thus it was named Arafat.(1)\r\n\r\nStanding at Arafat is the most important pillar of Hajj, and Hajj is not complete without standing there, as the Prophet (peace be upon him) said: \"Hajj is Arafat.\"(2)\r\n\r\nArafat is the furthest ritual site of Hajj on the road between Makkah and Taif, on the Al-Hada road, about 23 kilometers east of Makkah. Its area covers several kilometers, and it is a vast open land surrounded by mountains from the east, south, and northeast. To the north of Mount Saad is the ancient Arab market of Dhul-Majaz. In the middle of its plain stands Mount Rahma, which lies at the center of this plain.(3)\r\n\r\nSufyan Al-Thawri, may Allah have mercy on him, said: I came to Makkah and found Ja'far bin Muhammad resting at Al-Abtah, so I asked him: Why was the standing place made outside the Haram (referring to Arafat) and not within the Sacred Site? He replied: The Kaaba is the House of Allah, and the Haram is its veil, and the standing place (Arafat) is its door. So when they (the pilgrims) intended to visit it, He made them stand at the door, pleading. When they were allowed to enter, He brought them closer to the second door, which is Muzdalifah. When He saw their abundant supplication and long effort, He had mercy on them. When He had mercy on them, He commanded them to offer their sacrifices. When they had offered their sacrifices and removed their ritual impurity and purified themselves from sins, He commanded them to visit His House.(4)\r\n\r\nIbn Abbas, may Allah be pleased with him, said: \"It is called Arafat because when Gabriel (peace be upon him) came to Ibrahim (peace be upon him) and showed him the locations of Makkah and its landmarks, he would say: 'O Ibrahim, this is such-and-such place,' and Ibrahim would say, 'I have known, I have known,' so it was named Arafat.\"(5)\r\n\r\n❖ Sources: \r\n1- Tabari's History, Volume 1, page 89; Al-Bidaya wa'l-Nihaya, Volume 1, page 102; Al-Kamil fi al-Tarikh by Ibn al-Athir, Volume 1, page 55.\r\n2- Narrated by al-Tirmidhi, Hadith number (889).\r\n3- Ma'alim Makkah al-Tarikhiyyah wa al-Athariyyah (Historical and Archaeological Landmarks of Mecca) by Atiq al-Biladi, page 182.\r\n4- Siyar A'lam al-Nubala' - Dar al-Resalah edition by Shams al-Din al-Dhahabi, Volume 6, page 264.\r\n5- Narrated by Tabari in Jami' al-Bayan, Volume 2, page 286.",
						short_description:
							"Arafat: The place where Muslims gather every year to perform the pilgrimage (Hajj). Standing on Arafat is the most important pillar of Hajj, without which Hajj is incomplete. Learn about the story of Arafat, which we narrate to you during your visit to the site.",
						category_icon:
							"https://app.mzarapp.com/storage/location/17/GrkgP89SKGhb1ZxlJRsMwayrO6PcSEPxpsHdse7v.png",
						distance: "4.94 km",
					},
					{
						id: 15,
						name: "Jabal Al-Rahmah",
						is_favorite: false,
						cover:
							"https://app.mzarapp.com/storage/location/15/JV9CGY6VG2lVcggdlN12qd9E3R8gJaF1D0KyFXFS.png",
						lat: "21.352920780061662",
						lng: "39.98482033610344",
						duration: "30 minutes",
						has_ticket: false,
						description:
							'أعوذ بالله من الشيطان الرجيم: \r\n﴿الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي وَرَضِيتُ لَكُمُ الْإِسْلَامَ دِينًا﴾. (1)\r\n\r\nHere on Mount Rahma, during the Farewell Pilgrimage, Allah revealed to His Prophet this noble verse, informing him of the completion of the message and the perfection of religion and grace. The Prophet (peace be upon him) stood by large rocks on its eastern slope, with his camel facing the Qibla, and said: "I stood here, and all of Arafat is a place of standing." He remained standing on Mount Rahma until the sun had set.(2)\r\n\r\nMount Rahma is a small hill in the middle of the plain of Arafat, with a height of no more than thirty meters. Later, a stone marker was built on it, four meters high, to serve as a guide, and thus it became commonly known as Mount Al-Qurain. The mountain is also called Mount Rahma, in the hope of the mercies that descend upon the pilgrims of the Sacred House of Allah. Surrounding Mount Rahma are the pools of Ain Zubaydah for the Arafat Canal.\r\n\r\nDue to the difficulty of ascending it, steps were built to reach its top near the marker, totaling more than ninety-one steps. Geography books refer to it as Mount Ilal or Al-Nabit, and perhaps the latter name was given to the rocks where the Prophet (peace be upon him) stood.\r\n\r\nHarun bin Antra narrated from his father, who said: When the verse "This day, I have perfected your religion for you," was revealed, on the day of the greater pilgrimage, Umar wept. The Prophet (peace be upon him) asked him: "What makes you weep?" He said: "What made me weep is that we were in an increase of our religion, but now that it is complete, nothing is completed except that it begins to diminish." The Prophet (peace be upon him) said: "You have spoken the truth." (3)\r\n\r\n❖ Sources: \r\n1- Surah Al-Ma\'idah: Verse Number: (3).\r\n2- Sharh al-Nawawi \'ala Muslim (Explanation of Nawawi on Muslim) by Al-Nawawi, Volume 8, Page 185.\r\n3- Tafsir al-Tabari - Jami\' al-Bayan (6/107-108).',
						short_description:
							"It is the mountain where pilgrims and worshipers  stand during the pilgrimage , where Allah's mercies descend. Learn about Mount rahma and other stories about it during your visit to the site.",
						category_icon:
							"https://app.mzarapp.com/storage/location/15/ejRLtLQCwUfgtGvKVxsil0MzVLCHiMSVYQr8BvVF.png",
						distance: "4.89 km",
					},
					{
						id: 19,
						name: "Namira Mosque",
						is_favorite: false,
						cover:
							"https://app.mzarapp.com/storage/location/19/VKs31yhICWRIzbDPfa0KihVfoK8nYY3wgRZw9zHy.png",
						lat: "21.353019454568614",
						lng: "39.96620178222656",
						duration: "5 minutes",
						has_ticket: false,
						description:
							'“O people, your Lord is one and your father Adam is one. There is no favor of an Arab over a foreigner, nor a foreigner over an Arab, and neither white skin over black skin, nor black skin over white skin, except by righteousness. Have I not delivered the message?”\r\n\r\n“O people: Indeed, your blood and your wealth are sacred to one another until you meet your Lord, as sacred as this day of yours in this month of yours in this land of yours. And indeed, you will meet your Lord, and He will ask you about your deeds. Verily, I have conveyed the message. So, whoever has a trust with him, let him return it to the one who entrusted him with it. ”(1)\r\n\r\nHere in Arafat, at this blessed location, the Messenger of Allah (peace and blessings be upon him) stood and delivered the Farewell Sermon. A tent was set up for him, and he prayed the Zuhr and Asr prayers. In this place, the Namira Mosque was built, also known by some as the Arafat Mosque, and it is not far from the Urana Valley.(2)\r\n\r\nThe Namira Mosque is considered the second largest mosque in terms of area in the Makkah region after the Sacred Mosque. It gained the attention of the founding king, King Abdulaziz (may Allah have mercy on him), and its area reached three hundred and forty meters from east to west, with a width of two hundred and forty meters from the north. Behind the mosque, there is a shaded area of about eight thousand square meters to the south. The mosque has six minarets, each sixty meters high, three domes, and ten main entrances containing sixty-four doors.\r\n\r\nThe Urana Valley, near this mosque, is considered outside the boundaries of Arafat, and standing there is not permissible as the Prophet (peace and blessings be upon him) said: "All of Arafat is a standing place, but keep away from the bottom of the Urana Valley."(3)\r\n\r\nIn this valley, Allah destroyed Abraha when he came with the intention of demolishing the Kaaba. It separates Arafat from the sacred site of Muzdalifah.(4)\r\n\r\n❖ Sources: \r\n1- Narrated by Muslim, Hadith number (1218).\r\n2- Narrated by Muslim in an extended hadith, number (1218).\r\n3- Narrated by Muslim, Hadith number (1218).\r\n4- Historical and Archaeological Landmarks of Mecca by Atiq Al-Baladi, Page 283.',
						short_description:
							"Namera Mosque: It is the mosque where pilgrims perform the Dhuhr and Asr prayers on the Day of Arafah. Learn about its story, the Prophet Muhammad's (peace and blessings be upon him) sermon there, and many other tales we narrate to you during your visit to the site.",
						category_icon:
							"https://app.mzarapp.com/storage/location/19/1dcZx0fy1CxTyp6lNgmourjBXkNruCXNjFPVFKxM.png",
						distance: "4.83 km",
					},
					{
						id: 27,
						name: "Zubaida Spring",
						is_favorite: false,
						cover:
							"https://app.mzarapp.com/storage/location/27/4KTSlmhCFdjEdsrAh8do3MseZFLlE1ujjBr88nno.png",
						lat: "21.36356345473334",
						lng: "39.929977079608534",
						duration: "10 minutes",
						has_ticket: false,
						description:
							'In the year 168 Hijri, Lady Zubaidah bint Abu al-Fadl Ja\'far al-Mansur, the wife of Caliph Harun al-Rashid, came for Hajj. She witnessed Makkah’s dire need for water and the suffering of its people, pilgrims, and visitors in obtaining it. Makkah was a barren land with neither water nor vegetation, except for Zamzam, which Allah the Almighty had blessed it with. However, the city continued to rely on a few wells that were insufficient to meet the needs of its residents and pilgrims.\r\nLady Zubaidah then ordered that water be brought to Makkah, even from outside its borders. Despite the natural obstacles that almost prevented this goal, engineers and workers turned to Wadi Nu‘man (below Mount Kara today) and worked diligently until water flowed from the outer lands into the sanctuary area.\r\nThe Zubaidah Spring has two main sources: the first from Wadi Nu‘man, and the second from Hunayn (near today’s Al-Shara’i). The spring originates from the village of Al-Sadr and its surrounding high mountains such as Tad and Kanthil of the Hudhayl tribe. The water flows through Wadi Hunayn, an area known for its farms and palm trees, ending at a place called Hait Hunayn. Lady Zubaidah purchased this land and dug a canal from there to bring the water into Makkah. (1)\r\n\r\nWhen she learned that the water from Hunayn was not sufficient to meet Makkah’s needs, she turned her attention to Wadi Nu‘man near Arafat. The waters were drawn from the mountains of Kara, passing through canals to Arafat, then directed around jabal al rahmah, where reservoirs were built, continuing through the holy sites and the Dabb route (the flank of Ayn Zubaidah) toward Al-Aziziyah, finally reaching Makkah. (2)\r\n\r\nThe remains of these water channels are still visible along the mountain slopes. The project’s builders had carefully designed side openings to collect floodwater into the main channel, making these secondary canals an additional source of supply. In some areas, the tunnels reach a depth of 40 meters below ground, relying on underground cisterns known as "Bazānāt".\r\nThis spring continued to supply Makkah’s people with water until the early Saudi era. When King Abdulaziz (may Allah have mercy on him) entered Makkah, he ordered its restoration, and water flowed through it once again. (3)\r\n\r\nأعوذ بالله من الشيطان الرجيم: \r\n(أَوَلَمْ نُمَكِّن لَّهُمْ حَرَمًا آمِنًا يُجْبَىٰ إِلَيْهِ ثَمَرَاتُ كُلِّ شَيْءٍ رِّزْقًا مِّن لَّدُنَّا وَلَٰكِنَّ أَكْثَرَهُمْ لَا يَعْلَمُونَ). (4)\r\n\r\n❖ Sources: \r\n1- News of Mecca by Al-Azraqi, pages 230-232.\r\n2- Shifa al-Gharam with News of the Holy Land by Taqi al-Fasi, pages 449-450.\r\n3- General Authority for Endowments (Endowment of Ain Zubaydah).\r\n4- Surah Al-Qasas, verse number (57).',
						short_description:
							"Learn about the story of Zubaida Spring: one of the greatest water projects established to serve the pilgrims of the Holy mosque. Discover the site and hear more stories when you visit it.",
						category_icon:
							"https://app.mzarapp.com/storage/location/27/LP0tU80lGz7OasiRdNGwSXlDCCxycHjmMLZqkRqp.png",
						distance: "4.77 km",
					},
					{
						id: 25,
						name: "Muzdalifah",
						is_favorite: false,
						cover:
							"https://app.mzarapp.com/storage/location/25/Tn1N5PVH9V8LMYfLkWkJzV4wKtMz42MUoGlHpnk7.png",
						lat: "21.38463784637225",
						lng: "39.91283507388772",
						duration: "Just passing through",
						has_ticket: false,
						description:
							"أعوذ بالله من الشيطان الرجيم: \r\n(فَإِذَا أَفَضْتُم مِّنْ عَرَفَاتٍ فَاذْكُرُوا اللَّهَ عِندَ الْمَشْعَرِ الْحَرَامِ ۖ وَاذْكُرُوهُ كَمَا هَدَاكُمْ وَإِن كُنتُم مِّن قَبْلِهِ لَمِنَ الضَّالِّينَ)(1)\r\n\r\nAl-Mash'ar Al-Haram is \"Muzdalifah,\" the third of the sacred sites that pilgrims pass through to perform the rites of Hajj. It is located between Mina and Arafat, separated from Arafat by the valley of Muhassir, which is outside the boundaries of the Haram. This is the place where Allah Almighty stopped the elephant of Abraha from advancing towards the Kaaba. When the Prophet (peace and blessings be upon him) approached this place, he would urge his camel and hasten in his walking.\r\n\r\nMuzdalifah is named due to people coming together (approaching it closely). It is said that it is called Muzdalifah because people arrive there in close succession or because people depart from it all at once. It is also said that it is called so because people spend the night there in the late hours of the night.(2)\r\n\r\nPilgrims arrive there after Maghrib on the 9th day, pray Maghrib and Isha at its mosque, and spend the night until the Fajr prayer, after which they gather pebbles and proceed to Mina.(3)\r\n\r\nThe total area of Muzdalifah is estimated to be more than thirteen square kilometers. It is situated between two valleys: Muhassir, which separates it from Arafat, and the valley of Uranah from the east.\r\n\r\n❖ Sources: \r\n1- Surah Al-Baqarah, verse number (198).\r\n2- I'lam al-Sajid bi Ahkam al-Masajid by Badr al-Din al-Zarkashi, page 71.\r\n3- An action of the Prophet Muhammad (peace be upon him) as reported in a hadith narrated by Muslim, hadith number (1218).",
						short_description:
							"Learn about Muzdalifah, the sacred site to which pilgrims flow from Arafat at sunset on the ninth day. Discover more stories related to this site when you visit it.",
						category_icon:
							"https://app.mzarapp.com/storage/location/25/xUTJqyhGZI2JUWGd6vs5MPEy7EIavHA5EBWl6GKl.png",
						distance: "4.72 km",
					},
					{
						id: 26,
						name: "Masjid Mash'ar al-Haram",
						is_favorite: false,
						cover:
							"https://app.mzarapp.com/storage/location/26/AidsXgec6GB4IZKJFnpDtweuW4QgpME0YK2V61tt.png",
						lat: "21.386270226826056",
						lng: "39.91230010986328",
						duration: "5 minutes",
						has_ticket: false,
						description:
							"Ali ibn Abi Talib (may Allah be pleased with him) said: When the Messenger of Allah (peace and blessings be upon him) woke up in the morning during the Farewell Pilgrimage, he stood on Quzah and said: \"This is Quzah, and this is the standing place, and all of Jam' is a standing place.\" (1)\r\n\r\nIn this place, the Messenger of Allah (peace and blessings be upon him) stood during the Farewell Pilgrimage when he moved from Arafat to Muzdalifah, which is Al-Mash'ar Al-Haram and is also called Jam'. A mosque was built at the place where he stood, and it was named Al-Mash'ar Al-Haram Mosque.(2)\r\n\r\nPilgrims arrive there after Maghrib on the 9th day of Hajj and perform the Maghrib and Isha prayers there. It is also known as Muzdalifah Mosque.\r\n\r\nThe mosque's construction was modest throughout history until the Saudi era. In the year 1359 Hijri, the mosque's area was expanded to six thousand square meters, accommodating more than twelve thousand worshippers.(3)\r\n\r\nIts design incorporated Islamic architecture, and two minarets, each forty meters high, were added. Entrances were built on the northern, southern, and eastern sides, and its walls were adorned with six hundred and forty geometric plaster decorations. The height of the mosque's mihrab exceeds four meters.\r\n\r\nIbn Umar (may Allah be pleased with him) reported: The Messenger of Allah (peace and blessings be upon him) delivered a sermon to us in the morning at Jam' (Muzdalifah) and said: \"O people, indeed Allah has granted you grace in this standing place of yours. He has accepted the good deeds from the righteous among you and has forgiven the wrongdoers due to the intercession of the righteous. Therefore, reconcile your differences and depart in the name of Allah.\"\r\n\r\n❖ Sources: \r\n1- Narrated by Ahmad (2/454)\r\n2- Mentioned in a hadith narrated by Jabir bin Abdullah in Sahih Muslim, hadith number (1218).\r\n3- Arabic News",
						short_description:
							"Pilgrims and worshippers perform the Maghrib and Isha prayers combined and shortened at Al-Mash'ar Al-Haram Mosque. Learn about the details and story of this mosque when you visit this site",
						category_icon:
							"https://app.mzarapp.com/storage/location/26/rjkSjtlwYjcEMSnWS5H5FUn428qCqpCBq1FEUBuS.png",
						distance: "4.67 km",
					},
					{
						id: 30,
						name: "Mina",
						is_favorite: false,
						cover:
							"https://app.mzarapp.com/storage/location/30/ervDqVJFtZkVPEPZmlCft01ZT86eR6GoHl6vwikG.png",
						lat: "21.395614311877967",
						lng: "39.90018898892243",
						duration: "Just passing through",
						has_ticket: false,
						description:
							'أعوذ بالله من الشيطان الرجيم: \r\n(فَلَمَّا بَلَغَ مَعَهُ ٱلسَّعْىَ قَالَ يَٰبُنَىَّ إِنِّىٓ أَرَىٰ فِى ٱلْمَنَامِ أَنِّىٓ أَذْبَحُكَ فَٱنظُرْ مَاذَا تَرَىٰ ۚ قَالَ يَٰٓأَبَتِ ٱفْعَلْ مَا تُؤْمَرُ ۖ سَتَجِدُنِىٓ إِن شَآءَ ٱللَّهُ مِنَ ٱلصَّٰبِرِينَ) (1)\r\n\r\nHere, to the west of Mina, on Mount Thabir, the angel Jibril (peace be upon him) descended to Ibrahim (peace be upon him) with the ram to ransom his son Ismail (peace be upon him). Ibn Abbas (may Allah be pleased with him) said: The rock in Mina at the base of Thabir is the rock on which Ibrahim sacrificed the ram instead of his son. The ram with prominent eyes and horns descended from Thabir and bleated; Ibrahim sacrificed it. This is the same ram that the son of Adam offered, and it was accepted from him and stored until it was used for this ransom.(2)\r\n\r\nMina is one of the three sacred sites of Hajj that pilgrims visit twice during the days of Hajj. On the 8th day of Dhu al-Hijjah, known as the Day of Tarwiyah, pilgrims come to Mina and spend the night there. They return on the morning of the 10th day to perform the stoning of the Jamarat and then spend the nights of Tashreeq in Mina.(3)\r\n\r\nIn Mina, there are the Jamarat, the place of sacrifice, Al-Khayf Mosque, Al-Kabsh Mosque, Al-Mursalat Mosque, and the Sha\'b Al-Ansar, which later became known as the Mosque of Al-Bay\'ah. (4)\r\n\r\nMina is only about 6 kilometers away from the Sacred Mosque.\r\n\r\nThe reason for naming it Mina is said to be because of the blood of the sacrificial animals and ransoms shed there.\r\n\r\n❖ Sources: \r\n1- Surah As-Saffat verse number (102).\r\n2- "Shifa\' al-Gharam bi Akhbar al-Balad al-Haram" (The Cure of Passion with the News of the Sacred Land) by Al-Taqi al-Fasi, p. 12.\r\n3- Mentioned in Sahih Muslim, hadith number (1218).\r\n4- "Landmarks of Mecca\'s History and Archaeology" by Atiq al-Baladi, p. 290.\r\n5- "Muthir Al-\'Izzah Asakin ila Ashraf al-Amakin" (Stirring the Noble to the Most Honorable Places) by Ibn al-Jawzi, p. 206.',
						short_description:
							"Learn about Mina, the sacred site visited by pilgrims twice during Hajj. Discover other landmarks in this blessed area when you visit this destination.",
						category_icon:
							"https://app.mzarapp.com/storage/location/30/TtE3r5Ud51b7IbnJPLUecDImuDGDMTGBxNm5ebPS.png",
						distance: "4.62 km",
					},
					{
						id: 43,
						name: "Jamarat",
						is_favorite: false,
						cover:
							"https://app.mzarapp.com/storage/location/43/WbZ2saJu37PypV6Txs9d2xqq8HXjEy2d05twojy8.png",
						lat: "21.421099441824918",
						lng: "39.86796707147425",
						duration: "Just passing through",
						has_ticket: false,
						description:
							'On the authority of Ibn Abbas (may Allah be pleased with him), the Messenger of Allah (peace and blessings be upon him) said: When Ibrahim (Abraham), the friend of Allah, came to perform the rituals, Satan appeared to him at the location of the Jamrat al-Aqabah. So Ibrahim threw seven pebbles at him until Satan sank into the ground. Then Satan appeared to him at the location of the second Jamrah, so he threw seven pebbles at him until Satan sank into the ground. Then Satan appeared to him at the location of the third Jamrah, so Ibrahim threw seven pebbles at him until Satan sank into the ground. Ibn Abbas said: "You are stoning the devil and following the tradition of your father Ibrahim (1)\r\n\r\nThrowing the pebbles (Ramy al-Jamarat) is one of the rituals of Hajj, following the tradition of the friend of Allah, Ibrahim (peace be upon him). The three locations for stoning are: Jamrat al-Aqabah, the middle Jamrah, and the small Jamrah.\r\n\r\nThe Jamarat of Aqaba was only stoned from one side, which is the southwestern side, due to the presence of a mountain behind it, which it leaned against. This mountain was removed in the year 1376 AH to expand the area, and a structure was built in its place to prevent stoning from that side.\r\n\r\nThe Saudi government has paid great attention to facilitating the performance of the rituals and easing the burden on the pilgrims. They constructed the Jamrat Bridge, which extends from east to west, with a gentle slope designed to make it easy for elderly pilgrims and those using wheelchairs. Three openings were made for the stoning sites, allowing the pebbles to fall through a chute surrounding each Jamrah.\r\n\r\nDuring the reign of the Custodian of the Two Holy Mosques, King Abdullah bin Abdulaziz (may Allah have mercy on him), the Jamrat area was developed into a multi-level structure with five floors. Numerous entrances and exits were created to reduce crowding, along with escalators and elevators for the elderly and people with special needs. (2)\r\n\r\n❖ Sources : \r\n1- Narrated by Al-Hakim, Hadith No. (1713), and Al-Bayhaqi, Hadith No. (9975).\r\n2- King Abdulaziz Foundation for Research and Archives (Darah).',
						short_description:
							"Discover the Jamarat Bridge facility, which contains the three Jamarat visited by pilgrims during the days of Hajj, along with other stories we narrate to you when you visit this destination.",
						category_icon:
							"https://app.mzarapp.com/storage/location/43/utJYxZUcmA8H16nRHzLzXozywR4GYkLHrSphqnGP.png",
						distance: "4.57 km",
					},
					{
						id: 23,
						name: "Al-Khaif Mosque",
						is_favorite: false,
						cover:
							"https://app.mzarapp.com/storage/location/23/1nRvbtrKJDoawWoVEIyT0g8pUxMwLKvhp2JGoDHX.png",
						lat: "21.415038835840903",
						lng: "39.87813949584961",
						duration: "4 minutes",
						has_ticket: false,
						description:
							'Abdullah ibn Abbas (may Allah be pleased with him) reported that the Messenger of Allah (peace and blessings be upon him) said: "Seventy prophets prayed in the Mosque of Al-Khayf; among them was Musa, and it is as if I can see him." (1)\r\n\r\nThe Mosque of Al-Khayf, also known as the Mosque of the Prophets, is the mosque of Mina.It is a place where the Prophet (peace and blessings be upon him) prayed, as did the prophets before him. It is known as the Mosque of Al-Khayf because it is located in the lower part of Mount Al-Sabeh, and in the Arabic language, "khayf" refers to a place that slopes down from a mountain and rises above the valley.(2)\r\n\r\nOn this Mount Al-Sabeh, there is a cave known as the Cave of Al-Mursalat, the place where the Prophet (peace and blessings be upon him) sat, and Surah Al-Mursalat was revealed to him.(3)\r\n\r\nThe mosque is not far from the site of the Jamarat and is seven kilometers away from the Sacred Mosque. Its first construction took place in the Abbasid era in the year 256 Hijri. Successive Muslim caliphs maintained it until the Saudi reconstruction in the year 1402 Hijri, where the mosque took its modern architectural form with its four minarets. Its total area became twenty-five thousand square meters, accommodating about forty-five thousand worshippers.\r\n\r\n❖ Sources: \r\n1- Narrated by Al-Tabarani in Al-Mu\'jam Al-Awsat (5407).\r\n2- "I\'lam al-Sajid bi Ahkam al-Masajid" (Informing the Worshiper About the Rulings of Mosques) by Badr al-Din al-Zarkashi, p. 68.\r\n3- "Shifa\' al-Gharam bi Akhbar al-Balad al-Haram" (The Cure of Passion with the News of the Sacred Land) by Al-Taqi al-Fasi, p. 373.',
						short_description:
							"Al-Khaif Mosque is a place where the Messenger of Allah (Peace be upon him) prayed, as did the prophets before him. Discover the story of this mosque when you visit the destination.",
						category_icon:
							"https://app.mzarapp.com/storage/location/23/u9TSMfnfpxFYf4iy7TPUkVRTC4qPs6GGDSdabsZA.png",
						distance: "4.52 km",
					},
					{
						id: 13,
						name: "Hira (Al-Noor) Mountain and Hira Cultural District",
						is_favorite: false,
						cover:
							"https://app.mzarapp.com/storage/location/13/c3Jl5GHdhAVReV1rveR7enDwWqWcnxzdMQahBJKi.png",
						lat: "21.4560480306944",
						lng: "39.86900255084038",
						duration: "90 minutes",
						has_ticket: true,
						description:
							"For six hundred years after Allah elevated His Prophet Isa , peace be upon him, the revelation from heaven ceased. The people remained in ignorance during a period devoid of messengers, wandering in their misguidance, deviating according to their desires, except for the Prophet of Allah, Muhammad bin Abdullah. Allah chose him, selected him, purified him from the idolatry and misguidance of the Age of Ignorance, and guided him to the light of truth and the natural disposition. \r\n\r\nHe used to withdraw from his people for a full month every year, in solitude with his Lord, spending day and night in the Cave of Hira on the Jabal Al Noor (Mountain of Noor). This mountain, located northeast of Makkah, about seven kilometers from the Kaaba, is distinguished by its unique shape, resembling the hump of a camel or a smooth dome. It stands tall at an elevation of six hundred and thirty-four meters above sea level. The cave at its summit, facing south towards the Qibla, has a crevice through which the Kaaba can be seen. \r\n\r\nThis mountain represents the western edge of the Valley of Ibrahim and is commonly known as the Mountain of Noor, named for the light that descended upon the Chosen One, peace and blessings be upon him, with the revelation of the verses of the Holy Quran in this blessed place. \r\n\r\nThe Prophet, peace and blessings be upon him, continued his practice of withdrawing from his people every year. Then, during the month of Ramadan in the third year of his solitude, by the will of the Almighty, blessed and exalted, to bestow His mercy upon the inhabitants of the earth, revelation descended upon him in the Cave of Hira when he had reached the age of forty. \r\n\r\nA'isha, the wife of the Messenger of Allah may Allah be pleased with her, reported: The first (form) with which was started the revelation to the Messenger of Allah was the true vision in sleep. And he did not see any vision but it came like the bright gleam of dawn. Thenceforth solitude became dear to him and he used to seclude himself in the cave of Hira', where he would engage in tahannuth (and that is a worship for a number of nights) before returning to his family and getting provisions again for this purpose. He would then return to Khadija and take provisions for a like period, till Truth came upon him while he was in the cave of Hira'. There came to him the angel and said: Recite, to which he replied: I am not lettered. He took hold of me [the Apostle said] and pressed me, till I was hard pressed; thereafter he let me off and said: Recite. I said: I am not lettered. He then again took hold of me and pressed me for the second time till I was hard pressed and then let me off and said: Recite, to which I replied: I am not lettered. He took hold of me and pressed me for the third time, till I was hard pressed and then let me go and said:\r\n\r\nاقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ (1) خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ (2) اقْرَأْ وَرَبُّكَ الْأَكْرَمُ (3) (1)\r\n Surah al 'Alaq. Narrated by Al-Bukhari. \r\n\r\nThere is not a mountain, valley, pass, or even a grain of sand in Makkah that does not have a story with the Prophet, peace and blessings be upon him.\r\n\r\n❖ Sources: \r\n1- Narrated by al-Bukhari, Hadith number (6982).",
						short_description:
							"There is no mountain, valley, or pathway in Makkah without a story connected to the Messenger of Allah (Peace be upon him). Jabal Al-Nour is one of these landmarks that witnessed moments with the Messenger of Allah (Peace be upon him), and we recount these stories to you when you visit this destination.",
						category_icon:
							"https://app.mzarapp.com/storage/location/13/Xe2hYmwsKoKFcrLVBSYjA2JENnW1Plx7CsVw6gor.png",
						distance: "4.48 km",
					},
			  ],
    mapLocations: [
			{ lat: 21.4225, lng: 39.8262, label: isAr ? "المسجد الحرام" : "Masjid al-Haram" }, 
		],
    mapCenter: { lat: 21.4225, lng: 39.8262 },
    mapLink:"https://www.google.com/maps/search/?api=1&query=21.4225,39.8262",
	};
}
