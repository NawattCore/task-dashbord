import React from 'react';
import ReactCountryFlag from 'react-country-flag';
const InfoOfBrand = () => {
  interface DetailsOfBrand {
    label: string;
    value: string;
    icon?: string | React.ReactNode;
  }

  const detailsOfBrand: DetailsOfBrand[] = [
    {
      label: 'اسم العلامة التجارية',
      value: 'أورا بيوتي',
    },
    {
      label: 'اسم المستخدم',
      value: 'أورا بيوتي',
    },
    {
      label: 'البريد الإلكتروني',
      value: 'Aurabeauty@gmail.com',
    },

    {
      label: 'الدولة',
      value: 'السعودية',
    },
    {
      label: 'رقم الهاتف',
      value: '+996 1515655468',
      icon: (
        <ReactCountryFlag
          countryCode={'SA'}
          svg
          style={{
            width: '21px',
            height: '21px',
            borderRadius: '2px',
          }}
        />
      ),
    },
    {
      label: 'الحالة',
      value: 'نشطة',
    },
    {
      label: 'تاريخ الانتهاء الصلاحية',
      value: '20-05-2026',
    },
    {
      label: 'تاريخ الإنشاء',
      value: '20-05-2026',
    },
    {
      label: 'أقصى عدد مؤثرين',
      value: '26',
    },
  ];

  return (
    <div className=" w-full flex flex-col gap-5">
      <div className="flex flex-col gap-2  text-right">
        <div className="text-xl text-white font-medium max-md:text-[16px]">
          بيانات العلامة التجارية
        </div>
        <div className="text-sm text-gray-400 max-md:text-sm font-light">
          الحملات التي تم إطلاقها في العام الحالي
        </div>
      </div>
      <div className="lg:h-[450px] overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2  gap-5 max-lg:gap-3">
          {detailsOfBrand.map((detail, index) => (
            <div key={index} className="flex flex-col gap-3 text-right">
              <div className="border border-[#FFFFFF1A] rounded-2xl px-4 py-3 text-white text-right min-h-[50px] flex items-center">
                <div
                  dir="ltr"
                  className="w-full  text-white flex justify-end items-center gap-2"
                >
                  {detail?.icon} {detail.value}
                  <div className="text-main-mute text-sm ">
                    : {detail.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoOfBrand;
