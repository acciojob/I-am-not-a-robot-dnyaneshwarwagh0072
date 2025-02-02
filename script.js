document.addEventListener("DOMContentLoaded", () => {
  const imageClasses = ["img1", "img2", "img3", "img4", "img5"];
  const imagesContainer = document.querySelector("main");
  const h3 = document.createElement("h3");
  const resetButton = document.createElement("button");
  const verifyButton = document.createElement("button");
  const para = document.createElement("p");
  
  h3.id = "h";
  h3.innerText = "Please click on the identical tiles to verify that you are not a robot.";
  imagesContainer.prepend(h3);
  
  resetButton.id = "reset";
  resetButton.innerText = "Reset";
  resetButton.style.display = "none";
  resetButton.addEventListener("click", () => window.location.reload());
  imagesContainer.append(resetButton);
  
  verifyButton.id = "verify";
  verifyButton.innerText = "Verify";
  verifyButton.style.display = "none";
  verifyButton.addEventListener("click", verifyImages);
  imagesContainer.append(verifyButton);
  
  para.id = "para";
  para.style.display = "none";
  imagesContainer.append(para);
  
  const images = [];
  const selectedImages = [];

  const repeatImageClass = imageClasses[Math.floor(Math.random() * imageClasses.length)];
  for (let i = 0; i < 6; i++) {
    const imageClass = i === 5 ? repeatImageClass : imageClasses[i % imageClasses.length];
    images.push(imageClass);
  }

  images.sort(() => Math.random() - 0.5);

  images.forEach((imgClass, idx) => {
    const img = document.createElement("img");
    img.className = imgClass;
    img.addEventListener("click", () => selectImage(idx, imgClass));
    imagesContainer.append(img);
  });

  let clickCount = 0;
  let firstSelected, secondSelected;

  function selectImage(index, imgClass) {
    clickCount++;
    selectedImages.push(index);
    document.querySelectorAll("img")[index].classList.add("selected");
    
    if (clickCount === 1) {
      resetButton.style.display = "block";
    }

    if (clickCount === 2) {
      verifyButton.style.display = "block";
      firstSelected = selectedImages[0];
      secondSelected = selectedImages[1];
    }

    if (clickCount > 2) {
      document.querySelectorAll("img").forEach((img) => img.classList.remove("selected"));
      reset();
    }
  }

  function reset() {
    clickCount = 0;
    selectedImages.length = 0;
    verifyButton.style.display = "none";
  }

  function verifyImages() {
    const firstClass = document.querySelectorAll("img")[firstSelected].className;
    const secondClass = document.querySelectorAll("img")[secondSelected].className;

    if (firstClass === secondClass) {
      para.innerText = "You are a human. Congratulations!";
    } else {
      para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
    }

    para.style.display = "block";
    verifyButton.style.display = "none";
  }
});
