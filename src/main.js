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
    alert("Wszystkiego najlepszego!");
  }

  let htmlContent = `<p>Od twoich narodzin minęło <strong>${daysSinceBirth}</strong> dni.</p>`;

  if (!isBirthdayToday) {

    let nextBirthday = birthDate.year(today.year());
    if (nextBirthday.isBefore(today) || nextBirthday.isSame(today)) {
      nextBirthday = nextBirthday.add(1, 'year');
    }

    const weeksToBirthday = nextBirthday.diff(today, 'weeks');

    if (weeksToBirthday === 0) {

      htmlContent += `<p class="font-bold underline">Masz urodziny w tym tygodniu!</p>`;
    } else {
      htmlContent += `<p>Do twoich nastęnych urodzin zostało <strong>${weeksToBirthday}</strong> tygodni.</p>`;
    }
  }


  dialogContent.innerHTML = htmlContent;
  dialog.showModal();
});


closeDialogBtn.addEventListener('click', () => {
  dialog.close();
});