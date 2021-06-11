
(function () {
    const mainBlock = document.querySelector('.js-mainBlock'),
          loader = document.querySelector(".js-loader"),
          photoHolder = document.querySelector('.js-photoHolder'),
          shadow = document.querySelector('.js-shadow'),
          albumLoader = document.querySelector('.js-albumLoader');
     
     /**
      *  We are adding a loader when the page refreshes
      */
    window.addEventListener("load", () => {   
        if (loader) {
            loader.className += " hidden";
        }   
    });
   
    /**
     * We are fetching data and giving it conditions if it successful or rejected
     */
    const getAlbums = async () => {   
        
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums`);    

        if (response) { 
            if (response.status !== 200) {
                throw new Error('cannot fetch data');
            }
        }

        const data = await response.json();
        if (data) {
            return data;
        }
    };

    /**
     * Creating elements and appending them to the HTML
     * Logging error if there is some sort of error in data fetching
     */
    getAlbums()
    .then(data => {
        const textBlock = data.map(data => {
            if (data) {
                return`
                <div class="textBlock" data-id="${data.id}">
                    title: ${data.title}
                </div>
            `;}}).join('');

    if (mainBlock && textBlock) {
        mainBlock.innerHTML = textBlock;

    /**
     * We are making blocks clickable and giving them an active class
     */
    mainBlock.addEventListener('click', async (e) => {
        const textBlocks = [...mainBlock.children];
        const targetBlock = e.target;

        function buttonStatus() {
            if (textBlocks) {
                if (targetBlock.classList.contains('js-mainBlock')) return;

                for (let index = 0; index < textBlocks.length; index++) {
                     textBlocks[index].classList.remove('active');       
                    } if (targetBlock.classList.contains('active')) {
                        targetBlock.classList.remove('active');
                    } else{
                        targetBlock.classList.add('active');
                    }
                    return;
                    } 
                }
                buttonStatus();
     
    /**
     * Here we are fetching an attribute data-id so that we can then fetch data with the same id number
     * Creating elements and appending them to the HTML
     */
    if (targetBlock.classList.contains('textBlock')) {
        const targetId = targetBlock.getAttribute('data-id'),
        answer = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${targetId}`);

        const photo = await answer.json()
        .then(photo => {   
            const cardContent = photo.map(photo => {   
            if (photo) {
                return`
                <div class='js-photoCard photoCard' photo-id="${photo.albumId}">
                    <img class='js-cardImage cardImage' src='${photo.thumbnailUrl}'>
                    <p class='js-cardText cardText'>${photo.title}</p>
                    <button class='js-cardBtn'>See image</button>
                 <div class="js-modalWrapper modalWrapper">
                    <p class="js-closeBtn closeBtn">X</p>
                    <img class='js-modalImage modalImage' src='${photo.thumbnailUrl}'>
                 </div>
                </div>
            `;}}).join('');

    if (photoHolder && cardContent) {
        photoHolder.innerHTML = cardContent;

        /**
         * We are giving the album an active class when the textBlock is clicked to call its album number
         * Every time album is changed we put a loader in between 
         */
        const photoCard = document.querySelectorAll('.js-photoCard'); 

        if (photoCard) {
            photoCard.forEach(element => {
            if (targetBlock.classList.contains('active')) {
                if (albumLoader) {
                    albumLoader.classList.add('hidden'); 
                    setTimeout(() => {
                        if (albumLoader.classList.contains('hidden')) {
                            albumLoader.classList.remove('hidden')
                        }
                    },2000) 
                }
                element.classList.add('active')
            } else {
                element.classList.remove('active');           
            }            
            });    
        }                       
    }
    /**
     *  Catching the error
     */ 
    }).catch (error => {
        if (error) {
            console.log(error);
        }
    })   
    }

    /**
     * We are making our pictures in the album clickable and when we do we call out a modal,
     * with a bigger picture a close button
     * if we click on the background or the close button the modal closes
     */
    document.body.addEventListener('click', (e) => {
    const targetBlock = e.target,
          modalWrapper = document.querySelectorAll('.js-modalWrapper'),
          photoCard = document.querySelectorAll('.js-photoCard');
                    
            if (targetBlock.classList.contains('js-photoHolder')) return; 
            if (targetBlock.parentNode.classList.contains('js-mainBlock') || targetBlock.classList.contains('js-mainBlock')) return; 

            if (targetBlock.classList.contains('js-cardImage') || targetBlock.classList.contains('js-cardBtn')) {
                for (let index = 0; index < photoCard.length; index++) {
                    if (photoCard) {
                        photoCard[index].classList.remove('show');       
                    } targetBlock.parentNode.classList.add('show');
                }
                 

            if (targetBlock.parentNode.classList.contains('show')) {
                targetBlock.parentNode.lastElementChild.classList.add('active');
                if (shadow) {
                    shadow.classList.add('active');
                }   
            }
            }
            if (targetBlock.classList.contains('js-shadow') || targetBlock.classList.contains('js-closeBtn')) {
                if (modalWrapper) {
                    for (const element of modalWrapper) {
                        element.classList.remove('active');
                    }
                        shadow.classList.remove('active');
                } 
             }
    })             
    })
    }
    /**
     * Catching the error
     */
    }).catch (error => {
        if (error) {
            console.log(error); 
        }  
    }) 
})();
