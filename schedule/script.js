const totalDays = 31;
const workingDays = 3;
const offDays = 2;

// Масив днів на 31 удумент
const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

// Змінні для відстеження днів
let dayCounter = 0;
let workDaysCounter = 0;
let offDaysCounter = 0;

// Цикл для створення робочого графіка та виведення в консоль
for (let i = 1; i <= totalDays; i++) {
  const currentDay = days[dayCounter];
  if (workDaysCounter <=workingDays) {
    console.log(`День ${i}: ${currentDay} - Робочий день`);
    workDaysCounter++;
  } else if (workDaysCounter===3 ) {
    console.log(`День ${i}: ${currentDay} - Вихідний день`);
    offDaysCounter++;
  }

  // Збільшення лічильників днів та перевірка, чи не досягли максимальної кількості робочих та вихідних днів
  dayCounter++;
  if (dayCounter === days.length) {
    dayCounter = 0;
  }
  if (workDaysCounter === workingDays) {
    workDaysCounter = 0;
  }
  if (offDaysCounter === offDays) {
    offDaysCounter = 0;
  }
}
