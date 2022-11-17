const SERVER = 'http://localhost:4000'

async function getUrl() {
    //funcion chromme solo para extensiones
    //la funcion query es asincrono
    const tabs = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    return tabs[0].url;
}

async function runQuery(query, variables = {}) {
    const result = await fetch(SERVER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({query, variables})
    });
    const jsonData = await result.json()
    return jsonData.data
}

async function saveUrl(url, categoryId){
    const response = await runQuery(`
        mutation($link: LinkInput!){
            createLink(link: $link){
                link
            }
        }
    `, {
        link: {
          link: url,
          category: categoryId
        }
      }
    )
}

async function getCategoryButtons() {
    const response = await runQuery(`
        query {
            categorys {
                _id
                title
            }
        }
    `);
    const container = document.createElement('div');
    response.categorys.forEach(category => {
        const buton = document.createElement('button');
        buton.innerText = category.title;
        buton.addEventListener('click', function(){
            saveUrl(document.querySelector('#url').innerText, category._id);
        })
        container.appendChild(buton)
    });
    return container
}

async function main() {
    document.querySelector('#url').innerText = await getUrl();
    document.querySelector('#categories').appendChild(await getCategoryButtons())
}

main()
