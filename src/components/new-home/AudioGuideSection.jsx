"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./AudioGuideSection.module.css";
import { 
  Play, 
  Pause, 
  Download, 
  Volume2, 
  MapPin, 
  Check, 
  Sparkles, 
  MessageCircle 
} from "lucide-react";

export default function AudioGuideSection({ lang = "ar" }) {
  const isAr = lang === "ar";
  const [selectedLanguage, setSelectedLanguage] = useState("ar");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30); // 30 seconds demo default
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  const APP_DOWNLOAD_URL = "https://onelink.to/yb2xky";
  const WHATSAPP_NUMBER = "966580121025";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    isAr
      ? "مرحبًا مزار، أود الاستفسار عن المرشد الصوتي والجولات المدعومة"
      : "Hello Mzar, I would like to inquire about the audio guide and supported tours"
  )}`;

  // Multi-language station data for Jabal Al-Nour (جبل النور)
  const languagesData = {
    ar: {
      name: "العربية",
      title: "جبل النور — قصة نزول الوحي",
      transcript:
        "على سفح جبل النور، تبدأ قصة من أعظم قصص التاريخ. هنا كان النبي ﷺ يتعبد في غار حراء، قبل أن تبدأ لحظة الوحي الأولى.",
      audioSrc: "/Jabal-Al-Nour/Arabic.mp3",
    },
    en: {
      name: "English",
      title: "Jabal Al-Nour — Story of Revelation",
      transcript:
        "At the foot of Jabal Al-Noor begins one of history’s greatest stories. Here, the Prophet ﷺ worshipped in the Cave of Hira before the first revelation.",
      audioSrc: "/Jabal-Al-Nour/English.mp3",
    },
    fr: {
      name: "Français",
      title: "Mont Al-Nour — L'Histoire de la Révélation",
      transcript:
        "Au pied du mont Al-Nour commence une histoire majeure. C’est ici que le Prophète ﷺ méditait dans la grotte de Hira avant la première révélation.",
      audioSrc: "/Jabal-Al-Nour/French.mp3",
    },
    tr: {
      name: "Türkçe",
      title: "Nur Dağı — Vahyin İniş Hikayesi",
      transcript:
        "Nur Dağı’nın eteklerinde tarihin en büyük hikâyelerinden biri başlar. Peygamber ﷺ Hira Mağarası’nda ilk vahiyden önce ibadet ederdi.",
      audioSrc: "/Jabal-Al-Nour/Turkish.mp3",
    },
    ur: {
      name: "اردو",
      title: "جبل نور — نزول وحی کی داستان",
      transcript:
        "جبل نور کے دامن میں تاریخ کی ایک عظیم داستان شروع ہوتی ہے۔ یہاں نبی ﷺ غار حرا میں عبادت فرمایا کرتے تھے۔",
      audioSrc: "/Jabal-Al-Nour/Urdu.mp3",
    },
    ms: {
      name: "Bahasa Melayu",
      title: "Jabal Al-Nour — Kisah Penurunan Wahyu",
      transcript:
        "Di kaki Jabal Al-Nour bermula salah satu kisah teragung sejarah. Di sinilah Nabi ﷺ beribadah di Gua Hira sebelum wahyu pertama turun.",
      audioSrc: "/Jabal-Al-Nour/Malayu.mp3",
    },
    ru: {
      name: "Русский",
      title: "Гора ан-Нур — История ниспослания откровения",
      transcript:
        "У подножия горы ан-Нур начинается одна из величайших историй. Здесь Пророк ﷺ уединялся в пещере Хира перед первым откровением.",
      audioSrc: "/Jabal-Al-Nour/Russian.mp3",
    },
  };

  const currentContent = languagesData[selectedLanguage] || languagesData.ar;

  // Handle language switch
  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    pauseAudio();
    setSelectedLanguage(newLang);
    setCurrentTime(0);
  };

  const playAudio = () => {
    setIsPlaying(true);

    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Fallback: Use speech synthesis or simulated progression if audio file fails
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(currentContent.transcript);
          utterance.lang = selectedLanguage === "ar" ? "ar-SA" : selectedLanguage;
          window.speechSynthesis.speak(utterance);
        }
      });
    }

    // Simulated progress timer
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) {
          pauseAudio();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const pauseAudio = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const handleSeek = (e) => {
    const track = e.currentTarget;
    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = Math.floor(percentage * duration);
    setCurrentTime(newTime);
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = newTime;
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${String(mins).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
  };

  const progressPercent = (currentTime / duration) * 100;

  const audioStats = [
    {
      num: isAr ? "7 لغات" : "7 Languages",
      desc: isAr ? "تجربة تناسب الزوار من مختلف الجنسيات" : "An experience tailored for visitors worldwide",
    },
    {
      num: isAr ? "تشغيل ذكي" : "Smart Playback",
      desc: isAr ? "المحتوى المناسب يظهر حسب موقعك" : "Relevant content plays based on your location",
    },
    {
      num: isAr ? "محتوى موثوق" : "Verified Content",
      desc: isAr ? "مراجعة تاريخية ومعرفية للمحطات" : "Thorough historical review for every landmark",
    },
    {
      num: isAr ? "24/7" : "24/7 Access",
      desc: isAr ? "استكشف المعالم في الوقت المناسب لك" : "Explore landmarks at your own convenience",
    },
  ];

  const howItWorksSteps = isAr
    ? [
        { step: "1", text: "اقترب من المعلم" },
        { step: "2", text: "يتعرف التطبيق على موقعك" },
        { step: "3", text: "اختر لغتك المفضلة" },
        { step: "4", text: "استمع أثناء التجول" },
        { step: "5", text: "احفظ ذكريات زيارتك" },
      ]
    : [
        { step: "1", text: "Approach the landmark" },
        { step: "2", text: "App detects location" },
        { step: "3", text: "Choose your language" },
        { step: "4", text: "Listen while exploring" },
        { step: "5", text: "Save visit memories" },
      ];

  const compareItems = {
    traditional: {
      title: isAr ? "الجولة التقليدية" : "Traditional Tour",
      points: isAr
        ? [
            "موعد وسرعة ثابتان للجميع",
            "لغة واحدة فقط للمجموعة",
            "ينتهي المحتوى بانتهاء الجولة",
          ]
        : [
            "Fixed schedule and group pace",
            "Single language for the entire group",
            "Content ends once the tour concludes",
          ],
    },
    mzar: {
      title: isAr ? "تجربة مزار الذكية" : "Mzar Smart Experience",
      points: isAr
        ? [
            "ابدأ في الوقت والسرعة المناسبة لك",
            "سبع لغات عالمية وإيقاعك الخاص",
            "احتفظ بالمحتوى داخل التطبيق دائمًا",
          ]
        : [
            "Start anytime at your own preferred pace",
            "7 global languages for family members",
            "Keep content inside the app forever",
          ],
    },
  };

  return (
    <section className={styles.audioSection} id="audio">
      {/* Hidden Audio element */}
      <audio
        ref={audioRef}
        src={currentContent.audioSrc}
        onLoadedMetadata={() => {
          if (audioRef.current && audioRef.current.duration && !isNaN(audioRef.current.duration)) {
            setDuration(Math.floor(audioRef.current.duration));
          }
        }}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(Math.floor(audioRef.current.currentTime));
            if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
              setDuration(Math.floor(audioRef.current.duration));
            }
          }
        }}
        onEnded={() => pauseAudio()}
        preload="metadata"
      />

      <div className={styles.container}>
        {/* Audio Intro Header */}
        <div className={styles.audioIntro}>
          <div>
            <span className={styles.eyebrow}>
              {isAr ? "ميزة مزار التنافسية" : "Mzar's Competitive Edge"}
            </span>
            <h2 className={styles.title}>
              {isAr ? "المكان يروي قصته بلغتك" : "The Place Tells Its Story in Your Language"}
            </h2>
            <p className={styles.subtitle}>
              {isAr
                ? "مرشد صوتي ذكي يتفاعل مع موقعك ويصحبك بين معالم مكة والمدينة بمحتوى موثوق وبسبع لغات عالمية."
                : "A smart audio guide that interacts with your location, accompanying you through the landmarks of Makkah and Madinah with authentic content in 7 global languages."}
            </p>
          </div>

          <div className={styles.audioStats}>
            {audioStats.map((stat, idx) => (
              <div key={idx} className={styles.audioStat}>
                <strong>{stat.num}</strong>
                <span>{stat.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Audio Demo (Map station + Player) */}
        <div className={styles.audioDemo}>
          {/* Station Map Side (Jabal Al-Nour only) */}
          <div className={styles.routeMap}>
            <h3>{isAr ? "مسار معالم مكة" : "Makkah Landmarks Route"}</h3>
            <p>
              {isAr
                ? "استمع إلى نموذج تجربة المحتوى الإثرائي المرتبط بالمكان."
                : "Experience a preview of the location-aware audio guide."}
            </p>
            <div className={styles.mapStations}>
              <div className={styles.mapStation}>
                <div className={styles.stationPin}>1</div>
                <div className={styles.stationInfo}>
                  <div className={styles.stationHeader}>
                    <strong>{isAr ? "جبل النور" : "Jabal Al-Nour"}</strong>
                    <span className={styles.stationDistance}>
                      {isAr ? "الموقع الحالي" : "Current Location"}
                    </span>
                  </div>
                  <small>
                    {isAr ? "قصة نزول الوحي وغار حراء" : "Story of the Revelation & Cave of Hira"}
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Player Side */}
          <div className={styles.audioPlayer}>
            <div className={styles.audioCover}>
              <span className={styles.coverBadge}>
                {isAr ? "يتفاعل مع موقعك" : "Location Aware"}
              </span>
              <div className={styles.coverText}>
                <small>{isAr ? "مكة المكرمة" : "Makkah Al-Mukarramah"}</small>
                <h3>{currentContent.title}</h3>
              </div>
            </div>

            <div className={styles.playerBody}>
              <div className={styles.playerToolbar}>
                <button
                  type="button"
                  className={styles.playDemo}
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  )}
                </button>

                <div className={styles.playerMeta}>
                  <strong>
                    {isAr ? "استمع إلى نموذج قصير" : "Listen to a Short Preview"}
                  </strong>
                  <span>
                    {isAr ? "محتوى إثرائي مرتبط بالموقع" : "Enriching location-based audio"}
                  </span>
                </div>

                <select
                  className={styles.languageSelect}
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                  aria-label={isAr ? "لغة المقطع" : "Audio language"}
                >
                  {Object.entries(languagesData).map(([code, item]) => (
                    <option key={code} value={code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Progress Bar */}
              <div
                className={styles.progressTrack}
                onClick={handleSeek}
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className={styles.progressFill}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className={styles.progressTimes}>
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              {/* Transcript - Commented out for now
              <div className={styles.audioTranscript}>
                {currentContent.transcript}
              </div>
              */}
            </div>
          </div>
        </div>

        {/* 5 How it works steps */}
        <div className={styles.audioHow}>
          {howItWorksSteps.map((step) => (
            <div key={step.step} className={styles.audioHowItem}>
              <b>{step.step}</b>
              {step.text}
            </div>
          ))}
        </div>

        {/* Comparison Cards */}
        <div className={styles.audioCompare}>
          <div className={styles.compareCard}>
            <h3>{compareItems.traditional.title}</h3>
            <ul>
              {compareItems.traditional.points.map((pt, i) => (
                <li key={i}>
                  <span>•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.compareCard}>
            <h3>{compareItems.mzar.title}</h3>
            <ul>
              {compareItems.mzar.points.map((pt, i) => (
                <li key={i}>
                  <Check className="w-5 h-5 text-[#ead494]" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Audio Action Buttons */}
        <div className={styles.audioActions}>
          <button
            type="button"
            className={styles.btnLight}
            onClick={() => {
              const el = document.getElementById("audio");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
              if (!isPlaying) {
                playAudio();
              }
            }}
          >
            <Volume2 className="w-5 h-5 text-[#315f4c]" />
            <span>{isAr ? "استمع إلى نموذج" : "Listen to Sample"}</span>
          </button>

          <a
            className={styles.btnPrimaryAction}
            href={APP_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download className="w-5 h-5" />
            <span>{isAr ? "حمّل تطبيق مزار" : "Download Mzar App"}</span>
          </a>

          <a
            className={styles.btnOutlineLight}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{isAr ? "تواصل معنا عبر واتساب" : "Contact via WhatsApp"}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
