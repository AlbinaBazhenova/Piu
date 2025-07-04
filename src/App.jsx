import React, { useState } from 'react';

const PMZSerbiaApp = () => {
  const [completedSteps, setCompletedSteps] = useState(new Set());
  
  const documents = [
    {
      title: "Заявление на получение ПМЖ",
      description: "Заполненное заявление ЗАХТЕВ ЗА ОДОБРЕЊЕ СТАЛНОГ НАСТАЊЕЊА",
      required: true
    },
    {
      title: "Госпошлины", 
      description: "Квитанции об уплате госпошлин",
      required: true
    },
    {
      title: "Автобиография",
      description: "На сербском языке",
      required: true
    }
  ];

  const toggleStep = (index) => {
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
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333', textAlign: 'center' }}>
        ПМЖ Сербия - Помощник по документам
      </h1>
      
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
        Пошаговая подготовка документов для получения ПМЖ в Сербии
      </p>

      {/* Прогресс-бар */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#666', marginBottom: '5px' }}>
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

      {/* Список документов */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {documents.map((doc, index) => (
          <div 
            key={index}
            style={{
              border: completedSteps.has(index) ? '2px solid #10b981' : doc.required ? '2px solid #ef4444' : '1px solid #d1d5db',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: completedSteps.has(index) ? '#f0fdf4' : doc.required ? '#fef2f2' : '#ffffff',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button
                onClick={() => toggleStep(index)}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: '2px solid',
                  borderColor: completedSteps.has(index) ? '#10b981' : '#9ca3af',
                  backgroundColor: completedSteps.has(index) ? '#10b981' : 'transparent',
                  color: completedSteps.has(index) ? 'white' : 'transparent',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {completedSteps.has(index) ? '✓' : ''}
              </button>
              
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#111827' }}>
                  {doc.title}
                  {doc.required && (
                    <span style={{
                      marginLeft: '10px',
                      fontSize: '12px',
                      backgroundColor: '#fee2e2',
                      color: '#991b1b',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}>
                      Обязательно
                    </span>
                  )}
                </h3>
                <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
                  {doc.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Финальная секция */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#eff6ff',
        border: '2px solid #3b82f6',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h4 style={{ margin: '0 0 15px 0', color: '#1f2937' }}>
          Готовы к подаче?
        </h4>
        <button style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          📄 Скачать документы
        </button>
        <p style={{ margin: '10px 0 0 0', fontSize: '14px', color: '#6b7280' }}>
          Приложение работает! Готово к деплою.
        </p>
      </div>
    </div>
  );
};

export default PMZSerbiaApp;
