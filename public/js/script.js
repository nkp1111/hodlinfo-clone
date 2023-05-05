// control dropdown at header
const dropdowns = document.querySelectorAll(".stock-control")

dropdowns.forEach(dropdown => {
  dropdown.addEventListener("click", (e) => {
    hideDropdown(dropdowns, dropdown)
    const hiddenItems = e.currentTarget.querySelector(".header__stocks-hidden")
    const isShow = hiddenItems.classList.contains("show")
    if (isShow) {
      hiddenItems.classList.remove("show")
    } else {
      hiddenItems.classList.add("show")
    }
  })
})

function hideDropdown(dropdowns, dropdownTarget) {
  // hide visible dropdown beside current target by removing show class
  dropdowns.forEach(dropdown => {
    if (dropdown !== dropdownTarget) {
      const hiddenItems = dropdown.querySelector(".header__stocks-hidden")
      if (hiddenItems.classList.contains("show")) {
        hiddenItems.classList.remove("show")
      }
    }
  })
}

// change mode 
const changeModeBtn = document.querySelector(".header__styles-mode")
const body = document.querySelector("body")

changeModeBtn.addEventListener("click", (e) => {
  const isLight = body.classList.contains("light")
  if (isLight) {
    body.classList.remove("light")
  }
  else {
    body.classList.add("light")
  }
})