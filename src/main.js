import './style.css'
import dayjs from 'dayjs'

const form = document.getElementById('birthdayForm');
const birthDateInput = document.getElementById('birthDate');
const dialog = document.getElementById('resultDialog');
const dialogContent = document.getElementById('dialogContent');
const closeDialogBtn = document.getElementById('closeDialog');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const today = dayjs().startOf('day');
  const birthDate = dayjs(birthDateInput.value).startOf('day');
  
  const daysSinceBirth = today.diff(birthDate, 'days');
  
  if (daysSinceBirth < 0) {
    alert("Data urodzenia nie może być z przyszłości!");
    return;
  }

  const isBirthdayToday = today.month() === birthDate.month() && today.date() === birthDate.date();
  
  if (isBirthdayToday) {
    alert("Wszystkiego najlepszego! 🎂🎉"); [cite, 15]
  }

  let htmlContent = `<p>Od Twoich narodzin minęło już <strong>${daysSinceBirth}</strong> dni.</p>`; [cite, 13, 14]

  if (!isBirthdayToday) {
    let nextBirthday = birthDate.year(today.year());
    if (nextBirthday.isBefore(today) || nextBirthday.isSame(today)) {
      nextBirthday = nextBirthday.add(1, 'year');
    }

    const weeksToBirthday = nextBirthday.diff(today, 'weeks'); [cite, 24]

    if (weeksToBirthday === 0) {
      htmlContent += `<p class="font-bold underline">Masz urodziny w tym tygodniu!</p>`; [cite, 25]
    } else {
      htmlContent += `<p>Do Twoich kolejnych urodzin pozostało <strong>${weeksToBirthday}</strong> tygodni.</p>`; [cite, 24]
    }
  }

  dialogContent.innerHTML = htmlContent;
  dialog.showModal();
});

closeDialogBtn.addEventListener('click', () => {
  dialog.close();
});