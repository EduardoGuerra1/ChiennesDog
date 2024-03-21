fetch('../../recursos/Text/ModalArticles.json')
    .then(response => response.json())
    .then(data => {
        //Texto de modal del artículo/accesorio
        document.getElementById('Description').innerText = data.Description;
        document.getElementById('Minus').innerText = data.Minus;
        document.getElementById('Num').innerText = data.Num;
        document.getElementById('Plus').innerText = data.Plus;
        document.getElementById('BtnAdd').innerText = data.BtnAdd;
        //Texto de modal de valoraciones
        document.getElementById('Opinion').innerText = data.Opinion;
        document.getElementById('Rate').innerText = data.Rate;
        document.getElementById('BtnRate').innerText = data.BtnRate;
    })
    .catch(error => console.error('Error al cargar el archivo JSON de textos:', error));