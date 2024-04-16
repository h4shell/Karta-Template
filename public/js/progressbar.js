function updateProgressbar(div) {
    const containerProgressbar = document.querySelector(`#${div}`)
    const bars = containerProgressbar.querySelectorAll(".bar")
    bars.forEach((bar) => {
        const value = bar.dataset.value
        const title = bar.innerText
        const color = bar.dataset.color
        const bgColor = bar.dataset.bgcolor


        console.log(bgColor)
        bar.style.background = bgColor

        bar.innerText = "";

        const pTitle = document.createElement("p");
        pTitle.classList.add("title")
        const progress = document.createElement("div")
        progress.style.background = color
        progress.style.width = bar.dataset.value
        progress.classList.add("progress")
        const percentage = document.createElement("p")
        percentage.classList.add("percentage")
        percentage.innerText = value;


        progress.appendChild(percentage)



        pTitle.innerText = title;
        bar.appendChild(pTitle);
        bar.appendChild(progress);




    })




}