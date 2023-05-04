
// control dropdown at header
const dropdowns = document.querySelectorAll(".stock-control")

dropdowns.forEach(dropdown => {
  dropdown.addEventListener("click", (e) => {
    const hiddenItems = e.currentTarget.querySelector(".header__stocks-hidden")
    const isShow = hiddenItems.classList.contains("show")
    if (isShow) {
      hiddenItems.classList.remove("show")
    } else {
      hiddenItems.classList.add("show")
    }
  })
})