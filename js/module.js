export function photoPreview() {

const mainGallery = document.querySelector('.js-mainGallery');

    const getPhotos = async () => { 
        let id = 1;
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`);
    
        if (response.status !== 200) {
            throw new Error('cannot fetch data');
        }
    
        const data = await response.json();

        if (data) {
            return data;
        }
    } 

getPhotos()
    .then(data => {
    const galleryPhoto = data.map(data => {
        return`
            <div class="js-galleryPhoto galleryPhoto">
            <p class="closeBtn">X</p>
            <img src='${data.url}'>
            </div>
        `;    
    }).join('');
    mainGallery.innerHTML = galleryPhoto;
    }).catch(error => {
        console.log(error);
    })   
}