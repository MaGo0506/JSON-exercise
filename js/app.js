import { photoPreview } from "./module.js";

(function () {
    const mainBlock = document.querySelector('.js-mainBlock'),
          loader = document.querySelector(".js-loader"),
          photoHolder = document.querySelector('.js-photoHolder');

          photoPreview();

     /**
      *  We are adding a loader when the page refreshes
      */
    window.addEventListener("load", function () {      
        loader.className += " hidden";
    });

    /**
     * We are fetching data and giving it conditions if it successful or rejected
     */
    const getAlbums = async () => { 
              let id = 1;
              let answer = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`);
              const response = await fetch(`https://jsonplaceholder.typicode.com/albums`);          
        
        if (response.status !== 200 && answer.status !== 200) {
            throw new Error('cannot fetch data');
        }
        const data = await response.json()
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
            })
            .catch(error => {
                 console.log(error);
             });   

        const photo = await answer.json()
            .then(photo => {   
                const cardContent = photo.map(photo => {   
                    return`
                    <div class='js-photoCard photoCard'>
                        <div>${photo.albumId}</div>
                        <img class='js-cardImage cardImage' src='${photo.thumbnailUrl}'>
                        <div class="js-cardSection cardSection">
                        <p class='js-cardText cardText'>${photo.title}</p>
                        <button class='js-cardBtn'>See image</button>
                        </div>
                    </div>
                    `;                   
            })
            .join('');
            if (photoHolder) {
                photoHolder.innerHTML = cardContent;

                const photoCard = document.querySelectorAll('.js-photoCard'),
                      textBlocks = [...mainBlock.children],
                      galleryPhoto = document.querySelector('.galleryPhoto'),
                      cardText = document.querySelector('.js-cardText'),
                      cardBtn = document.querySelector('.js-cardBtn'),
                      cardImage = document.querySelector('.js-cardImage'),
                      cardSection = document.querySelector('.js-cardSection');

                mainBlock.addEventListener('click', (e) => {
                    const targetBlock = e.target;
                    if (targetBlock === mainBlock) return;  

                         if (targetBlock.className.includes('active')) {
                                targetBlock.classList.remove('active')
                            } else {targetBlock.classList.add('active')}   

                    const indexBlock = findIndex(targetBlock, textBlocks);
                    id = indexBlock + 1;
                    answer = (`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
                    console.log(indexBlock);
                    console.log(answer);
                    console.log(id);
                    photoCard.forEach(photoCard => {
                        if (targetBlock.className.includes('active')) {
                            id = indexBlock;
                            photoCard.classList.add('active');
                        } else {
                            photoCard.classList.remove('active');
                        }
                        
                    });       
                })
                photoHolder.addEventListener('click', (e) => {
                    const targetBlock = e.target;
                    if (targetBlock == cardText) return;
                    if (targetBlock == cardSection) return;
                    if (targetBlock == photoHolder) return;
                    if (targetBlock == cardImage && targetBlock == cardBtn) {
                        galleryPhoto.classList.add('active');
                    }
                })               
            }  
        }).catch(error => {
            console.log(console.log(error));
        })     
    };

    /**
     * here we are storing the data in our webpage
     * logging error if there is some sort of error in data fetching
     */
    
    getAlbums();


    function findIndex(item, items) {
        for (let index = 0; index < items.length; index++) {
        if (item === items[index]) {
            return index;
          }
        }
      }
   
})();
