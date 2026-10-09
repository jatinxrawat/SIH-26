import React from 'react';
import { Users, Store, Route } from 'lucide-react';
import SectionHeader from './common/SectionHeader';
import { useLanguage } from '../context/LanguageContext';
import { localizeBusinessValue } from '../i18n/platformTranslations';

export default function ImpactSection() {
  const { t, language } = useLanguage();

  const stats = [
    {
      figure: "1.5B+",
      qualifier: language === 'hi' ? 'भारतीय नागरिक' : language === 'mr' ? 'भारतीय नागरिक' : language === 'bn' ? 'ভারতীয় নাগরিক' : 'People in India',
      role: language === 'hi' ? 'किसके लिए निर्मित' : language === 'mr' ? 'यांच्यासाठी' : language === 'bn' ? 'যাদের জন্য তৈরি' : 'Designed for',
      context: language === 'hi'
        ? 'जमीनी आकांक्षाओं, ग्रामीण शिल्प परंपराओं और नवप्रवर्तकों द्वारा संचालित एक सशक्त राष्ट्र।'
        : language === 'mr'
        ? 'ग्रामीण कारागीर आणि पहिल्या पिढीतील नवउद्योजकांसाठी.'
        : language === 'bn'
        ? 'তৃণমূল উদ্যোক্তা এবং গ্রামীণ কারিগরদের সহায়তায় নিবেদিত।'
        : 'A nation driven by grassroot aspirations, rural craft traditions, and first-generation innovators.',
      icon: Users,
    },
    {
      figure: "Millions",
      qualifier: language === 'hi' ? 'सूक्ष्म व लघु उद्यमी' : language === 'mr' ? 'सूक्ष्म व लघू उद्योजक' : language === 'bn' ? 'ক্ষুদ্র ও মাঝারি উদ্যোক্তা' : 'of micro & small entrepreneurs',
      role: language === 'hi' ? 'केंद्र बिंदु' : language === 'mr' ? 'केंद्रस्थानी' : language === 'bn' ? 'প্রধান লক্ষ্য' : 'Built around',
      context: language === 'hi'
        ? 'जीडीपी का 30%+ हिस्सा बनाने वाला आर्थिक स्तंभ, जिसे व्यक्तिगत मार्गदर्शन की आवश्यकता है।'
        : language === 'mr'
        ? 'भारताच्या अर्थव्यवस्थेचा कणा असणारे उद्योग.'
        : language === 'bn'
        ? 'দেশের অর্থনৈতিক স্তম্ভ যা জিডিপির ৩০% অবদান রাখে।'
        : 'The economic backbone forming 30%+ of GDP, yet navigating fragmented portals with zero personalized guidance.',
      icon: Store,
    },
    {
      figure: "1 Journey",
      qualifier: language === 'hi' ? 'व्यापार समर्थन को सरल बनाने हेतु' : language === 'mr' ? 'व्यवसाय प्रवास सुलभ करण्यासाठी' : language === 'bn' ? 'ব্যবসায়িক প্রক্রিয়া সহজ করতে' : 'to simplify business support',
      role: language === 'hi' ? 'एक एकीकृत यात्रा' : language === 'mr' ? 'एकत्रित प्रवास' : language === 'bn' ? 'একীভূত যাত্রা' : 'One unified journey',
      context: language === 'hi'
        ? '1,200+ योजनाओं, बैंकिंग ऋण, अनुपालन और अगले सर्वोत्तम कदम को आपस में जोड़ना।'
        : language === 'mr'
        ? '१,२००+ शासकीय योजना आणि बँक कर्ज एकत्र जोडणे.'
        : language === 'bn'
        ? '১২০০+ প্রকল্প এবং ব্যাংক ঋণের সমন্বয়।'
        : 'Connecting 1,200+ schemes, banking credit appraisals, compliance filing, and the single next best action.',
      icon: Route,
    }
  ];

  return (
    <section id="impact" className="py-20 md:py-28 bg-sand/40 border-t border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge={t('landing.impactTitle', 'National Scale & Vision')}
          title={t('landing.impactTitle', 'Empowering the engines of Bharat.')}
          subtitle={t('landing.impactSubtitle', 'Engineered to solve the structural information asymmetry that separates rural ambition from national growth.')}
          align="center"
        />

        {/* 3 Large Honest Impact Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-soft-sm hover:shadow-soft-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/70">
                      {item.role}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-700">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
                    {item.figure}
                  </div>

                  <div className="text-base sm:text-lg font-bold text-slate-800 mt-2">
                    {item.qualifier}
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.context}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>National Enterprise Initiative</span>
                  <span>Digital Public Good</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
