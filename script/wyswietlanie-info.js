// Funkcja do wyświetlania danych użytkownika
function showUserData(uid) {
    const userDataList = document.getElementById('userDataList');

    // Wyczyść istniejące dane przed ponownym wyświetleniem
    userDataList.innerHTML = '';

    // Pobierz dane z Firestore dla danego użytkownika
    db.collection('users').doc(uid).collection('formData').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const formData = doc.data();
                const listItem = document.createElement('li');

                // Dodaj wyświetlanie daty
                const date = formData.data ? formData.data.toDate().toLocaleString() : 'Brak daty';

                listItem.innerHTML = `
                    <strong>Imię:</strong> ${formData.imie}<br>
                    <strong>Email:</strong> ${formData.email}<br>
                    <strong>Nr. telefonu:</strong> ${formData.telefon}<br>
                    <strong>Nazwa produktu:</strong> ${formData.produkt}<br>
                    <strong>Ilość produktu:</strong> ${formData.ilosc}<br>
                    <strong>Data:</strong> ${date}<br>
                    <hr>
                `;
                userDataList.appendChild(listItem);
            });
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Sprawdź, czy użytkownik jest zalogowany
auth.onAuthStateChanged((user) => {
    if (user) {
        // Użytkownik jest zalogowany, pobierz i wyświetl jego dane
        showUserData(user.uid);
    } else {
        // Użytkownik nie jest zalogowany, przekieruj na stronę logowania
        window.location.href = 'login.html';
    }
});
