let currentWordIndex = 0
let stop = false
const speed = 20
const endOfSentenceSpeed = 60
const test = `Két hétig terveztük, hogy majd veszünk. Mindennap megálltunk a kirakatok előtt, sóváran néztük. Végül is a születésem napján, április 5-én déli tizenkét órakor megkérdeztük, mibe kerül. - 275 frankba - mondta a gyümölcsárus. - Elsőrendű, teljesen friss, zamatos ananász.

A feleségem drágállotta, én nem. A görögdinnyéhez képest persze sok, de az ananászhoz képest bizonyára nem. Megvettük, hazavittük. Beállítottuk egy hamutartóba, néztük. Körbejártuk, barátkoztunk vele, dicsértük, milyen szép és egzotikus. A tetején külön növény hajtott ki belőle, valami pálmaféle; ha locsolnánk, vagy vízbe tennénk, talán hamarosan nagyra nőne és kivirágzana.

A szállóban rögtön híre futott, hogy a kilencesben vettek egy ananászt. A takarítónő bejött, és bemutatkozott - eddig a percig ugyanis színét se láttuk -, és azt javasolta, hogy hámozzuk meg, és fölszeletelve, kristálycukorral meghintve hagyjuk állni egy vagy két napig. "Ostobaság - mondta egy angol diáklány a lépcsőfordulóban. - Rummal egyék, úgy a legfinomabb." Egy honfitárs, akivel eddig csak köszönő viszonyt tartottunk, cédulát csúsztatott az ajtóhasadékba. "Ne hallgassanak senkire - írta. - Jó vastagon le kell hámozni, mert a héja élvezhetetlen, de a húsát úgy kell fogyasztani, ahogy van."

Este meghámoztuk és megettük. Semmi íze sem volt. Alig valamivel volt rosszabb, mint a tök. Nyersen is, cukorral is, rummal is. Nagy nehezen legyűrtük, ittunk rá egy pohár vizet. Harmadnap szembetalálkoztunk az angol lánnyal a folyosón. "Hogy ízlett?" - érdeklődött. "Nagyon" - feleltem. Felsóhajtott. "Hiába - mondta -, az ananász, ananász." Azóta lopva meg-megállok a gyümölcsárus standja előtt, és vágyakozva nézem az ananászokat.`

function containsEndOfSentence(word) {
    return word.includes(".") || word.includes("?") || word.includes("!")
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getWords(str) {
    return str.substring(currentWordIndex, str.length).split(" ")
}

class DocumentReader {
    words = []
    cursor = 0
    isReading = false

    constructor(doc) {
        this.words = getWords(doc)
    }

    nextWord() {
        if(this.cursor < this.words.length){
            return this.words[++this.cursor]
        } else {
            this.cursor = 0
            return this.words[++this.cursor]
        }
    }

    async read() {
        while(this.isReading) {
            const word = this.nextWord()
            $("#text").text(word)
            await sleep(word.length * speed + (containsEndOfSentence(word) ? endOfSentenceSpeed : 0))
        }
    }

}

$(document).ready(function() {
    const reader = new DocumentReader(test)

    const box = document.querySelector('.box');
    box.addEventListener('click', (e)=>{
        e.target.classList.toggle('pause');
        reader.isReading = !reader.isReading
        reader.read()
    })

    
})

