function formatSeconds(time) {
    // Проверка, что входное значение является числом
    if (isNaN(time)) {
        return "Invalid input";
    }

    // Вычисление часов, минут и секунд
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor((time - (hours * 3600)) / 60);
    var seconds = time - (hours * 3600) - (minutes * 60);

    // Форматирование в виде строк с двумя символами
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    // Возвращение отформатированной строки
    return hours + ":" + minutes + ":" + seconds;
}

module.exports = {formatSeconds}
