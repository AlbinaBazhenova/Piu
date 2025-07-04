import React, { useState } from 'react';

const PMZSerbiaApp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [useAIVersion, setUseAIVersion] = useState(false);
  const [personalData, setPersonalData] = useState({
    // Основные данные
    surname: '',
    name: '',
    sex: '',
    parentName: '',
    birthDate: '',
    birthPlace: '',
    nationality: '',
    personalNumber: '',
    // Адрес в Сербии
    address: '',
    phone: '',
    email: '',
    // Предыдущие временные статусы
    previousResidencePurpose: '',
    asylumDecisionNumber: '',
    // Паспортные данные
    passportType: '',
    passportNumber: '',
    passportIssueDate: '',
    passportExpiryDate: '',
    // Прерывание пребывания
    residenceBreakFrom: '',
    residenceBreakTo: '',
    // Работа
    employerName: '',
    employerLocation: '',
    employerPIB: '',
    employerMaticni: '',
    // Воссоединение семьи
    familyPersonName: '',
    familyPersonNumber: '',
    familyPersonNationality: '',
    familyPersonStatus: '',
    // Дети
    children: [],
    // Родственники/происхождение
    relativesInfo: '',
    serbianOrigin: '',
    // Для автобиографии
    education: '',
    profession: '',
    spouseName: '',
    spouseBirthDate: '',
    spouseBirthPlace: '',
    marriageDate: '',
    parentsInfo: '',
    serbiaActivities: ''
  });

  const documents = [
    {
      title: "Заявление на получение ПМЖ",
      description: "Заполненное заявление 'ЗАХТЕВ ЗА ОДОБРЕЊЕ СТАЛНОГ НАСТАЊЕЊА'",
      details: [
        "Заполните анкету разборчиво сербской латиницей ЗАГЛАВНЫМИ БУКВАМИ",
        "Можно заполнить на компьютере и распечатать",
        "Имя и фамилия как в загранпаспорте",
        "Для детей нужна подпись обоих родителей",
        "Печать на обеих сторонах листа (двухсторонняя печать)",
        "Форма содержит 14 основных пунктов данных"
      ],
      required: true,
      hasForm: true
    },
    {
      title: "Госпошлины",
      description: "Квитанции об уплате госпошлин за получение ПМЖ",
      details: [
        "Оплачивается онлайн на сайте eUprava",
        "Ссылка: https://plati.euprava.gov.rs/#/",
        "Выберите: Физическое лицо → МУП → СТРАНЦИ → Одобрење сталног настањења",
        "Укажите вашу общину (нпр. ГРАД БЕОГРАД - СТАРИ ГРАД)",
        "Сохраните все квитанции об оплате",
        "Размер пошлины уточняйте в системе"
      ],
      required: true,
      hasInstruction: true
    },
    {
      title: "Автобиография",
      description: "На сербском языке кириллицей/латиницей (с AI-улучшением)",
      details: [
        "В свободной форме рассказ о себе",
        "Информация о себе, образовании, карьере",
        "Информация о супруге/детях, где родились, образование",
        "Когда вступили в брак, когда родились дети",
        "Информация о родителях",
        "Чем занимались в Сербии последние 3 года",
        "Объем: полстраницы/страница",
        "✨ Доступна AI-улучшенная версия с профессиональными формулировками"
      ],
      required: true,
      hasForm: true
    },
    {
      title: "Копия загранпаспорта",
      description: "Копии всех страниц паспорта (включая детей)",
      details: [
        "Копии ВСЕХ страниц, включая пустые",
        "Нужно для каждого члена семьи, включая детей"
      ],
      required: true
    },
    {
      title: "ИД карта",
      description: "Отчитанная ИД карта (если есть)",
      details: [
        "Предоставить если у вас есть ИД карта в Сербии"
      ],
      required: false
    },
    {
      title: "Свидетельство о рождении",
      description: "Оригинал перевода (редко требуется)",
      details: [
        "Перевод должен быть сделан судебным переводчиком",
        "Требуется редко, по запросу МУП"
      ],
      required: false
    },
    {
      title: "Здравствена книжица/картица",
      description: "Копия медицинской страховки",
      details: [
        "Страховка нужна на каждого члена семьи, включая детей",
        "Если нет ОМС, можно оформить частную страховку на 1 год"
      ],
      required: true
    },
    {
      title: "Подтверждение средств",
      description: "Выписка из сербского банка (~700 евро на человека)",
      details: [
        "Эквивалент ~700 евро на каждого человека (включая детей)",
        "ТОЛЬКО из сербского банка!",
        "На сербском языке с логотипом банка",
        "С личного счета (не бизнес)",
        "Действует ~30 дней от даты выдачи",
        "Альтернатива: контракт на работу в сербской компании",
        "Рекомендуется держать деньги на счету до получения решения"
      ],
      required: true
    },
    {
      title: "Гарантийное письмо",
      description: "О финансовой поддержке супругом (при необходимости)",
      details: [
        "Нужно если только один супруг имеет счет в сербском банке",
        "Для каждого члена семьи, включая детей",
        "Не требуется если у обоих супругов есть счета",
        "Подтверждение средств ~700 евро на человека"
      ],
      required: false
    },
    {
      title: "Справка об отсутствии судимости",
      description: "Из суда Сербии (опционально, ускоряет процесс)",
      details: [
        "Ускоряет рассмотрение на 2-3 недели",
        "Из суда, а не из полиции!",
        "Детям до 16 лет не нужна",
        "Для детей: только в присутствии обоих родителей",
        "Если не предоставить, МУП запросит самостоятельно"
      ],
      required: false
    }
  ];

  const addChild = () => {
    setPersonalData(prev => ({
      ...prev,
      children: [...prev.children, { name: '', birthDate: '', birthPlace: '' }]
    }));
  };

  const removeChild = (index) => {
    setPersonalData(prev => ({
      ...prev,
      children: prev.children.filter((_, i) => i !== index)
    }));
  };

  const updateChild = (index, field, value) => {
    setPersonalData(prev => ({
      ...prev,
      children: prev.children.map((child, i) => 
        i === index ? { ...child, [field]: value } : child
      )
    }));
  };

  const generateApplication = () => {
    const formatDate = (date) => {
      if (!date) return '________________';
      const d = new Date(date);
      return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;
    };

    let application = `ЗАХТЕВ ЗА ОДОБРЕЊЕ СТАЛНОГ НАСТАЊЕЊА У РЕПУБЛИЦИ СРБИЈИ

Назив органа коме се захтев подноси: МУП РЕПУБЛИКЕ СРБИЈЕ

1. Презиме / Surname: ${personalData.surname.toUpperCase() || '________________'}

2. Име / Given name(s): ${personalData.name.toUpperCase() || '________________'}

3. Пол / Sex: ${personalData.sex === 'M' ? 'мушко - male ☑' : personalData.sex === 'F' ? 'женско - female ☑' : 'мушко - male ☐ женско - female ☐'}
   Име родитеља / Parent's name: ${personalData.parentName.toUpperCase() || '________________'}

4. Дан, месец и година рођења / Date, month and year of birth: ${formatDate(personalData.birthDate)}
   Евиденцијски број странца / Personal identity number: ${personalData.personalNumber || '________________'}

5. Место и држава рођења / Place and country of birth: ${personalData.birthPlace.toUpperCase() || '________________'}

6. Држављанство / Nationality: ${personalData.nationality.toUpperCase() || '________________'}

7. Адреса становања у Републици Србији:
   ${personalData.address.toUpperCase() || '________________'}
   
   Контакт број телефона: ${personalData.phone || '________________'}
   Адреса електронске поште: ${personalData.email || '________________'}

8. Основи претходних привремених боравака:
   ${personalData.previousResidencePurpose.toUpperCase() || '________________'}
   
   или/or
   Број решења којим је одобрено право на азил:
   ${personalData.asylumDecisionNumber || '________________'}

9. Врста и број путне исправе:
   ${personalData.passportType.toUpperCase() || '________________'} ${personalData.passportNumber || '________________'}
   Датум издавања: ${formatDate(personalData.passportIssueDate)}
   До када важи: ${formatDate(personalData.passportExpiryDate)}

10. Временско трајање прекида боравка:
    од/from ${formatDate(personalData.residenceBreakFrom)} до/to ${formatDate(personalData.residenceBreakTo)}

11. Место и назив правног лица:
    ${personalData.employerName.toUpperCase() || '________________'}
    ${personalData.employerLocation.toUpperCase() || '________________'}
    ПИБ: ${personalData.employerPIB || '________________'}
    Матични број: ${personalData.employerMaticni || '________________'}

12. Подаци о лицу на основу чијег статуса се подноси захтев:
    Презиме и име: ${personalData.familyPersonName.toUpperCase() || '________________'}
    Матични/евиденцијски број: ${personalData.familyPersonNumber || '________________'}
    Држављанство: ${personalData.familyPersonNationality.toUpperCase() || '________________'}
    Статус члана породице: ${personalData.familyPersonStatus.toUpperCase() || '________________'}

13. Име(на) и презиме(на) и датум(и) рођења детета/деце:`;

    if (personalData.children && personalData.children.length > 0) {
      personalData.children.forEach((child, index) => {
        application += `\n    ${index + 1}. ${child.name.toUpperCase() || '________________'} - ${formatDate(child.birthDate)}`;
        if (child.birthPlace) application += ` - ${child.birthPlace.toUpperCase()}`;
      });
    } else {
      application += '\n    ________________';
    }

    application += `

14. Подаци о сродницима/српско порекло:
    ${personalData.relativesInfo.toUpperCase() || '________________'}
    ${personalData.serbianOrigin.toUpperCase() || '________________'}

ЗАВРШНА ИЗЈАВА:

Овим потврђујем да су сви подаци наведени у тачкама 1-14 потпуни, истинити и да одговарају подацима у приложеним документима.

Пристајем да моји лични подаци могу бити обрађивани од стране полицијских службеника у поступку одобрења сталног настањења.

У ________________, дана ________________

Потпис подносиоца захтева: ________________`;

    return application;
  };

  const generateAutobiography = () => {
    const { name, surname, birthDate, birthPlace, education, profession, spouseName, spouseBirthDate, spouseBirthPlace, marriageDate, children, parentsInfo, serbiaActivities } = personalData;
    
    let autobiography = `AUTOBIOGRAFIJA\n\n`;
    autobiography += `Ja sam ${name} ${surname}, rođen/a ${birthDate} u ${birthPlace}. `;
    
    if (education) {
      autobiography += `Završio/la sam ${education}. `;
    }
    
    if (profession) {
      autobiography += `Po profesiji sam ${profession}. `;
    }
    
    if (spouseName) {
      autobiography += `\n\nU braku sam sa ${spouseName}`;
      if (spouseBirthDate) autobiography += `, rođen/a ${spouseBirthDate}`;
      if (spouseBirthPlace) autobiography += ` u ${spouseBirthPlace}`;
      if (marriageDate) autobiography += `. Venčali smo se ${marriageDate}.`;
      autobiography += ` `;
    }
    
    if (children && children.length > 0) {
      autobiography += `\n\nImamo ${children.length} ${children.length === 1 ? 'dete' : 'dece'}: `;
      children.forEach((child, index) => {
        autobiography += `${child.name}`;
        if (child.birthDate) autobiography += `, rođen/a ${child.birthDate}`;
        if (child.birthPlace) autobiography += ` u ${child.birthPlace}`;
        if (index < children.length - 1) autobiography += `; `;
        else autobiography += `. `;
      });
    }
    
    if (parentsInfo) {
      autobiography += `\n\nO mojim roditeljima: ${parentsInfo} `;
    }
    
    if (serbiaActivities) {
      autobiography += `\n\nTokom poslednjih tri godine u Srbiji: ${serbiaActivities}`;
    }
    
    return autobiography;
  };

  const generateAIImprovedAutobiography = () => {
    const { name, surname, birthDate, birthPlace, education, profession, spouseName, spouseBirthDate, spouseBirthPlace, marriageDate, children, parentsInfo, serbiaActivities } = personalData;
    
    let autobiography = `AUTOBIOGRAFIJA\n\n`;
    
    // AI-улучшенное введение
    if (name && surname) {
      autobiography += `Moje ime je ${name} ${surname}, i sa velikim poštovanjem se obraćam Vašoj ustanovi. `;
      
      if (birthDate && birthPlace) {
        const date = new Date(birthDate);
        autobiography += `Rođen/a sam ${date.getDate()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}. godine u gradu ${birthPlace}, što je oblikovalo moju ličnost i vrednosni sistem. `;
      }
    }
    
    // Улучшенное описание образования
    if (education || profession) {
      autobiography += `\n\nMoj obrazovni put je bio ispunjen konstantnim usavršavanjem. `;
      if (education) {
        autobiography += `Uspešno sam završio/la ${education}, što mi je omogućilo da steknem dublje razumevanje moje oblasti rada. `;
      }
      if (profession) {
        autobiography += `Profesionalno se bavim poslom ${profession}, gde primenjujem stečena znanja sa entuzijazmom i odgovornošću. `;
      }
    }
    
    // Улучшенное описание семьи
    if (spouseName) {
      autobiography += `\n\nMoj emotivni život je obogaćen brakom sa ${spouseName}`;
      if (spouseBirthDate && spouseBirthPlace) {
        const spouseDate = new Date(spouseBirthDate);
        autobiography += `, izuzetnom osobom rođenom ${spouseDate.getDate()}.${(spouseDate.getMonth() + 1).toString().padStart(2, '0')}.${spouseDate.getFullYear()}. godine u ${spouseBirthPlace}`;
      }
      if (marriageDate) {
        const marriageD = new Date(marriageDate);
        autobiography += `. Naša ljubavna priča je dobila zvanični oblik ${marriageD.getDate()}.${(marriageD.getMonth() + 1).toString().padStart(2, '0')}.${marriageD.getFullYear()}. godine kada smo se venčali`;
      }
      autobiography += `. Naš brak predstavlja harmoničnu zajednicu zasnovanu na međusobnom razumevanju i podršci. `;
    }
    
    // Дети
    if (children && children.length > 0) {
      autobiography += `\n\nNaša porodična sreća je dopunjena `;
      if (children.length === 1) {
        autobiography += `našim dragocenim detetom ${children[0].name}`;
        if (children[0].birthDate) {
          const childDate = new Date(children[0].birthDate);
          autobiography += `, koje je rođeno ${childDate.getDate()}.${(childDate.getMonth() + 1).toString().padStart(2, '0')}.${childDate.getFullYear()}. godine`;
        }
        if (children[0].birthPlace) {
          autobiography += ` u ${children[0].birthPlace}`;
        }
        autobiography += `. Roditeljstvo je obogatilo naše živote novim smislom i motivacijom. `;
      } else {
        autobiography += `našom decom koja predstavljaju naše najveće bogatstvo: `;
        children.forEach((child, index) => {
          autobiography += `${child.name}`;
          if (child.birthDate) {
            const childDate = new Date(child.birthDate);
            autobiography += ` (rođeno ${childDate.getDate()}.${(childDate.getMonth() + 1).toString().padStart(2, '0')}.${childDate.getFullYear()}.)`;
          }
          if (index < children.length - 1) {
            autobiography += index === children.length - 2 ? ' i naše drago ' : ', ';
          } else {
            autobiography += `. `;
          }
        });
        autobiography += `Vaspitanje naše dece predstavlja našu najveću odgovornost i radost. `;
      }
    }
    
    // Родители
    if (parentsInfo) {
      autobiography += `\n\nMoji dragi roditelji, ${parentsInfo}, predstavljaju temelj moje ličnosti. Njihova podrška i mudrost oblikovali su me u osobu kakva sam danas. `;
    }
    
    // Жизнь в Сербии
    if (serbiaActivities) {
      autobiography += `\n\nTokom protekle tri godine mog boravka u Republici Srbiji, ${serbiaActivities} `;
      autobiography += `Ovaj period je bio izuzetno značajan za moju integraciju u srpsko društvo. Srbija je postala moja druga domovina gde se osećam kao kod kuće. `;
    }
    
    // Заключение
    autobiography += `\n\nMoja odluka da podnesem zahtev za stalno nastanjenje proizilazi iz duboke povezanosti sa ovom zemljom. Verujem da mogu značajno doprineti razvoju društvene zajednice čiji želim biti punopravni član. Obavezujem se da ću poštovati zakone Republike Srbije i aktivno učestvovati u društvenom životu.`;
    
    return autobiography;
  };

  const exportFile = (content, filename) => {
    try {
      const element = document.createElement('a');
      const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
      element.href = URL.createObjectURL(file);
      element.download = filename;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (error) {
      console.error('Ошибка скачивания:', error);
      alert('Ошибка скачивания. Попробуйте еще раз.');
    }
  };

  const exportAllDocuments = () => {
    // Экспорт заявления
    const applicationText = generateApplication();
    exportFile(applicationText, 'zahtev_za_pmz.txt');

    // Задержка перед вторым скачиванием
    setTimeout(() => {
      const bioText = useAIVersion ? generateAIImprovedAutobiography() : generateAutobiography();
      exportFile(bioText, useAIVersion ? 'autobiografija_ai_enhanced.txt' : 'autobiografija.txt');
    }, 100);
  };

  const toggleStepCompletion = (index) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedSteps(newCompleted);
  };

  const progress = (completedSteps.size / documents.length) * 100;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px', textAlign: 'center' }}>
          ПМЖ Сербия - Помощник по документам
        </h1>
        <p style={{ color: '#6b7280', textAlign: 'center', marginBottom: '24px' }}>
          Пошаговая подготовка документов для получения постоянного места жительства в Сербии
        </p>
        
        <div style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
            <span>Прогресс подготовки документов</span>
            <span>{completedSteps.size} из {documents.length}</span>
          </div>
          <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '4px', height: '8px' }}>
            <div 
              style={{ 
                width: `${progress}%`, 
                backgroundColor: '#10b981', 
                height: '8px', 
                borderRadius: '4px',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {documents.map((doc, index) => (
          <div 
            key={index}
            style={{
              border: completedSteps.has(index) 
                ? '2px solid #10b981' 
                : doc.required 
                  ? '2px solid #ef4444' 
                  : '1px solid #d1d5db',
              borderRadius: '12px',
              padding: '24px',
              backgroundColor: completedSteps.has(index) 
                ? '#f0fdf4' 
                : doc.required 
                  ? '#fef2f2' 
                  : '#ffffff',
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <button
                    onClick={() => toggleStepCompletion(index)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: '2px solid',
                      borderColor: completedSteps.has(index) ? '#10b981' : '#9ca3af',
                      backgroundColor: completedSteps.has(index) ? '#10b981' : 'transparent',
                      color: completedSteps.has(index) ? 'white' : 'transparent',
                      cursor: 'pointer',
                      fontSize: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {completedSteps.has(index) ? '✓' : ''}
                  </button>
                  
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: '600', color: '#111827' }}>
                      {doc.title}
                      {doc.required && (
                        <span style={{
                          marginLeft: '8px',
                          fontSize: '12px',
                          backgroundColor: '#fee2e2',
                          color: '#991b1b',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontWeight: 'normal'
                        }}>
                          Обязательно
                        </span>
                      )}
                    </h3>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '16px' }}>
                      {doc.description}
                    </p>
                  </div>
                </div>
                
                <div style={{ marginLeft: '44px' }}>
                  <ul style={{ margin: '0 0 16px 0', padding: 0, listStyle: 'none' }}>
                    {doc.details.map((detail, detailIndex) => (
                      <li key={detailIndex} style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ color: '#3b82f6', marginTop: '6px', fontSize: '8px' }}>●</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Форма заявления */}
                  {doc.hasForm && index === 0 && currentStep === index && (
                    <div style={{ marginTop: '24px', padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '16px' }}>
                        Заполнение заявления (14 пунктов)
                      </h3>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                            1. Фамилия (ЗАГЛАВНЫМИ БУКВАМИ)
                          </label>
                          <input
                            type="text"
                            style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', textTransform: 'uppercase' }}
                            value={personalData.surname}
                            onChange={(e) => setPersonalData(prev => ({ ...prev, surname: e.target.value }))}
                            placeholder="PETROVIĆ"
                          />
                        </div>
                        
                        <div>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                            2. Имя (ЗАГЛАВНЫМИ БУКВАМИ)
                          </label>
                          <input
                            type="text"
                            style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', textTransform: 'uppercase' }}
                            value={personalData.name}
                            onChange={(e) => setPersonalData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="PETAR"
                          />
                        </div>
                        
                        <div>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>3. Пол</label>
                          <select
                            style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
                            value={personalData.sex}
                            onChange={(e) => setPersonalData(prev => ({ ...prev, sex: e.target.value }))}
                          >
                            <option value="">Выберите</option>
                            <option value="M">Мужской</option>
                            <option value="F">Женский</option>
                          </select>
                        </div>
                        
                        <div>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                            Имя родителя
                          </label>
                          <input
                            type="text"
                            style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', textTransform: 'uppercase' }}
                            value={personalData.parentName}
                            onChange={(e) => setPersonalData(prev => ({ ...prev, parentName: e.target.value }))}
                            placeholder="MILAN"
                          />
                        </div>
                        
                        <div>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>4. Дата рождения</label>
                          <input
                            type="date"
                            style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
                            value={personalData.birthDate}
                            onChange={(e) => setPersonalData(prev => ({ ...prev, birthDate: e.target.value }))}
                          />
                        </div>
                        
                        <div>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>5. Место рождения</label>
                          <input
                            type="text"
                            style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', textTransform: 'uppercase' }}
                            value={personalData.birthPlace}
                            onChange={(e) => setPersonalData(prev => ({ ...prev, birthPlace: e.target.value }))}
                            placeholder="MOSKVA, RUSIJA"
                          />
                        </div>
                        
                        <div>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>6. Гражданство</label>
                          <input
                            type="text"
                            style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', textTransform: 'uppercase' }}
                            value={personalData.nationality}
                            onChange={(e) => setPersonalData(prev => ({ ...prev, nationality: e.target.value }))}
                            placeholder="RUSKA"
                          />
                        </div>
                        
                        <div>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>7. Адрес в Сербии</label>
                          <input
                            type="text"
                            style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', textTransform: 'uppercase' }}
                            value={personalData.address}
                            onChange={(e) => setPersonalData(prev => ({ ...prev, address: e.target.value }))}
                            placeholder="BEOGRAD, KNEZ MIHAILOVA 1"
                          />
                        </div>
                        
                        <div>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>Телефон</label>
                          <input
                            type="text"
                            style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
                            value={personalData.phone}
                            onChange={(e) => setPersonalData(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="+381 60 123 4567"
                          />
                        </div>
                        
                        <div>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>Email</label>
                          <input
                            type="email"
                            style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
                            value={personalData.email}
                            onChange={(e) => setPersonalData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="email@example.com"
                          />
                        </div>
                      </div>

                      {/* Секция детей */}
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '500', color: '#374151' }}>13. Дети</h4>
                          <button
                            onClick={addChild}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '6px 12px',
                              backgroundColor: '#3b82f6',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '14px',
                              cursor: 'pointer'
                            }}
                          >
                            + Добавить ребенка
                          </button>
                        </div>
                        
                        {personalData.children.map((child, childIndex) => (
                          <div key={childIndex} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'flex-end' }}>
                            <input
                              type="text"
                              style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', textTransform: 'uppercase' }}
                              value={child.name}
                              onChange={(e) => updateChild(childIndex, 'name', e.target.value)}
                              placeholder="ИМЯ РЕБЕНКА"
                            />
                            <input
                              type="date"
                              style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
                              value={child.birthDate}
                              onChange={(e) => updateChild(childIndex, 'birthDate', e.target.value)}
                            />
                            <input
                              type="text"
                              style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', textTransform: 'uppercase' }}
                              value={child.birthPlace}
                              onChange={(e) => updateChild(childIndex, 'birthPlace', e.target.value)}
                              placeholder="МЕСТО РОЖДЕНИЯ"
                            />
                            <button
                              onClick={() => removeChild(childIndex)}
                              style={{
                                padding: '8px',
                                backgroundColor: '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer'
                              }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      <div style={{ backgroundColor: '#eff6ff', padding: '16px', borderRadius: '8px' }}>
                        <h5 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '500', color: '#1e40af' }}>
                          Предварительный просмотр заявления:
                        </h5>
                        <div style={{
                          backgroundColor: '#ffffff',
                          padding: '12px',
                          borderRadius: '6px',
                          border: '1px solid #e5e7eb',
                          fontSize: '12px',
                          whiteSpace: 'pre-line',
                          maxHeight: '200px',
                          overflowY: 'auto',
                          fontFamily: 'monospace'
                        }}>
                          {generateApplication()}
                        </div>
                        <button
                          onClick={() => exportFile(generateApplication(), 'zahtev_za_pmz.txt')}
                          style={{
                            marginTop: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 16px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '14px',
                            cursor: 'pointer'
                          }}
                        >
                          📄 Скачать заявление
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Инструкция по госпошлинам */}
                  {doc.hasInstruction && index === 1 && currentStep === index && (
                    <div style={{ marginTop: '24px', padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '16px' }}>
                        Инструкция по оплате госпошлин
                      </h3>
                      
                      <div style={{ backgroundColor: '#eff6ff', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                        <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '500', color: '#1e40af' }}>
                          Ссылка для оплаты
                        </h4>
                        <a 
                          href="https://plati.euprava.gov.rs/#/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 16px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        >
                          🌐 Открыть eUprava
                        </a>
                      </div>
                      
                      <div style={{ backgroundColor: '#f0fdf4', padding: '16px', borderRadius: '8px' }}>
                        <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '500', color: '#166534' }}>
                          Пошаговая инструкция
                        </h4>
                        <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#374151' }}>
                          <li style={{ marginBottom: '4px' }}><strong>1.</strong> Выберите "Физичко лице" (Физическое лицо)</li>
                          <li style={{ marginBottom: '4px' }}><strong>2.</strong> Заполните личные данные (имя, фамилия, адрес)</li>
                          <li style={{ marginBottom: '4px' }}><strong>3.</strong> Выберите МУП Републике Србије</li>
                          <li style={{ marginBottom: '4px' }}><strong>4.</strong> Услуга: СТРАНЦИ → Одобрење сталног настањења</li>
                          <li style={{ marginBottom: '4px' }}><strong>5.</strong> Выберите вашу общину</li>
                          <li style={{ marginBottom: '4px' }}><strong>6.</strong> Поставьте галочку согласия</li>
                          <li><strong>7.</strong> Оплатите и скачайте квитанцию</li>
                        </ol>
                      </div>
                    </div>
                  )}
                  
                  {/* Форма автобиографии */}
                  {doc.hasForm && index === 2 && currentStep === index && (
                    <div style={{ marginTop: '24px', padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '16px' }}>
                        Дополнительные данные для автобиографии
                      </h3>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                            Образование
                          </label>
                          <input
                            type="text"
                            style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
                            value={personalData.education}
                            onChange={(e) => setPersonalData(prev => ({ ...prev, education: e.target.value }))}
                            placeholder="Ekonomski fakultet"
                          />
                        </div>
                        
                        <div>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                            Профессия
                          </label>
                          <input
                            type="text"
                            style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
                            value={personalData.profession}
                            onChange={(e) => setPersonalData(prev => ({ ...prev, profession: e.target.value }))}
                            placeholder="ekonomista"
                          />
                        </div>
                        
                        <div>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                            Имя супруга/и
                          </label>
                          <input
                            type="text"
                            style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
                            value={personalData.spouseName}
                            onChange={(e) => setPersonalData(prev => ({ ...prev, spouseName: e.target.value }))}
                            placeholder="Ana Petrović"
                          />
                        </div>
                        
                        <div>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                            Дата рождения супруга/и
                          </label>
                          <input
                            type="date"
                            style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
                            value={personalData.spouseBirthDate}
                            onChange={(e) => setPersonalData(prev => ({ ...prev, spouseBirthDate: e.target.value }))}
                          />
                        </div>
                      </div>
                      
                      <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                          Информация о родителях
                        </label>
                        <textarea
                          style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', minHeight: '60px' }}
                          value={personalData.parentsInfo}
                          onChange={(e) => setPersonalData(prev => ({ ...prev, parentsInfo: e.target.value }))}
                          placeholder="Мой отец Милан Петрович, пенсионер. Мать Милица Петрович..."
                        />
                      </div>
                      
                      <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                          Чем занимались в Сербии последние 3 года
                        </label>
                        <textarea
                          style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', minHeight: '80px' }}
                          value={personalData.serbiaActivities}
                          onChange={(e) => setPersonalData(prev => ({ ...prev, serbiaActivities: e.target.value }))}
                          placeholder="Работал в компании, изучал сербский язык..."
                        />
                      </div>
                      
                      <div style={{ backgroundColor: '#eff6ff', padding: '16px', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                          <h5 style={{ margin: 0, fontSize: '16px', fontWeight: '500', color: '#1e40af' }}>
                            Предварительный просмотр автобиографии:
                          </h5>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                              <input
                                type="radio"
                                name="bioVersion"
                                checked={!useAIVersion}
                                onChange={() => setUseAIVersion(false)}
                                style={{ color: '#3b82f6' }}
                              />
                              <span style={{ fontSize: '14px', color: '#1e40af' }}>Стандартная</span>
                            </label>
                            
                            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                              <input
                                type="radio"
                                name="bioVersion"
                                checked={useAIVersion}
                                onChange={() => setUseAIVersion(true)}
                                style={{ color: '#7c3aed' }}
                              />
                              <span style={{ fontSize: '14px', color: '#7c3aed', fontWeight: '500' }}>
                                ✨ AI-улучшенная
                              </span>
                            </label>
                          </div>
                        </div>
                        
                        <div style={{
                          marginBottom: '12px',
                          padding: '8px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          backgroundColor: useAIVersion ? '#faf5ff' : '#f9fafb',
                          color: useAIVersion ? '#7c3aed' : '#6b7280',
                          border: '1px solid ' + (useAIVersion ? '#e9d5ff' : '#e5e7eb')
                        }}>
                          {useAIVersion ? (
                            <span><strong>AI-улучшенная версия:</strong> Более богатая лексика, профессиональные формулировки</span>
                          ) : (
                            <span><strong>Стандартная версия:</strong> Простая и понятная автобиография</span>
                          )}
                        </div>
                        
                        <div style={{
                          backgroundColor: '#ffffff',
                          padding: '12px',
                          borderRadius: '6px',
                          border: '1px solid #e5e7eb',
                          fontSize: '12px',
                          whiteSpace: 'pre-line',
                          maxHeight: '240px',
                          overflowY: 'auto',
                          fontFamily: 'monospace'
                        }}>
                          {useAIVersion ? generateAIImprovedAutobiography() : generateAutobiography()}
                        </div>
                        
                        <button
                          onClick={() => exportFile(
                            useAIVersion ? generateAIImprovedAutobiography() : generateAutobiography(),
                            useAIVersion ? 'autobiografija_ai_enhanced.txt' : 'autobiografija.txt'
                          )}
                          style={{
                            marginTop: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 16px',
                            background: useAIVersion 
                              ? 'linear-gradient(to right, #7c3aed, #ec4899)' 
                              : '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '14px',
                            cursor: 'pointer'
                          }}
                        >
                          📄 Скачать {useAIVersion ? 'AI-улучшенную' : 'стандартную'} автобиографию
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {(doc.hasForm || doc.hasInstruction) && (
                    <button
                      onClick={() => setCurrentStep(currentStep === index ? -1 : index)}
                      style={{
                        marginTop: '12px',
                        padding: '8px 16px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      {currentStep === index ? 'Скрыть' : (doc.hasForm ? 'Заполнить форму' : 'Показать инструкцию')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Финальная секция экспорта всех документов */}
      <div style={{
        marginTop: '40px',
        padding: '24px',
        background: 'linear-gradient(to right, #eff6ff, #f0fdf4)',
        border: '2px solid #3b82f6',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: '600', color: '#1f2937' }}>
          Готовы к подаче?
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={exportAllDocuments}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: 'linear-gradient(to right, #3b82f6, #10b981)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            📄 Скачать все документы
          </button>
          <div style={{ fontSize: '14px', color: '#6b7280', textAlign: 'center' }}>
            <p style={{ margin: 0 }}>Скачает заявление и автобиографию одним нажатием</p>
            {useAIVersion && (
              <p style={{ margin: '4px 0 0 0', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                ✨ <span>С AI-улучшенной автобиографией</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Важные напоминания */}
      <div style={{
        marginTop: '32px',
        padding: '24px',
        backgroundColor: '#fef3c7',
        border: '1px solid #f59e0b',
        borderRadius: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span style={{ color: '#f59e0b', fontSize: '20px' }}>⚠️</span>
          <div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: '#92400e' }}>
              Важные напоминания
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#92400e' }}>
              <li style={{ marginBottom: '4px' }}>Все документы должны быть действительными на момент подачи</li>
              <li style={{ marginBottom: '4px' }}>Переводы должны быть сделаны судебными переводчиками</li>
              <li style={{ marginBottom: '4px' }}>Выписки из банка действуют ~30 дней</li>
              <li style={{ marginBottom: '4px' }}>Рекомендуется подавать документы лично</li>
              <li>Сохраняйте копии всех документов</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PMZSerbiaApp;
