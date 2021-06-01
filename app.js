(function () {
    const mainBlock = document.querySelector('.js-mainBlock');

    /**
     * We are fetching data and giving it conditions if it successful or rejected
     */
    const getAlbums = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        if (response.status !== 200) {
            throw new Error('cannot fetch data');
        }
        const data = await response.json();
        if(data){
            return data;
        }
    };

    /**
     * here we are storing the data in our webpage
     * logging error if there is some sort of error in data fetching
     */
    getAlbums()
        .then(data => {
        const textBlock = data.map(data => {
            return`
                <div class="textBlock">
                    title: ${data.title}
                </div>
                `;
        }).join('');
        if (mainBlock) {
            mainBlock.innerHTML = textBlock;
        }  
        }).catch(error => console.log(error));
})();
