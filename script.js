let storeged = [];

function listaStorage(){
    storaged = localStorage.getItem('@casacriativa');
    console.log(storaged);
    if(storaged){
        if(storaged.length > 2){
        document.querySelector("div#empty").classList.remove('empty');
        document.querySelector('section#idea').innerHTML = '';
        storeged = JSON.parse(localStorage.getItem("@casacriativa"));
        storeged.map(storeg => {
            document.querySelector('section#idea')
                .innerHTML += 
                    `<div class='idea'>
                        <div class="idea-header">
                            <img 
                                src='${storeg.data.image}'
                                alt='Imagem'
                            />
                            <h3>${storeg.data.title}</h3>
                        </div>
                        <div class="content">
                            <p>${storeg.data.category}</p>
                            <div class="description">
                                ${storeg.data.description}
                            </div>
                            <section  class="link" >
                                <a href='${storeg.data.link}' target="_Blank">Ir para ideia</a>
                                <a onclick="onEdit(${storeg.id})" href="#">Editar</a>
                                <a onclick='onDelete(${storeg.id})' href="#">Excluir</a>
                            </section>
                        </div>
                    </div>`;
        });
        }else{
            document.querySelector("div#empty").classList.add('empty');
        }
    }else{
        document.querySelector("div#empty").classList.add('empty');
    }
}

function onCleanField(){
    document.getElementById('titulo').value = '';
    document.getElementById('category').value = '';
    document.getElementById('image').value = '';
    document.getElementById('description').value = '';
    document.getElementById('link').value = '';
    document.getElementById('id').value = '';
}

function onOff(){
    window.scrollTo(0,0);  
    document.querySelector("div#modal")
        .classList
        .toggle("hide")

    document.querySelector("body")
        .classList
        .toggle("hideScroll")
      
        document.querySelector("div#modal")
            .classList
            .toggle("addScroll")

    onCleanField();
}



document.getElementById("myAnchor").addEventListener("submit", async function(event){
    event.preventDefault();

    const title =  document.getElementById('titulo').value;
    const category =  document.getElementById('category').value;
    const image =  document.getElementById('image').value;
    const description =  document.getElementById('description').value;
    const link =  document.getElementById('link').value;
    const id =  parseFloat(document.getElementById('id').value);

    if(id){
        const index = storeged.findIndex(storeg => storeg.id === id);

        storeged[index].id = id;
        storeged[index].data.title = title,
        storeged[index].data.category = category,
        storeged[index].data.image = image,
        storeged[index].data.description = description,
        storeged[index].data.link = link
    }else{
        const newIdea = {
            id: Math.random(),
            data: {
                title: title,
                category: category,
                image: image ? image :"/imagens/light-idea.svg",
                description: description,
                link: link ? link : ""
            }
        }
        storeged.push(newIdea);
    }

    localStorage.setItem("@casacriativa",  JSON.stringify(storeged));

    alert('Ideia cadastrada com sucesso!');
    onOff();
    listaStorage();
    onCleanField();
});

function onEdit(props){
    onOff();
    const itenStoreged = storeged.filter(storeg => storeg.id === props);

    document.getElementById('titulo').value = itenStoreged[0].data.title,
    document.getElementById('category').value = itenStoreged[0].data.category,
    document.getElementById('image').value = itenStoreged[0].data.image,
    document.getElementById('description').value = itenStoreged[0].data.description,
    document.getElementById('link').value = itenStoreged[0].data.link
    document.getElementById('id').value = itenStoreged[0].id

}

function onDelete(props){
    const storegedIndex = storeged.findIndex(item => item.id === props);

    storeged.splice(storegedIndex, 1);
    localStorage.setItem("@casacriativa", JSON.stringify(storeged));
    document.querySelector('section#idea').innerHTML = '';

    listaStorage();
}

listaStorage();