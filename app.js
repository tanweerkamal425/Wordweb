
let btn = document.querySelector("button");
let inp = document.querySelector("input");
btn.addEventListener("click", async (event) => {
    try {
        let word = inp.value;
        let res = await getFacts(word);

        if (!res.data) {
            throw "word not found";
        }

        console.log(res.data[0].meanings);

        let dicword = res.data[0].word
        let phonetic = res.data[0].phonetic
        let meanings = res.data[0].meanings;
        let body = document.querySelector("body");
        let container = document.querySelector(".content-container");

        container.innerText = "";
        for (meaning of meanings) {
            let div = document.createElement("div");
            div.classList.add("content");

            let h2 = document.createElement("h2");
            h2.innerText = meaning.partOfSpeech + ":" + " " + dicword;

            let p = document.createElement("p")
            p.innerText = phonetic;

            let ol = document.createElement("ol");
            let defns = meaning.definitions;
            for (defn of defns) {
                let li = document.createElement("li");
                li.innerText = defn.definition;
                ol.appendChild(li);
                // console.log(defn.example);
                
                let example = defn.example;
                if (example) {
                    let p = document.createElement("p");
                    p.innerText = "ex:- " + example;
                    p.classList.add("example");
                    ol.appendChild(p);
                }
            }

            let ul = document.createElement("ul");
            let synonym = meaning.synonyms[0];
            console.log(synonym);
            let antonym = meaning.antonyms[0];

            if (synonym) {
                let li = document.createElement("li");
                li.innerText = "synonym: " + synonym;
                ul.appendChild(li);
            }

            if (antonym) {
                let li = document.createElement("li");
                li.innerText = "antonym: " + antonym;
                ul.appendChild(li);
            }
            

            div.append(h2);
            div.append(p);
            div.append(ol);
            div.append(ul);
            container.append(div);
        }
    } catch(err) {
        let h2 = document.createElement("h2");
        h2.innerText = "No such word";
        h2.classList.add("error");
        let container = document.querySelector(".content-container");
        container.innerText = "";
        container.append(h2);
    }
    inp.select();
});


let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

async function getFacts(word) {
    try {
        let res = await axios.get(url + word);
        return res;
    } catch (err) {
        return [];
    }
    
}
