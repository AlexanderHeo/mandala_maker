/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const handlePoints = (e) => {
  clearCanvas();
  let points = "12";
  if (e) points = e.target.value;
  const overlay = document.querySelector(".overlaycross");

  if (
    points === "2" ||
    points === "4" ||
    points === "8" ||
    points === "16" ||
    points === "32"
  ) {
    while (overlay.hasChildNodes()) {
      overlay.removeChild(overlay.lastChild);
    }
    const el = document.createElement("div");
    el.classList.add("cross");
    el.classList.add("one");
    el.classList.add("one1");
    overlay.appendChild(el);
  }

  if (points === "4" || points === "8" || points === "16" || points === "32") {
    const el = document.createElement("div");
    el.classList.add("cross");
    el.classList.add("two");
    el.classList.add("two1");
    overlay.appendChild(el);
  }

  if (points === "8" || points === "16" || points === "32") {
    const el = document.createElement("div");
    el.classList.add("cross");
    el.classList.add("two");
    el.classList.add("four1");
    const el2 = document.createElement("div");
    el2.classList.add("cross");
    el2.classList.add("two");
    el2.classList.add("four2");
    overlay.appendChild(el);
    overlay.appendChild(el2);
  }

  if (points === "16" || points === "32") {
    const el1 = document.createElement("div");
    el1.classList.add("cross");
    el1.classList.add("two");
    el1.classList.add("eight1");
    const el2 = document.createElement("div");
    el2.classList.add("cross");
    el2.classList.add("two");
    el2.classList.add("eight2");
    const el3 = document.createElement("div");
    el3.classList.add("cross");
    el3.classList.add("two");
    el3.classList.add("eight3");
    const el4 = document.createElement("div");
    el4.classList.add("cross");
    el4.classList.add("two");
    el4.classList.add("eight4");
    overlay.appendChild(el1);
    overlay.appendChild(el2);
    overlay.appendChild(el3);
    overlay.appendChild(el4);
  }

  if (points === "32") {
    const el1 = document.createElement("div");
    el1.classList.add("cross");
    el1.classList.add("two");
    el1.classList.add("sixteen1");
    const el2 = document.createElement("div");
    el2.classList.add("cross");
    el2.classList.add("two");
    el2.classList.add("sixteen2");
    const el3 = document.createElement("div");
    el3.classList.add("cross");
    el3.classList.add("two");
    el3.classList.add("sixteen3");
    const el4 = document.createElement("div");
    el4.classList.add("cross");
    el4.classList.add("two");
    el4.classList.add("sixteen4");
    const el5 = document.createElement("div");
    el5.classList.add("cross");
    el5.classList.add("two");
    el5.classList.add("sixteen5");
    const el6 = document.createElement("div");
    el6.classList.add("cross");
    el6.classList.add("two");
    el6.classList.add("sixteen6");
    const el7 = document.createElement("div");
    el7.classList.add("cross");
    el7.classList.add("two");
    el7.classList.add("sixteen7");
    const el8 = document.createElement("div");
    el8.classList.add("cross");
    el8.classList.add("two");
    el8.classList.add("sixteen8");
    overlay.appendChild(el1);
    overlay.appendChild(el2);
    overlay.appendChild(el3);
    overlay.appendChild(el4);
    overlay.appendChild(el5);
    overlay.appendChild(el6);
    overlay.appendChild(el7);
    overlay.appendChild(el8);
  }

  if (points === "3" || points === "6" || points === "12" || points === "24") {
    while (overlay.hasChildNodes()) {
      overlay.removeChild(overlay.lastChild);
    }
    const el1 = document.createElement("div");
    el1.classList.add("cross");
    el1.classList.add("three");
    el1.classList.add("three1half");
    const el2 = document.createElement("div");
    el2.classList.add("cross");
    el2.classList.add("three");
    el2.classList.add("three2half");
    const el3 = document.createElement("div");
    el3.classList.add("cross");
    el3.classList.add("three");
    el3.classList.add("three3half");
    overlay.appendChild(el1);
    overlay.appendChild(el2);
    overlay.appendChild(el3);
  }

  if (points === "6" || points === "12" || points === "24" || points === "48") {
    while (overlay.hasChildNodes()) {
      overlay.removeChild(overlay.lastChild);
    }
    const el1 = document.createElement("div");
    el1.classList.add("cross");
    el1.classList.add("three");
    el1.classList.add("three1");
    const el2 = document.createElement("div");
    el2.classList.add("cross");
    el2.classList.add("three");
    el2.classList.add("three2");
    const el3 = document.createElement("div");
    el3.classList.add("cross");
    el3.classList.add("three");
    el3.classList.add("three3");
    overlay.appendChild(el1);
    overlay.appendChild(el2);
    overlay.appendChild(el3);
  }

  if (points === "12" || points === "24" || points === "48") {
    const el1 = document.createElement("div");
    el1.classList.add("cross");
    el1.classList.add("three");
    el1.classList.add("six1");
    const el2 = document.createElement("div");
    el2.classList.add("cross");
    el2.classList.add("three");
    el2.classList.add("six2");
    const el3 = document.createElement("div");
    el3.classList.add("cross");
    el3.classList.add("three");
    el3.classList.add("six3");
    const el4 = document.createElement("div");
    el4.classList.add("cross");
    el4.classList.add("three");
    el4.classList.add("six4");
    overlay.appendChild(el1);
    overlay.appendChild(el2);
    overlay.appendChild(el3);
    overlay.appendChild(el4);
  }

  if (points === "24" || points === "48") {
    const el1 = document.createElement("div");
    el1.classList.add("cross");
    el1.classList.add("three");
    el1.classList.add("twelve1");
    const el2 = document.createElement("div");
    el2.classList.add("cross");
    el2.classList.add("three");
    el2.classList.add("twelve2");
    const el3 = document.createElement("div");
    el3.classList.add("cross");
    el3.classList.add("three");
    el3.classList.add("twelve3");
    const el4 = document.createElement("div");
    el4.classList.add("cross");
    el4.classList.add("three");
    el4.classList.add("twelve4");
    const el5 = document.createElement("div");
    el5.classList.add("cross");
    el5.classList.add("three");
    el5.classList.add("twelve5");
    const el6 = document.createElement("div");
    el6.classList.add("cross");
    el6.classList.add("three");
    el6.classList.add("twelve6");
    const el7 = document.createElement("div");
    el7.classList.add("cross");
    el7.classList.add("three");
    el7.classList.add("twelve7");
    const el8 = document.createElement("div");
    el8.classList.add("cross");
    el8.classList.add("three");
    el8.classList.add("twelve8");
    overlay.appendChild(el1);
    overlay.appendChild(el2);
    overlay.appendChild(el3);
    overlay.appendChild(el4);
    overlay.appendChild(el5);
    overlay.appendChild(el6);
    overlay.appendChild(el7);
    overlay.appendChild(el8);
  }

  if (points === "48") {
    const el1 = document.createElement("div");
    el1.classList.add("cross");
    el1.classList.add("three");
    el1.classList.add("tf1");
    const el2 = document.createElement("div");
    el2.classList.add("cross");
    el2.classList.add("three");
    el2.classList.add("tf2");
    const el3 = document.createElement("div");
    el3.classList.add("cross");
    el3.classList.add("three");
    el3.classList.add("tf3");
    const el4 = document.createElement("div");
    el4.classList.add("cross");
    el4.classList.add("three");
    el4.classList.add("tf4");
    const el5 = document.createElement("div");
    el5.classList.add("cross");
    el5.classList.add("three");
    el5.classList.add("tf5");
    const el6 = document.createElement("div");
    el6.classList.add("cross");
    el6.classList.add("three");
    el6.classList.add("tf6");
    const el7 = document.createElement("div");
    el7.classList.add("cross");
    el7.classList.add("three");
    el7.classList.add("tf7");
    const el8 = document.createElement("div");
    el8.classList.add("cross");
    el8.classList.add("three");
    el8.classList.add("tf8");
    const el9 = document.createElement("div");
    el9.classList.add("cross");
    el9.classList.add("three");
    el9.classList.add("tf9");
    const el10 = document.createElement("div");
    el10.classList.add("cross");
    el10.classList.add("three");
    el10.classList.add("tf10");
    const el11 = document.createElement("div");
    el11.classList.add("cross");
    el11.classList.add("three");
    el11.classList.add("tf11");
    const el12 = document.createElement("div");
    el12.classList.add("cross");
    el12.classList.add("three");
    el12.classList.add("tf12");
    const el13 = document.createElement("div");
    el13.classList.add("cross");
    el13.classList.add("three");
    el13.classList.add("tf13");
    const el14 = document.createElement("div");
    el14.classList.add("cross");
    el14.classList.add("three");
    el14.classList.add("tf14");
    const el15 = document.createElement("div");
    el15.classList.add("cross");
    el15.classList.add("three");
    el15.classList.add("tf15");
    const el16 = document.createElement("div");
    el16.classList.add("cross");
    el16.classList.add("three");
    el16.classList.add("tf16");
    overlay.appendChild(el1);
    overlay.appendChild(el2);
    overlay.appendChild(el3);
    overlay.appendChild(el4);
    overlay.appendChild(el5);
    overlay.appendChild(el6);
    overlay.appendChild(el7);
    overlay.appendChild(el8);
    overlay.appendChild(el9);
    overlay.appendChild(el10);
    overlay.appendChild(el11);
    overlay.appendChild(el12);
    overlay.appendChild(el13);
    overlay.appendChild(el14);
    overlay.appendChild(el15);
    overlay.appendChild(el16);
  }
};
