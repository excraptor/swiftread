let currentWordIndex = 0
let stop = false

async function read(doc) {
    console.log(doc.length)
    while(!stop) {
        for(let i = currentWordIndex; i < doc.length; i++) {
            const word = doc[i]
            $("#text").text(word)
            currentWordIndex = i
            if(currentWordIndex = doc.length-1) {
                currentWordIndex = 0
            }
            await sleep(100)
        }
    }
} 

function stopText() {
    stop = true
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getWords(str) {
    return str.substring(currentWordIndex, str.length).split(" ")
}

const test = "Lapunk keddi számában hírt adtunk arról, hogy a svéd tudományos akadémia díszdoktorrá avatott egy magyar tudóst - akit - őszinte sajnálatunkra - dr. Pálpéter Péter Pál néven említettünk. Ráadásul nemcsak a szövegben, hanem a tudósítás címében is hibásan közöltük a Pálpéter Péter Pál nevet. A jeles magyar tudós neve helyesen: doktor Pálpéter Péter Pál."

$(document).ready(function() {

    let isDocRunning = false

    const box = document.querySelector('.box');
    box.addEventListener('click', (e)=>{
        e.target.classList.toggle('pause');
        isDocRunning = !isDocRunning
        if(isDocRunning) {
            read(getWords(test))
        } else {
            stopText()
        }
    })

    
})

