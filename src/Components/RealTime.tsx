import React, { useState, useEffect } from 'react';

const RealTime = () => {
    // Инициализируем состояние для хранения текущего времени
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    // Используем useEffect для установки таймера и его последующей очистки
    useEffect(() => {
        // Устанавливаем интервал, чтобы обновлять состояние каждую секунду
        const intervalId = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        // Функция, которая будет вызвана при размонтировании компонента.
        // Очищаем интервал, чтобы избежать утечек памяти
        return () => clearInterval(intervalId);
    }, []); // Пустой массив зависимостей означает, что эффект будет вызван только при монтировании и размонтировании компонента

    // Рендерим текущее время
    return (
        <p>{time}</p>
    );
};

export default RealTime;
