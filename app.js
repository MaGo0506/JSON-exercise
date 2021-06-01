const mainBlock = document.querySelector('.js-mainBlock');


const getAlbums = async () => {

    const response = await fetch('https://jsonplaceholder.typicode.com/albums');

    if (response.status !== 200) {
        throw new Error('cannot fetch data');
    }
    const data = await response.json();
    return data;
};

getAlbums()
    .then(data => {
      console.log(data);
      const textBlock = data.map(data => {
          return`
            <div class="textBlock">
                title: ${data.title}
            </div>
            `;
      }).join('');
      mainBlock.innerHTML = textBlock;
    
    }).catch(error => console.log(error));

