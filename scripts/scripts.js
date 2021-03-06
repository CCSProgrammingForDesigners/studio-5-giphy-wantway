const api_key = 'HSqqxx8q7xd94JmOrjVX4B076HRAUc4u'

const addImagesToResponses = (images) => {
    const responses = document.getElementsByClassName('responses')[0]
    //clear out current responses before loading new images
    responses.innerHTML = ""
    for (const image of images) {
        responses.insertAdjacentHTML('beforeend', `<li><img src='${image.images.fixed_width.url}'></li>`)
    }
}

// TODO: Hookup search box to site using "onchange" event listener

const searchInput = document.getElementById('searchInput')
searchInput.onchange = hookUptoSite = () => {

    const input = searchInput.value
    console.log(input)
    fetch(`http://api.giphy.com/v1/gifs/search?q=${input}&api_key=${api_key}&limit=9`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data.data)
            const images = data.data
            addImagesToResponses(images)
        })
}

// TODO: Find a way to add an event listener to each tag link
// something something add event listener to array

let testTags = document.getElementsByClassName('tags')

for (const testTag of testTags) {

    testTag.addEventListener('click', e => {
        e.preventDefault()
        const tag = e.target.dataset.tag
        console.log(tag)
        fetch(`http://api.giphy.com/v1/gifs/search?q=${tag}&api_key=${api_key}&limit=9`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data.data)
                const images = data.data
                addImagesToResponses(images)
            })
    })
}



fetch(`http://api.giphy.com/v1/gifs/random?api_key=${api_key}`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        //this is where we have access to the data
        console.log(data.data.images.original.url)
        const url = data.data.images.original.url
        const LargeImage = document.getElementsByClassName('large-image')[0]
        LargeImage.insertAdjacentHTML("beforeend", `<img src="${url}">`)
    })

fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=9`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data.data)
        const images = data.data
        addImagesToResponses(images)
    })