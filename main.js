const selectFrom = document.getElementById("from");
const selectTo = document.getElementById("to");
const result = document.getElementById("Natija");

async function renderOption(API) {
  try {
    const res = await fetch(API);
    const data = await res.json();
    const valyutalar = Object.keys(data.conversion_rates);

    valyutalar.forEach(item => {
      const opt1 = document.createElement("option");
      const opt2 = document.createElement("option");
      opt1.value = item;
      opt1.textContent = item;
      opt2.value = item;
      opt2.textContent = item;

      selectFrom.appendChild(opt1);
      selectTo.appendChild(opt2);
    });

    selectFrom.value = "USD";
    selectTo.value = "UZS";
  } catch (err) {
    console.log("API dan ma'lumot kelmadi", err);
  }
}

renderOption("https://v6.exchangerate-api.com/v6/ca75d3e4a335626baaf5695c/latest/USD");

function almashtirish() {
  const miqdor = document.getElementById("summa").value;
  const fromValue = selectFrom.value;
  const toValue = selectTo.value;

  if (!miqdor || isNaN(miqdor)) {
    result.textContent = "❗ Iltimos, to‘g‘ri summa kiriting!";
    return;
  }

  fetch(`https://v6.exchangerate-api.com/v6/ca75d3e4a335626baaf5695c/latest/${fromValue}`)
    .then(res => res.json())
    .then(data => {
      const kurs = data.conversion_rates[toValue];
      const javob = (miqdor * kurs).toFixed(2);
      result.textContent = `${miqdor} ${fromValue} = ${javob} ${toValue}`;
    })
    .catch(() => {
      result.textContent = "⚠️ Valyuta ma'lumotini olishda xatolik!";
    });
}

function toggleMode() {
  document.body.classList.toggle("dark");
}