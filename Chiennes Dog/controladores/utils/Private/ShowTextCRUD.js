fetch('../../recursos/Text/Private/ModalCRUD.json')
    .then(response => response.json())
    .then(data => {
        //Texto de modal de las categorias
        document.getElementById('HeaderTitleCate').innerText = data.HeaderTitleCate;
        document.getElementById('BtnAdd').innerText = data.BtnEnter;
    })
    .catch(error => console.error('Error al cargar el archivo JSON de textos:', error));

fetch('../../recursos/Text/Private/ModalCRUD.json')
    .then(response => response.json())
    .then(data => {
        //Texto de modal de los productos
        document.getElementById('HeaderTitleProd').innerText = data.HeaderTitleProd;
        document.getElementById('NameProd').innerText = data.Name;
        document.getElementById('CategoryProd').innerText = data.Category;
        document.getElementById('PriceProd').innerText = data.Price;
        document.getElementById('BrandProd').innerText = data.Brand;
        document.getElementById('DescriptionProd').innerText = data.Description;
        document.getElementById('SelectImgProd').innerText = data.SelectImg;
        document.getElementById('QuantityProd').innerText = data.Quantity;
        document.getElementById('BtnAddProd').innerText = data.BtnAdd;
    })
    .catch(error => console.error('Error al cargar el archivo JSON de textos:', error));

fetch('../../recursos/Text/Private/ModalCRUD.json')
    .then(response => response.json())
    .then(data => {
        //Texto de modal de las marcas
        document.getElementById('HeaderTitleBrand').innerText = data.HeaderTitleBrand;
        document.getElementById('NameBrand').innerText = data.Name;
        document.getElementById('SelectImgBrand').innerText = data.SelectImg;
        document.getElementById('BtnAddBrand').innerText = data.BtnEnter;
    })
    .catch(error => console.error('Error al cargar el archivo JSON de textos:', error));

fetch('../../recursos/Text/Private/ModalCRUD.json')
    .then(response => response.json())
    .then(data => {
        //Texto de modal de los usuarios
        document.getElementById('HeaderTitleUser').innerText = data.HeaderTitleUser;
        document.getElementById('Name').innerText = data.Name;
        document.getElementById('LastName').innerText = data.LastName;
        document.getElementById('Email').innerText = data.Email;
        document.getElementById('Password').innerText = data.Password;
        document.getElementById('JobTitle').innerText = data.JobTitle;
        document.getElementById('BtnAddUser').innerText = data.BtnEnter;
    })
    .catch(error => console.error('Error al cargar el archivo JSON de textos:', error));